const Order = require("../Models/Orders");
const sendMail = require("./authControllers").sendMail;
exports.orderNow = async (req, res) => {
  const { cartItems, cartTotal, data, userId } = req.body;
  const { name, email, address, payment, phone } = data;
  // Extracting Vendor IDs from the cart items.
  let vendorId = cartItems.map((item) => item.vendorId);
  // Removing Duplciates
  vendorId = vendorId.filter((item, pos, self) => self.indexOf(item) == pos);
  let newOrder;
  if (userId === "") {
    newOrder = new Order({
      vendorId,
      cartItems,
      cartTotal,
      name,
      email,
      address,
      paymentMethod: payment,
      phone,
    });
    try {
      await newOrder.save();
      mailToVendor();
      res.status(200).send({
        message: "Order Placed Successfully",
        orderId: newOrder._id,
      });
    } catch (error) {
      res.status(400).send({
        message: "Order Placing Failed",
      });
    }
  } else {
    newOrder = new Order({
      cartItems,
      cartTotal,
      name,
      email,
      address,
      paymentMethod: payment,
      phone,
      userId,
    });
    try {
      await newOrder.save();
      mailToVendor();
      res.status(200).send({
        message: "Order Placed Successfully",
        orderId: newOrder._id,
      });
    } catch (error) {
      res.status(400).send({
        message: "Order Placing Failed",
      });
    }
  }
};

const mailToVendor = async (req, res) => {
  try {
    const email = "fraxbhatti@gmail.com";
    const email_subject = "You got an order on Desi Village";
    // const url = here you will put the vendor page's url where vendour can see its orders
    const email_message =
      "You got an order on Desi Village. Please visit the vendor's page to see the order details.";
    const email_response = await sendMail(email, email_subject, email_message);
    return;
  } catch (error) {
    return;
  }
};
