import express from 'express';
import authRouter from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import commentRoutes from "./routes/commentRoutes";
import 'express-async-errors'; // This will take care of handling all async errors without try/catch
import cookieParser from 'cookie-parser';
import * as swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from "yaml"


const file = fs.readFileSync("./documentation.yaml", "utf8");
const swaggerDoc = YAML.parse(file)

const app = express();
const PORT = process.env.PORT || 3000;




// Parsing JSON
app.use(express.json());
// Parse cookies
app.use(cookieParser());

// Documentation for API
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Routes
app.get('/ping', (req, res) => {
    res.status(200).send("PONG!");
})
app.use("/api/users", authRouter)
app.use("/api/blogs", blogRoutes)
app.use("/api/comments", commentRoutes)



// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

    console.error(err)
})

//Server
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});