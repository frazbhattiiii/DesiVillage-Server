const Review = require("../Models/Reviews");
const FoodItem = require("../Models/FoodItem");

exports.addReview = async (req, res) => {
  const { item, user, comment, rating } = req.body;
  try {
    const review = new Review({ user, comment, rating });
    const responseReview = await review.save();
    const responseItem = await FoodItem.findOneAndUpdate(
      { _id: item },
      { $push: { reviews: responseReview._id } }
    );
    res.status(200).json({
      success: true,
      message: "Review Successfully Saved",
      review: responseReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An unexpected error occur while submitting review",
      error,
    });
  }
};

exports.get;
