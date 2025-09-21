import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await API.get("/portfolio");
      setPortfolio(data);
    };
    fetchPortfolio();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">My Portfolio</h2>
      {portfolio ? (
        <div>
          <p className="mb-2"><strong>Bio:</strong> {portfolio.bio}</p>
          <p className="mb-2"><strong>Skills:</strong> {portfolio.skills.join(", ")}</p>
          <h3 className="font-bold mt-4">Projects</h3>
          <ul className="list-disc ml-5">
            {portfolio.projects.map((p, i) => (
              <li key={i}>{p.title} - <a href={p.link} className="text-blue-500">{p.link}</a></li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No portfolio found. Please create one.</p>
      )}
    </div>
  );
}
