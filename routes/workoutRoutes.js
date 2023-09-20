import expres from "express";
import { addWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from "../controllers/workoutController.js";
const router = expres.Router();



router.route("/").get(getWorkouts).post(addWorkout);
router.route("/:id").get(getWorkout).patch(updateWorkout).delete(deleteWorkout);



export default router;