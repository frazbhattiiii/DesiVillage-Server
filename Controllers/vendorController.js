const Vendor = require("../Models/Vendor");
const User = require("../Models/User");
const Order = require("../Models/Orders");

exports.getVendor = async (req, res) => {
  const { vendor_id } = req.params;
  try {
    const vendor = await Vendor.findOne({ _id: vendor_id });
    if (vendor) {
      res.status(200).json({
        succcess: true,
        message: "Vendor Fetched Successfully",
        vendor,
      });
    } else {
      res.status(404).json({
        succcess: false,
        message: "No Such Vendor Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      succcess: false,
      message: "An unexpected error occured while fetching vendor",
      error,
    });
  }
};

exports.getOrders = async (req, res) => {
  const { vendor_id } = req.params;
  try {
    const orders = await Order.find({
      vendorId: vendor_id,
      vendorAccepted: false,
    }).select(
      "cartItems cartTotal name email address phone paymentMethod orderDelivered vendorAccepted vendorDelivered"
    );

    // Filtering corresponding items for vendor
    const newOrders = orders.map((order) => {
      order.cartItems = order.cartItems.filter(
        (item) => item.vendorId == vendor_id
      );
      return order;
    });

    res.status(200).json({
      success: true,
      message: "Orders Fetched Successfully",
      orders: newOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occured while fetching the orders",
      error,
    });
  }
};

exports.validateOrder = async (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;

  try {
    const response = await Order.findOneAndUpdate(
      {
        _id: order_id,
      },
      {
        vendorAccepted: status,
      }
    );

    res.status(200).json({
      success: true,
      message: "Order Validated Successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occured while validating orders",
      error,
    });
  }
};

exports.deliverOrder = async (req, res) => {
  const { order_id } = req.params;

  try {
    const response = await Order.findOneAndUpdate(
      {
        _id: order_id,
      },
      {
        vendorDelivered: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Order Delivered Successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occured while delivering orders",
      error,
    });
  }
};

exports.registerVendor = async (req, res) => {
  const { user_id, name, category, location, phone } = req.body;
  const vendor = await Vendor.findOne({ name });
  if (vendor) res.status(400).json({ message: "Vendor Already Exists" });
  else {
    const vendor = new Vendor({ user_id, name, category, location, phone });
    vendor.save(async (error, result) => {
      if (error) {
        res.status(400).json({
          message: "Error Saving Vendor ",
          error,
        });
      } else {
        try {
          const user = await User.updateOne(
            { _id: user_id },
            { role: "vendor" }
          );
        } catch (error) {
          const { _id } = result;
          await Vendor.findByIdAndDelete(_id);
          res.status(200).json({
            message: "Error Saving Vendor ",
            error,
          });
        }
        res.status(200).json({
          success: true,
          message: "Vendor Saved Succesfully",
        });
      }
    });
  }
};

exports.updateVendor = async (req, res) => {
  const { vendor_id } = req.params;
  const newData = req.body;
  let update = {};
  Object.keys(newData).forEach((prop) => {
    update[prop] = newData[prop];
  });
  try {
    const response = await Vendor.findOneAndUpdate({ _id: vendor_id }, update);
    if (response) {
      res.status(200).json({
        success: true,
        message: "Vendor Updated Successfully",
        vendor: response,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Such Vendor Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An Unexpected Error Occcured While Updating Vendor",
      error,
    });
  }
};
