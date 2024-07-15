const app = require("./app");
require('dotenv').config();

// Place this at the very top of your entry file (e.g., index.js) TEMPORARILY for debugging
Object.keys(require.cache).forEach(function(key) { delete require.cache[key]; });

const port = process.env.SERVER_PORT;

app.get ('/', (req, res) => {
    return res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
