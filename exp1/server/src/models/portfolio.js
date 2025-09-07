import mongoose from "mongoose";

const portfolioSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bio: { type: String },
    skills: [{ type: String }],
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
    contact: {
      phone: String,
      github: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);
export default Portfolio;
