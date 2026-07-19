import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, note, date, receipt } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      note,
      date,
      receipt,
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully.",
      transaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};