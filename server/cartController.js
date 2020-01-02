module.exports = {
    getProducts: (req, res) => {
        const db = req.app.get('db');
        db.get_products()
        .then(products => {res.status(200).send(products)})
        .catch(err => res.status(500).send(err))
    },
    addToCart: (req, res) => {
        console.log(req.session);
        const {product_id} = req.body;
        console.log(product_id)
        const db = req.app.get('db');
        db.orders.add_to_cart({customer_id: req.session.user.customer_id, product_id, qty: 1})
        .then(dbRes => {
            res.sendStatus(200)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    getCart: (req, res) => {
        const customer_id = req.session.user.customer_id;
        const db = req.app.get('db');
        db.orders.get_cart([customer_id]).then(cart => {
            res.status(200).send(cart)
        })
        .catch(err => res.status(500).send(err))
    }
}