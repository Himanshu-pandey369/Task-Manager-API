export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // TODO: Validate input

    // TODO: Check if user already exists

    // TODO: Hash password

    // TODO: Save user to the database

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};