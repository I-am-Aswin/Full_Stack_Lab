import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";

export default function PortfolioForm() {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [projects, setProjects] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      bio,
      skills: skills.split(","),
      projects: projects
        .split(";")
        .map((p) => ({ title: p.split("|")[0], link: p.split("|")[1] })),
      contact: { github, linkedin },
    };

    await API.post("/portfolio", payload);
    navigate("/dashboard");
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Portfolio</h2>
      <form onSubmit={submitHandler} className="space-y-3">
        <textarea
          placeholder="Bio"
          className="w-full border p-2 rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          className="w-full border p-2 rounded"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          type="text"
          placeholder="Projects (title|link; title|link)"
          className="w-full border p-2 rounded"
          value={projects}
          onChange={(e) => setProjects(e.target.value)}
        />
        <input
          type="text"
          placeholder="GitHub URL"
          className="w-full border p-2 rounded"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <input
          type="text"
          placeholder="LinkedIn URL"
          className="w-full border p-2 rounded"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <button className="bg-green-600 text-white w-full py-2 rounded-lg">Save</button>
      </form>
    </div>
  );
}
