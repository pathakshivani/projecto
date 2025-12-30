import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

app.on("error", (error) => {
  console.error("ERROR:", error);
  throw error;
});

app.listen(PORT, () => {
  console.log(`✅ Server app is listening on port ${PORT}`);
});
