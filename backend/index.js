const app = require("./app");
const connectDB = require("./db");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT;

async function main() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

main();
