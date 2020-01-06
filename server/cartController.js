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
        console.log(cart);
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
        console.log('cart hit', cart)
        res.status(200).send(cart);
      })
      .catch(err => {
        for(const property in err) {
          console.log(`${property}: ${err[property]}`)
        }
      })
      // .catch(err => res.status(500).send({ errorMessage: "Request Failed" }));
  }
};
