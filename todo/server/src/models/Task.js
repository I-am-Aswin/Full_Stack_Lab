import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        title: { type: String, required: true, trim: true },
        description: { type: String, default: '' },
        dueDate: { type: Date },
        priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
        completed: { type: Boolean, default: false }
    }, 
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
export default Task;
