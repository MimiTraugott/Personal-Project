require("dotenv").config();
const { STRIPE_SECRET_KEY } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);

module.exports = {
  getProducts: (req, res) => {
    const db = req.app.get("db");
    db.get_products()
      .then(products => {
        res.status(200).send(products);
      })
      .catch(err => res.status(500).send(err));
  },
  addToCart: async (req, res) => {
    // console.log(req.session);
    const { product_id } = req.body;
    const { customer_id } = req.session.user;
    // console.log(product_id)
    const db = req.app.get("db");
    let cookie = await db.orders.check_cookie([product_id, customer_id]);
    cookie = cookie[0];
    if (cookie) {
      return res.status(400).send({ message: "Cookie already in cart" });
    }
    db.orders
      .add_to_cart({
        customer_id: req.session.user.customer_id,
        product_id,
        qty: 1
      })
      .then(dbRes => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  getCart: (req, res) => {
    const { customer_id } = req.session.user;
    const db = req.app.get("db");
    db.orders
      .get_cart([customer_id])
      .then(cart => {
        console.log("cart object", cart);
        res.status(200).send(cart);
      })
      .catch(err => res.status(500).send(err));
  },
  deleteItem: (req, res) => {
    // console.log(req.params)
    const { customer_id } = req.session.user;
    // console.log(customer_id)
    const { product_id } = req.params;
    const db = req.app.get("db");
    db.orders
      .delete_product([product_id, customer_id])
      .then(() => res.sendStatus(200))
      .catch(err => {
        res.status(500).send({ errorMessage: "Item not deleted from Cart" });
        console.log(err);
      });
  },
  editQty: (req, res) => {
    console.log(req.query);
    const { current_cart_id, qty } = req.query;
    // db.query([+current_cart_id, +qty])
    const db = req.app.get("db");
    db.orders
      .edit_qty([+current_cart_id, +qty])
      .then(cart => {
        console.log("cart hit", cart);
        res.status(200).send(cart);
      })
      .catch(err => {
        for (const property in err) {
          console.log(`${property}: ${err[property]}`);
        }
      });
    // .catch(err => res.status(500).send({ errorMessage: "Request Failed" }));
  },

  charge: async (req, res) => {
    // 1a. if user doesn't exist, return proper error
    try {
      //1 lookup user from session and get cart
      const customerId = req.session.user.customer_id;
      const db = req.app.get("db");
      //2 iterate cart to get total
      const cart = await db.orders.get_cart([customerId]);
      const cartTotal = cart.reduce(
        (acc, cartItem) => acc + cartItem.qty * cartItem.price,
        0
      )*100;
      // console.log("begin charge", req.body.token);
      //3 submit to stripe total
      console.log('cartTotal', cartTotal)
      let stripeChargeResponse = await stripe.charges.create({
        amount: cartTotal,
        currency: "usd",
        description: "An example charge",
        source: req.body.token.id
      });
    //4 check stripe response for success
    // on success, remove cart
    console.log('status', stripeChargeResponse)
      if (stripeChargeResponse.status === "succeeded") {
        cart.map(async item => {
          await db.orders.delete_product([item.product_id, customerId]).catch(err => {
            console.log("charge delete item", item, err);
          });
        });
            // return success
        res.json({status: stripeChargeResponse.status})
      }
    } catch (err) {
      console.log("charge error", err);
          // 5 on failure, inform user why
      res.status(500).end();
    }
  }
};

/**
 *SESSION OBJECT {
  cookie: {
    path: '/',
    _expires: 2020-01-09T02:48:58.845Z,
    originalMaxAge: 86400000,
    httpOnly: true
  },
  USER PROPERTY DOES NOT EXIST WHEN NOT LOGGED IN
  user: {
    customer_id: 2,
    email: 'mimi',
    username: null,
    customer_order_id: 11,
    paid: false
  }
}


CHARGE TOKEN {
  id: 'tok_1FyUcDAMmp0ansRUoGGLEt48',
  object: 'token',
  card: {
    id: 'card_1FyUcDAMmp0ansRU9rQc0bMj',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: '42424',
    address_zip_check: 'unchecked',
    brand: 'Visa',
    country: 'US',
    cvc_check: 'unchecked',
    dynamic_last4: null,
    exp_month: 4,
    exp_year: 2024,
    funding: 'credit',
    last4: '4242',
    metadata: {},
    name: 'Name',
    tokenization_method: null
  },
  client_ip: '136.60.227.65',
  created: 1578451789,
  livemode: false,
  type: 'card',
  used: false
}
 */

/**
  * CART OBJECT [
  {
    current_cart_id: 36,
    customer_id: 2,
    product_id: 2,
    qty: 6,
    product_name: 'Mini-OG',
    product_image: 'https://cdn.shopify.com/s/files/1/1582/4389/products/N65A6222_medium.jpg?v=1569941264',
    product_description: 'our signature gourmet awarding winning chocolate chip cookie miniaturized | 9 per box |',
    price: '10.00'
  },
  {
    current_cart_id: 37,
    customer_id: 2,
    product_id: 4,
    qty: 3,
    product_name: 'Snickerdoodle Chip',
    product_image: 'https://cdn.shopify.com/s/files/1/1582/4389/products/Chip_Oct_BeckyKimballPhoto_32-1_medium.jpeg?v=1569941264',
    product_description: 'Gourmet snickerdoodle cookie covered in cinnamon + sugars',
    price: '10.00'
  },
  {
    current_cart_id: 38,
    customer_id: 2,
    product_id: 5,
    qty: 1,
    product_name: 'BEST OF CHIP™ REFILLABLE TIN ',
    product_image: 'https://cdn.shopify.com/s/files/1/1582/4389/products/Chip_Oct_BeckyKimballPhoto_32-1_medium.jpeg?v=1569941264',
    product_description: 'Limited edition chip team featuring the top chip cookies of 2019 — Cadbury Chip, Biscoff Chip, Chocolate Coconut (formerly named Samoa Chip), + Cookies + Cream Chip',
    price: '40.00'
  }
]
  */

  /**
   * StripeCreateResponseObject {
  id: 'ch_1FyW5VAMmp0ansRUkCMT2U5w',
  object: 'charge',
  amount: 130,
  amount_refunded: 0,
  application: null,
  application_fee: null,
  application_fee_amount: null,
  balance_transaction: 'txn_1FyW5WAMmp0ansRUTOjyY0tR',
  billing_details: {
    address: {
      city: null,
      country: null,
      line1: null,
      line2: null,
      postal_code: '42424',
      state: null
    },
    email: null,
    name: 'Name',
    phone: null
  },
  captured: true,
  created: 1578457449,
  currency: 'usd',
  customer: null,
  description: 'An example charge',
  destination: null,
  dispute: null,
  disputed: false,
  failure_code: null,
  failure_message: null,
  fraud_details: {},
  invoice: null,
  livemode: false,
  metadata: {},
  on_behalf_of: null,
  order: null,
  outcome: {
    network_status: 'approved_by_network',
    reason: null,
    risk_level: 'normal',
    risk_score: 15,
    seller_message: 'Payment complete.',
    type: 'authorized'
  },
  paid: true,
  payment_intent: null,
  payment_method: 'card_1FyW5VAMmp0ansRUue6JeW9H',
  payment_method_details: {
    card: {
      brand: 'visa',
      checks: [Object],
      country: 'US',
      exp_month: 4,
      exp_year: 2024,
      fingerprint: 'hQ1msHsawOS9XaUj',
      funding: 'credit',
      installments: null,
      last4: '4242',
      network: 'visa',
      three_d_secure: null,
      wallet: null
    },
    type: 'card'
  },
  receipt_email: null,
  receipt_number: null,
  receipt_url: 'https://pay.stripe.com/receipts/acct_1FyPH0AMmp0ansRU/ch_1FyW5VAMmp0ansRUkCMT2U5w/rcpt_GVX9AdzhdJdJp9XF9wAFhyfeAg2LYBL',
  refunded: false,
  refunds: {
    object: 'list',
    data: [],
    has_more: false,
    total_count: 0,
    url: '/v1/charges/ch_1FyW5VAMmp0ansRUkCMT2U5w/refunds'
  },
  review: null,
  shipping: null,
  source: {
    id: 'card_1FyW5VAMmp0ansRUue6JeW9H',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: '42424',
    address_zip_check: 'pass',
    brand: 'Visa',
    country: 'US',
    customer: null,
    cvc_check: 'pass',
    dynamic_last4: null,
    exp_month: 4,
    exp_year: 2024,
    fingerprint: 'hQ1msHsawOS9XaUj',
    funding: 'credit',
    last4: '4242',
    metadata: {},
    name: 'Name',
    tokenization_method: null
  },
  source_transfer: null,
  statement_descriptor: null,
  statement_descriptor_suffix: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null
}

   */
