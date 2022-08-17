const User = require("../Models/User");
const Orders = require("../Models/Orders");
const bcrypt = require("bcryptjs");

exports.updateProfile = async (req, res) => {
  const { userId, newName, newContact, newAddress, password, newPassword } =
    req.body;

  if ((password || newPassword) === "") {
    try {
      await User.findByIdAndUpdate(
        userId,
        { name: newName, contact: newContact, address: newAddress },
        { useFindAndModify: false }
      );

      res.status(200).json({ message: "Successfully updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to udpate" });
    }
  } else {
    try {
      const user = await User.findOne({ _id: userId });
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(
          userId,
          { password: encryptedPassword },
          { useFindAndModify: false }
        );
        res.status(200).json({ message: "Password Successfully updated" });
      } else {
        res.status(400).json({
          message: "Password is incorrect",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to udpate" });
    }
  }
};

exports.orderHistory = async (req, res) => {
  const { userId } = req.body;
  try {
    const history = await Orders.find({ userId });
    res.json(history);
  } catch (error) {
    res.status(500).send({ message: "Failed to pull history" });
  }
};
