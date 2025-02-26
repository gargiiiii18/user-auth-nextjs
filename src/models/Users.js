import mongoose, {model, models, Schema} from "mongoose";

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: [true, 'Please provide an email'], unique: true},
    password: {type: String, required: [true, 'Please provide a password']},
    role: {type: String, enum: ["user", "admin"], default: "user"},
    isVerified: {type:Boolean, default: false},
    isAcceptingMessages: {type: Boolean, default: true},
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

export default models.User || model("User", userSchema);

