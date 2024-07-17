const UserServices = require("../services/userServices");

exports.createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await UserServices.createUser(email, password);
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error creating user",
            error: error.message
        });
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { token, user } = await UserServices.loginUser(email, password);
        return res.status(200).json({ token, user });
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
        });
    }
};

exports.deleteUser = async (req, res) => {
    const { email } = req.body;

    try {
        const { msg } = await UserServices.deleteUser(email);

        return res.status(200).json({
            message: msg
        });
    } catch (err) {
        return res.status(404).json({
            message: err.message
        });
    }
};
