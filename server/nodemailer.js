//import nodemailer
const nodemailer = require("nodemailer");

//import environment variables for your email
const { EMAIL, PASSWORD } = process.env;

module.exports = {
  email: async (req, res) => {
    let text = `Thank you for visiting Chip Cookies! Your order is on it's way!`
 console.log(req.session)
    try {
      //invoke the createTransport function passing in your email information.
      let transporter = nodemailer.createTransport({
        service: "Hotmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      });

      //invoke the sendMail function with the info in the email
      let info = await transporter.sendMail(
        {
          from: EMAIL, //This will show up when you go into the email
          to: `${req.session.user.email}`,
          subject: "Order Confirmation", //This will show on the subject of the email
         //for clients with plaintext support only
          html: `<h3>${text}</h3>
              <img src="https://cdn.shopify.com/s/files/1/1582/4389/files/chip_gold_x95.png?v=1524535546"/>`
        },
        (err, res) => {
          if (err) {
            console.log("err", err);
          } else {
            console.log("res", res);
            res.status(200).send(info);
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
};
