import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: password, first_name: username },
      { headers: { "private-key": process.env.PRIVATE_KEY }}
    )

    return res.status(r.status).json(r.data);
  } catch(err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});
