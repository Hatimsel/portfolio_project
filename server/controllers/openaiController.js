import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();

export default class OpenAiController {
    /*
    OpenAi Controller class:
    Manages all the logic of AI integration
    Provides three possible bots:
    Assistant ; Coder ; Advanced assistant
    */
    static async text(req, res) {
      // Provides Assistant Bot
        try {
            const { text, activeChatId } = req.body;

            const response = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: text },
              ],
            });
        
            const aiResponse = response.choices[0].message.content;
            await axios.post(
              `https://api.chatengine.io/chats/${activeChatId}/messages/`,
              { text: aiResponse },
              {
                headers: {
                  "Project-ID": process.env.PROJECT_ID,
                  "User-Name": process.env.BOT_USER_NAME,
                  "User-Secret": process.env.BOT_USER_SECRET,
                },
              }
            );
        
            res.status(200).json({ text: response.choices[0].message.content });
        } catch (error) {
            console.error("error", error);
            res.status(500).json({ error: error.message });
        }
    }

    static async code(req, res) {
      // Provides Coder Bot
        try {
            const { text, activeChatId } = req.body;
        
            const response = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content:
                    "You are an assistant coder who responds with only code and no explanations.",
                },
                { role: "user", content: text },
              ],
            });
        
            await axios.post(
              `https://api.chatengine.io/chats/${activeChatId}/messages/`,
              { text: response.choices[0].message.content },
              {
                headers: {
                  "Project-ID": process.env.PROJECT_ID,
                  "User-Name": process.env.BOT_USER_NAME,
                  "User-Secret": process.env.BOT_USER_SECRET,
                },
              }
            );
        
            res.status(200).json({ text: response.choices[0].message.content });
        } catch (error) {
            console.error("error", error.response.error);
            res.status(500).json({ error: error.message });
        }
    }

    static async assist(req, res) {
      // Provides Advanced Assistant Bot
        try {
            const { text } = req.body;
        
            const response = await openai.chat.completions.create({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content:
                    "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
                },
                { role: "user", content: `Finish my thought: ${text}` },
              ],
            });
        
            res.status(200).json({ text: response.choices[0].message.content });
        } catch (error) {
            console.error("error", error);
            res.status(500).json({ error: error.message });
        }
    }
}
