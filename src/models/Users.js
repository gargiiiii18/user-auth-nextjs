import mongoose, {model, models, Schema} from "mongoose";

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum: ["user", "admin"], default: "user"},
    isVerfified: {type:Boolean, default: false}
});

export default mongoose.models.user || mongoose.model("User", userSchema);