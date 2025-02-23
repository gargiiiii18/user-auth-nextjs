import mongoose, {model, models, Schema} from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: [true, 'Please provide an email'], unique: true},
    password: {type: String, required: [true, 'Please provide a password']},
    role: {type: String, enum: ["user", "admin"], default: "user"},
    isVerfified: {type:Boolean, default: false},
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

export default mongoose.models.user || mongoose.model("User", userSchema);