import express from 'express'
import authRouter from "./routes/authRoutes"
import blogRoutes from "./routes/blogRoutes"
import commentRoutes from "./routes/commentRoute"
import 'express-async-errors'
import cookieParser from 'cookie-parser';





const app = express();
const PORT = 3000;





app.use(express.json())
app.use(cookieParser());


app.use("/api/users", authRouter)
app.use("/api/blogs", blogRoutes)
app.use("/api/comments", commentRoutes)



// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

    console.error(err)
})


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});