const WorkoutRequest=require('../models/workoutRequestModel')

const getAllWorkoutRequests = async (req, res) => {
    try {
        const workoutRequests = await WorkoutRequest.find({}).populate('userId').populate('workoutId');
        res.status(200).json(workoutRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkoutRequestById = async (req, res) => {
    try {
        const workoutRequest = await WorkoutRequest.findById(req.params.id).populate('userId').populate('workoutId');
        if (!workoutRequest) {
            return res.status(404).json({ message: 'Workout request not found' });
        }
        res.status(200).json(workoutRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const addWorkoutRequest = async (req, res) => {
    try {
        const newWorkoutRequest = await WorkoutRequest.create(req.body);
        res.status(200).json({ message: 'Workout Request Added Successfully', data: newWorkoutRequest });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorkoutRequest = async (req, res) => {
    try {
        const updatedWorkoutRequest = await WorkoutRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedWorkoutRequest) {
            return res.status(404).json({ message: 'Workout request not found' });
        }
        res.status(200).json({message:"Workout Request Updated Succesfully",data:updatedWorkoutRequest});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkoutRequest = async (req, res) => {
    try {
        const deletedWorkoutRequest = await WorkoutRequest.findByIdAndDelete(req.params.id);
        if (!deletedWorkoutRequest) {
            return res.status(404).json({ message: 'Workout request not found' });
        }
        res.status(200).json({ message: 'Workout Request Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getWorkoutRequestsByUserId = async (req, res) => {
    try {
        const workoutRequests = await WorkoutRequest.find({ userId: req.params?.id }).populate('workoutId');
        if (workoutRequests.length === 0) {
            return res.status(404).json({ message: 'No workout requests found for this user' });
        }
        res.status(200).json(workoutRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={getAllWorkoutRequests,getWorkoutRequestById,getWorkoutRequestsByUserId,addWorkoutRequest,updateWorkoutRequest,deleteWorkoutRequest}