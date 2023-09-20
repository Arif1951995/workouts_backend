import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

// GET
const getWorkouts = async (req, res) => {
  try {
    const result = await Workout.find({}).sort({createdAt: -1});
    return res.status(200).json({ count: result.length, data: result });
  } catch (error) {
    res.json({ msg: error.message });
  }
};
// GET
const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "Workout not found!" });

    }

    const result = await Workout.findById(id);
    if (!result) {
      return res.status(404).json({ msg: "Workout not found!" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
// POST
const addWorkout = async (req, res) => {
  try {
    const { title, reps, load } = req.body;
    const { id } = req.params;
    if (!title || !reps || !load) {
      return res.status(400).json({ msg: "All fields are required!" });
    } else {
      const result = await Workout.create({ title, reps, load });

      return res.status(201).json(result);
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
// PUT
const updateWorkout = async (req, res) => {
  try {
    const { title, reps, load } = req.body;
    const { id } = req.params;
    if (!title && !reps && !load) {
      return res.status(400).json({ msg: "at least one field is required" });
    } else {
      const result = await Workout.findByIdAndUpdate(id, { ...req.body });

      if (!result) {
        return res.status(404).json({ msg: "Workout not found!" });
      } else {
        return res.status(200).json({msg: "Workout updated successfully"});
      }
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};
// DELETE
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ msg: "Workout not found!" });

    }

    const result = await Workout.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ msg: "Workout not found!" });
    } else {
      return res.status(200).json({ msg: "Workout has been deleted" });
    }
  } catch (error) {
    res.json({ msg: error.message });
  }
};


export {
    getWorkouts,
    getWorkout,
    addWorkout,
    updateWorkout,
    deleteWorkout
}