import mongoose, {model, models, Schema} from "mongoose";

const BusPassSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: String,
    busRoute: String,
    validity: Date,
    price: Number,
}, {timestamps: true});

export default mongoose.models.BusPass || mongoose.model("BusPass", BusPassSchema);