import Transaction from "../models/Transaction.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
        },
      },
      {
        $group: {
          _id: null,

          totalIncome: {
            $sum: {
              $cond: [
                { $eq: ["$type", "income"] },
                "$amount",
                0,
              ],
            },
          },

          totalExpense: {
            $sum: {
              $cond: [
                { $eq: ["$type", "expense"] },
                "$amount",
                0,
              ],
            },
          },

          totalTransactions: {
            $sum: 1,
          },
        },
      },
    ]);

    const data = summary[0] || {
      totalIncome: 0,
      totalExpense: 0,
      totalTransactions: 0,
    };

    return res.status(200).json({
      success: true,
      summary: {
        totalIncome: data.totalIncome,
        totalExpense: data.totalExpense,
        currentBalance: data.totalIncome - data.totalExpense,
        totalTransactions: data.totalTransactions,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};