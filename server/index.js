require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  authCtrl = require("./authController"),
  cartCtrl = require("./cartController"),
  nodemailer = require("./nodemailer");
app = express();

app.use(express.json());
app.use(require("body-parser").text());
app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24, test: 3 }
  })
);
massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("You did it! DB connected!");
    const port = SERVER_PORT || 4090;
    app.listen(port, () =>
      console.log(`Personal Project up and running on ${port}`)
    );
  })
  .catch(err => console.log(err));

//Auth Endpoints
app.post("/auth/login", authCtrl.login);
app.post("/auth/register", authCtrl.register);
app.get("/auth/userSession", authCtrl.getUserSession);
app.delete("/auth/userSession", authCtrl.logout);

//Cart & Product Endpoints
app.get("/api/products", cartCtrl.getProducts);
app.post("/api/cart", cartCtrl.addToCart);
app.get("/api/cart/:id", cartCtrl.getCart);
app.delete("/api/cart/:product_id", cartCtrl.deleteItem);
app.put("/api/cart", cartCtrl.editQty);

//Stripe Endpoint
app.post("/charge", cartCtrl.charge);

//Nodemailer Endpoint
app.post("/api/email", nodemailer.email);
