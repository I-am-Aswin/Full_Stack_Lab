import { useState, useEffect } from 'react';
import api from '../config/axiosConfig';
import Navbar from '../components/Navbar';
import PortfolioForm from '../components/PortfolioForm';
import { useAuth } from '../context/AuthContext';

const Portfolio = () => {
  const { isAuthenticated } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [shareLink, setShareLink] = useState(null);
  const [generatingLink, setGeneratingLink] = useState(false);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/portfolio');
      setPortfolio(response.data);
      setIsFirstTime(false);
    } catch (err) {
      if (err.response?.status === 404) {
        // No portfolio found - first time user
        setIsFirstTime(true);
        setPortfolio({
          bio: {
            name: '',
            title: '',
            description: '',
            email: '',
            phone: '',
            location: ''
          },
          skills: [],
          projects: [],
          experience: [],
          education: []
        });
      } else {
        setError('Failed to fetch portfolio data');
        console.error('Error fetching portfolio:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const savePortfolio = async (portfolioData) => {
    try {
      setSaving(true);
      const response = await api.post('/api/portfolio', portfolioData);
      setPortfolio(response.data);
      setIsEditing(false);
      setIsFirstTime(false);
    } catch (err) {
      console.error('Error saving portfolio:', err);
      alert('Failed to save portfolio. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-primary text-xl">Loading portfolio...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-error text-xl">{error}</div>
      </div>
    );
  }

  if (isFirstTime && isAuthenticated) {
    return (
      <div className="min-h-screen bg-base-100 text-base-content">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/30">
          <div className="text-center max-w-2xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-base-content mb-6">Welcome!</h1>
            <p className="text-xl text-base-content/80 mb-8">
              It looks like this is your first time here. Let's create your portfolio!
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-primary btn-lg"
            >
              Create My Portfolio
            </button>
          </div>
        </div>
        <PortfolioForm
          portfolio={portfolio}
          onSave={savePortfolio}
          onCancel={() => setIsEditing(false)}
          isOpen={isEditing}
        />
      </div>
    );
  }

  const generateShareLink = async () => {
    try {
      setGeneratingLink(true);
      const response = await api.post('/api/portfolio/generate-share-id');
      const { shareId } = response.data;

      // Build the full public link (adjust base URL as per deployment)
      const link = `${window.location.origin}/portfolio/public/${shareId}`;
      setShareLink(link);
    } catch (err) {
      console.error('Error generating share link:', err);
      alert('Failed to generate share link. Please try again.');
    } finally {
      setGeneratingLink(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      
      {/* Edit Button for Authenticated Users */}
      {isAuthenticated && (
        <div className="fixed top-20 right-4 z-40">
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary btn-sm shadow-lg"
            disabled={saving}
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Portfolio
              </>
            )}
          </button>

          {/* Share button */}
          {/* <button
            onClick={generateShareLink}
            className="btn btn-secondary btn-sm shadow-lg w-full"
            disabled={generatingLink}
          >
            {generatingLink ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Generating...
              </>
            ) : (
              'Share My Portfolio'
            )}
          </button> */}

          {/* Show share link if generated */}
          {/* {shareLink && (
          <div className="mt-2 p-2 bg-base-200 rounded shadow text-xs break-all">
            <p className="mb-1 font-semibold">Your Share Link:</p>
            <a href={shareLink} target="_blank" rel="noopener noreferrer" className="text-primary underline">
              {shareLink}
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="btn btn-xs btn-outline ml-2"
            >
              Copy
            </button>
          </div>
          )} */}
          
        </div>
      )}

      {/* Landing Section */}
      <section id="landing" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/30">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-bold text-base-content mb-6">
            {portfolio?.bio?.name || 'Your Name'}
          </h1>
          <p className="text-xl md:text-2xl text-base-content/80 mb-8">
            {portfolio?.bio?.title || 'Full Stack Developer'}
          </p>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mb-12">
            {portfolio?.bio?.description || 'Passionate about creating innovative solutions and building amazing user experiences.'}
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#about" className="btn btn-primary btn-lg">
              Learn More
            </a>
            <a href="#contact" className="btn btn-outline btn-primary btn-lg">
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-base-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-base-content text-center mb-16">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">My Story</h3>
              <p className="text-base-content/80 text-lg leading-relaxed mb-6">
                {portfolio?.bio?.story || 'I am a passionate developer with a love for creating innovative solutions. With years of experience in full-stack development, I enjoy turning complex problems into simple, beautiful designs.'}
              </p>
              <p className="text-base-content/80 text-lg leading-relaxed">
                {portfolio?.bio?.additional || 'When I\'m not coding, you can find me exploring new technologies, contributing to open source projects, or sharing knowledge with the developer community.'}
              </p>
            </div>
            <div className="bg-base-100 p-8 rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold text-primary mb-4">Quick Facts</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-base-content/80">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  {portfolio?.bio?.experience || '5+ years of experience'}
                </li>
                <li className="flex items-center text-base-content/80">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  {portfolio?.bio?.location || 'Based in San Francisco'}
                </li>
                <li className="flex items-center text-base-content/80">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  {portfolio?.bio?.education || 'Computer Science Degree'}
                </li>
                <li className="flex items-center text-base-content/80">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  {portfolio?.bio?.availability || 'Available for freelance work'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-base-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-base-content text-center mb-16">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio?.skills?.map((skill, index) => (
              <div key={index} className="bg-base-200 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                <h3 className="text-xl font-semibold text-primary mb-3">{skill}</h3>
                <div className="w-full bg-base-300 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
            )) || (
              <>
                <div className="bg-base-200 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-3">JavaScript</h3>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div className="bg-base-200 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-3">React</h3>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="bg-base-200 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-3">Node.js</h3>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
                <div className="bg-base-200 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-3">Python</h3>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </div>
                <div className="bg-base-200 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-3">MongoDB</h3>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
                <div className="bg-base-200 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-3">AWS</h3>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-base-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-base-content text-center mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio?.projects?.map((project, index) => (
              <div key={index} className="bg-base-100 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                <h3 className="text-xl font-semibold text-primary mb-3">{project.title}</h3>
                <p className="text-base-content/80 mb-4">{project.description}</p>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  View Project →
                </a>
              </div>
            )) || (
              <>
                <div className="bg-base-100 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-3">E-Commerce Platform</h3>
                  <p className="text-base-content/80 mb-4">A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.</p>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">View Project →</a>
                </div>
                <div className="bg-base-100 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-3">Task Management App</h3>
                  <p className="text-base-content/80 mb-4">A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.</p>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">View Project →</a>
                </div>
                <div className="bg-base-100 p-6 rounded-lg hover:bg-base-300 transition-colors shadow-sm">
                  <h3 className="text-xl font-semibold text-primary mb-3">Weather Dashboard</h3>
                  <p className="text-base-content/80 mb-4">A responsive weather dashboard that displays current weather conditions, forecasts, and interactive maps using various weather APIs.</p>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors font-medium">View Project →</a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-base-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-base-content text-center mb-16">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6">Let's Connect</h3>
              <p className="text-base-content/80 text-lg mb-8">
                I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-base-content/80">
                  <span className="text-primary mr-3">📧</span>
                  {portfolio?.contact?.email || 'your.email@example.com'}
                </div>
                <div className="flex items-center text-base-content/80">
                  <span className="text-primary mr-3">📱</span>
                  {portfolio?.contact?.phone || '+1 (555) 123-4567'}
                </div>
                <div className="flex items-center text-base-content/80">
                  <span className="text-primary mr-3">📍</span>
                  {portfolio?.contact?.location || 'San Francisco, CA'}
                </div>
              </div>
              <div className="flex space-x-4 mt-8">
                <a 
                  href={portfolio?.contact?.github || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href={portfolio?.contact?.linkedin || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href={portfolio?.contact?.twitter || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
            <div className="bg-base-200 p-8 rounded-lg shadow-lg">
              <form className="space-y-6">
                <div>
                  <label className="block text-base-content/80 mb-2 font-medium">Name</label>
                  <input 
                    type="text" 
                    className="w-full input input-bordered bg-base-100"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-base-content/80 mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    className="w-full input input-bordered bg-base-100"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-base-content/80 mb-2 font-medium">Message</label>
                  <textarea 
                    rows="4"
                    className="w-full textarea textarea-bordered bg-base-100"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full btn btn-primary"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-200 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-base-content/60">
            © 2024 {portfolio?.bio?.name || 'Your Name'}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Portfolio Form Modal */}
      <PortfolioForm
        portfolio={portfolio}
        onSave={savePortfolio}
        onCancel={() => setIsEditing(false)}
        isOpen={isEditing}
      />
    </div>
  );
};

export default Portfolio;
