import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shareId: { type: String, unique: true, sparse: true },
    bio: {
      name: { type: String },
      title: { type: String },
      description: { type: String },
      story: { type: String },
      additional: { type: String },
      experience: { type: String },
      location: { type: String },
      education: { type: String },
      availability: { type: String },
    },
    skills: [{ type: String }],
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
    contact: {
      email: { type: String },
      phone: { type: String },
      location: { type: String },
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
