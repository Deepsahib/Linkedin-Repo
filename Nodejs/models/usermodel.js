import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email:{type:String},
    password:{type:String},
    username: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    education: { type: String },
    skills: { type: [String], default: [] },

    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String
      }
    ],

    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
