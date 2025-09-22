import Portfolio from "#app/models/portfolio.js";
import crypto from "crypto";

// Get logged in user's portfolio
const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio', error: error.message });
  }
};

// Create or update portfolio
const savePortfolio = async (req, res) => {
  try {
    const { bio, skills, projects, contact } = req.body;

    let portfolio = await Portfolio.findOne({ user: req.user._id });

    if (portfolio) {
      // Update existing portfolio
      if (bio !== undefined) portfolio.bio = bio;
      if (skills !== undefined) portfolio.skills = skills;
      if (projects !== undefined) portfolio.projects = projects;
      if (contact !== undefined) portfolio.contact = contact;
      await portfolio.save();
    } else {
      // Generate a unique shareId for new portfolios
      const shareId = crypto.randomBytes(8).toString('hex');
      portfolio = await Portfolio.create({
        user: req.user._id,
        shareId,
        bio: bio || {},
        skills: skills || [],
        projects: projects || [],
        contact: contact || {},
      });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error saving portfolio', error: error.message });
  }
};

// Update existing portfolio
const updatePortfolio = async (req, res) => {
  try {
    const { bio, skills, projects, contact } = req.body;
    
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Update fields
    if (bio !== undefined) portfolio.bio = bio;
    if (skills !== undefined) portfolio.skills = skills;
    if (projects !== undefined) portfolio.projects = projects;
    if (contact !== undefined) portfolio.contact = contact;

    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error updating portfolio', error: error.message });
  }
};

// Get public portfolio by shareId
const getPublicPortfolio = async (req, res) => {
  try {
    const { shareId } = req.params;
    
    const portfolio = await Portfolio.findOne({ shareId });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Return portfolio without sensitive user information
    const publicPortfolio = {
      shareId: portfolio.shareId,
      bio: portfolio.bio,
      skills: portfolio.skills,
      projects: portfolio.projects,
      contact: portfolio.contact,
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt
    };

    res.json(publicPortfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio', error: error.message });
  }
};

// Generate or regenerate shareId for existing portfolio
const generateShareId = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user._id });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Generate new shareId
    const shareId = crypto.randomBytes(8).toString('hex');
    portfolio.shareId = shareId;
    await portfolio.save();

    res.json({ shareId, message: 'Share ID generated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error generating share ID', error: error.message });
  }
};

export { getPortfolio, savePortfolio, updatePortfolio, getPublicPortfolio, generateShareId };
