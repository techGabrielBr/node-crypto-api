import app from "./src/app";
import "dotenv/config";

app.listen(process.env.PORT, async () => {
    console.log("Server is running");
});