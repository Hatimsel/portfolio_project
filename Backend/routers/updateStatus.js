router.patch('/updateStatus/:userId', async (req, res) => {
    const { status, email, password } = req.body;
    const { userId } = req.params;

    try {
        const user = await UserServices.updateUserStatus(userId, status, email, password);

        return res.json({
            status: true, message: "User updated successfully", user
        });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});
