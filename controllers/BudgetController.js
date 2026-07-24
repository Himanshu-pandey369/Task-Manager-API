import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";
export const createBudget = async (req, res) => {
  try {
    const { category, amount, month, year } = req.body;

    if (!category || !amount || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const budget = await Budget.create({
      category: category.trim(),
      amount: Number(amount),
      month: Number(month),
      year: Number(year),
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      budget,
    });
  }catch (error) {
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Budget already exists for this category and month.",
    });
  }

  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
};

export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({
      user: req.user._id,
    });

    const budgetDetails = await Promise.all(
      budgets.map(async (budget) => {
        const expenses = await Transaction.find({
          user: req.user._id,
          category: budget.category,
          type: "expense",
        });

        const spent = expenses.reduce(
          (total, transaction) => total + transaction.amount,
          0,
        );

        const percentageUsed = Number(
          ((spent / budget.amount) * 100).toFixed(2),
        );

        return {
          _id: budget._id,
          category: budget.category,
          budget: budget.amount,
          spent,
          remaining: budget.amount - spent,
          percentageUsed,
          alert: percentageUsed >= 90,
          overBudget: spent > budget.amount,
        };
      }),
    );

    return res.status(200).json({
      success: true,
      budgets: budgetDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found.",
      });
    }

    const { category, amount, month, year } = req.body;

    if (category !== undefined) {
      budget.category = category.trim();
    }

    if (amount !== undefined) {
      budget.amount = Number(amount);
    }

    if (month !== undefined) {
      budget.month = Number(month);
    }

    if (year !== undefined) {
      budget.year = Number(year);
    }

    const updatedBudget = await budget.save();

    return res.status(200).json({
      success: true,
      budget: updatedBudget,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Budget deleted successfully.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
