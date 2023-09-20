import dotenv from "dotenv";
import express from "express";
import workoutRoutes from "./routes/workoutRoutes.js"
import mongoose from "mongoose";

dotenv.config();

const app = express();


app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})


app.use("/api/workouts", workoutRoutes);

app.get("/", (req, res) => {
    res.json({mesg: "Welcome to the app"})
})


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("db is connected");
    app.listen(process.env.PORT, () => {
        console.log(`sever is runing on port: ${process.env.PORT}`);
    })
}).catch(error => {
    console.log(error);
})


