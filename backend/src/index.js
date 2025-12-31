import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./database/index.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR:", error);
      throw error;
    });

    app.listen(PORT, () => {
      console.log(`✅ Server app is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MySQL Connection Failed !!", error)
  })
