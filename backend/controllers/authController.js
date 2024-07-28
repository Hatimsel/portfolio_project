import axios from "axios";

export default class AuthController {
    /* 
    AuthController class:
    Manages authentication logic
    Provides functionality for login and signup
    */
    static async login(req, res) {
        // Handles login logic
        const { username, password } = req.body;

        try {
            const chatEngineResponse = await axios.get(
                "https://api.chatengine.io/users/me",
                {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": username,
                    "User-Secret": password,
                },
                }
            );

            res.status(200).json({ response: chatEngineResponse.data });
        } catch (error) {
            console.error("error", error);
            res.status(500).json({ error: error.message });
        }
    }

    static async signUp(req, res) {
        // Handles signup logic
        const { username, password } = req.body;

        try {      
            const chatEngineResponse = await axios.post(
                "https://api.chatengine.io/users/",
                {
                username: username,
                secret: password,
                },
                {
                headers: { "Private-Key": process.env.PRIVATE_KEY },
                }
            );
        
            res.status(200).json({ response: chatEngineResponse.data });
        } catch (error) {
            console.error("error", error.message);
            res.status(500).json({ error: error.message });
        }
    }
}
