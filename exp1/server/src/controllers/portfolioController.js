import Portfolio from "#app/models/portfolio.js";

// Get logged in user's portfolio
const getPortfolio = async (req, res) => {
  const portfolio = await Portfolio.findOne({ user: req.user._id });
  res.json(portfolio);
};

// Create or update portfolio
const savePortfolio = async (req, res) => {
  const { bio, skills, projects, contact } = req.body;

  let portfolio = await Portfolio.findOne({ user: req.user._id });

  if (portfolio) {
    portfolio.bio = bio;
    portfolio.skills = skills;
    portfolio.projects = projects;
    portfolio.contact = contact;
    await portfolio.save();
  } else {
    portfolio = await Portfolio.create({
      user: req.user._id,
      bio,
      skills,
      projects,
      contact,
    });
  }

  res.json(portfolio);
};

export { getPortfolio, savePortfolio };
