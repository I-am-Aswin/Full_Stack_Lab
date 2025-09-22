import { useState, useEffect } from 'react';

const PortfolioForm = ({ portfolio, onSave, onCancel, isOpen }) => {
  // Helper function to safely get nested property values
  const safeGet = (obj, path, defaultValue = '') => {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : defaultValue;
    }, obj);
  };

  const [formData, setFormData] = useState({
    bio: {
      name: '',
      title: '',
      description: '',
      story: '',
      additional: '',
      experience: '',
      location: '',
      education: '',
      availability: ''
    },
    skills: [],
    projects: [],
    contact: {
      email: '',
      phone: '',
      location: '',
      github: '',
      linkedin: '',
      twitter: ''
    }
  });

  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    if (portfolio) {
      // Safely merge portfolio data with default form structure
      setFormData(() => ({
        bio: {
          name: portfolio.bio?.name || '',
          title: portfolio.bio?.title || '',
          description: portfolio.bio?.description || '',
          story: portfolio.bio?.story || '',
          additional: portfolio.bio?.additional || '',
          experience: portfolio.bio?.experience || '',
          location: portfolio.bio?.location || '',
          education: portfolio.bio?.education || '',
          availability: portfolio.bio?.availability || ''
        },
        skills: Array.isArray(portfolio.skills) ? [...portfolio.skills] : [],
        projects: Array.isArray(portfolio.projects) ? [...portfolio.projects] : [],
        contact: {
          email: portfolio.contact?.email || '',
          phone: portfolio.contact?.phone || '',
          location: portfolio.contact?.location || '',
          github: portfolio.contact?.github || '',
          linkedin: portfolio.contact?.linkedin || '',
          twitter: portfolio.contact?.twitter || ''
        }
      }));
    }
  }, [portfolio]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayAdd = (section, newItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...(Array.isArray(prev[section]) ? prev[section] : []), newItem]
    }));
  };

  const handleArrayRemove = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: Array.isArray(prev[section]) ? prev[section].filter((_, i) => i !== index) : []
    }));
  };

  // Validate and clean form data before saving
  const validateAndCleanData = (data) => {
    return {
      bio: {
        name: data.bio?.name || '',
        title: data.bio?.title || '',
        description: data.bio?.description || '',
        story: data.bio?.story || '',
        additional: data.bio?.additional || '',
        experience: data.bio?.experience || '',
        location: data.bio?.location || '',
        education: data.bio?.education || '',
        availability: data.bio?.availability || ''
      },
      skills: Array.isArray(data.skills) ? data.skills.filter(skill => skill && skill.trim()) : [],
      projects: Array.isArray(data.projects) ? data.projects.filter(project => 
        project && project.title && project.title.trim()
      ).map(project => ({
        title: project.title || '',
        description: project.description || '',
        link: project.link || ''
      })) : [],
      contact: {
        email: data.contact?.email || '',
        phone: data.contact?.phone || '',
        location: data.contact?.location || '',
        github: data.contact?.github || '',
        linkedin: data.contact?.linkedin || '',
        twitter: data.contact?.twitter || ''
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedData = validateAndCleanData(formData);
    onSave(cleanedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="p-8 border-b border-base-300 bg-gradient-to-r from-primary/5 to-secondary/5">
          <h2 className="text-3xl font-bold text-base-content">Edit Portfolio</h2>
          <p className="text-base-content/70 mt-2">Update your portfolio information</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-10">
          {/* Bio Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-xl font-semibold text-base-content">Personal Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name *</span>
                </label>
                <input
                  type="text"
                  value={safeGet(formData, 'bio.name')}
                  onChange={(e) => handleInputChange('bio', 'name', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Professional Title *</span>
                </label>
                <input
                  type="text"
                  value={safeGet(formData, 'bio.title')}
                  onChange={(e) => handleInputChange('bio', 'title', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="e.g., Full Stack Developer"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Experience</span>
                </label>
                <input
                  type="text"
                  value={formData.bio.experience}
                  onChange={(e) => handleInputChange('bio', 'experience', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="e.g., 5+ years of experience"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Education</span>
                </label>
                <input
                  type="text"
                  value={formData.bio.education}
                  onChange={(e) => handleInputChange('bio', 'education', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="e.g., Computer Science Degree"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Location</span>
                </label>
                <input
                  type="text"
                  value={formData.bio.location}
                  onChange={(e) => handleInputChange('bio', 'location', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Chennai, India"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Availability</span>
                </label>
                <input
                  type="text"
                  value={formData.bio.availability}
                  onChange={(e) => handleInputChange('bio', 'availability', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="e.g., Available for freelance work"
                />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <textarea
                  value={formData.bio.description}
                  onChange={(e) => handleInputChange('bio', 'description', e.target.value)}
                  className="textarea textarea-bordered w-full h-24 resize-none"
                  placeholder="Brief description for the landing section..."
                />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">My Story</span>
                </label>
                <textarea
                  value={formData.bio.story}
                  onChange={(e) => handleInputChange('bio', 'story', e.target.value)}
                  className="textarea textarea-bordered w-full h-24 resize-none"
                  placeholder="Tell your personal story for the About Me section..."
                />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Additional Information</span>
                </label>
                <textarea
                  value={formData.bio.additional}
                  onChange={(e) => handleInputChange('bio', 'additional', e.target.value)}
                  className="textarea textarea-bordered w-full h-24 resize-none"
                  placeholder="Additional information about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-secondary rounded-full"></div>
              <h3 className="text-xl font-semibold text-base-content">Skills</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="input input-bordered flex-1"
                  placeholder="Add a skill (e.g., React, Node.js, Python...)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (newSkill.trim()) {
                        handleArrayAdd('skills', newSkill.trim());
                        setNewSkill('');
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newSkill.trim()) {
                      handleArrayAdd('skills', newSkill.trim());
                      setNewSkill('');
                    }
                  }}
                  className="btn btn-primary px-6"
                >
                  Add Skill
                </button>
              </div>
              {Array.isArray(formData.skills) && formData.skills.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-base-content/70">Your skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="badge badge-primary badge-lg gap-2 px-3 py-2">
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('skills', index)}
                          className="btn btn-ghost btn-xs hover:bg-primary/20"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-accent rounded-full"></div>
              <h3 className="text-xl font-semibold text-base-content">Projects</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-base-200/50 p-6 rounded-lg border border-base-300">
                <h4 className="font-semibold text-base-content mb-4">Add New Project</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Project Title *</span>
                      </label>
                      <input
                        type="text"
                        value={newProject.title}
                        onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                        className="input input-bordered w-full"
                        placeholder="e.g., E-commerce Website"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Project Link</span>
                      </label>
                      <input
                        type="url"
                        value={newProject.link}
                        onChange={(e) => setNewProject(prev => ({ ...prev, link: e.target.value }))}
                        className="input input-bordered w-full"
                        placeholder="https://your-project.com"
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Project Description</span>
                    </label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                      className="textarea textarea-bordered w-full h-24 resize-none"
                      placeholder="Describe your project, its features, and your role..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (newProject.title.trim()) {
                          handleArrayAdd('projects', { ...newProject });
                          setNewProject({
                            title: '',
                            description: '',
                            link: ''
                          });
                        }
                      }}
                      className="btn btn-primary"
                    >
                      Add Project
                    </button>
                  </div>
                </div>
              </div>
              
              {Array.isArray(formData.projects) && formData.projects.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-base-content/70">Your projects:</p>
                  {formData.projects.map((project, index) => (
                    <div key={index} className="card bg-base-200 border border-base-300">
                      <div className="card-body p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{project?.title || 'Untitled Project'}</h4>
                            <p className="text-base-content/70 mt-1">{project?.description || 'No description available'}</p>
                            {project?.link && (
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="link link-primary text-sm mt-2 inline-block"
                              >
                                View Project →
                              </a>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleArrayRemove('projects', index)}
                            className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-info rounded-full"></div>
              <h3 className="text-xl font-semibold text-base-content">Contact Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Phone</span>
                </label>
                <input
                  type="text"
                  value={formData.contact.phone}
                  onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="+91 123 456 7890"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Location</span>
                </label>
                <input
                  type="text"
                  value={formData.contact.location}
                  onChange={(e) => handleInputChange('contact', 'location', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Chennai, India"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">GitHub</span>
                </label>
                <input
                  type="url"
                  value={formData.contact.github}
                  onChange={(e) => handleInputChange('contact', 'github', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">LinkedIn</span>
                </label>
                <input
                  type="url"
                  value={formData.contact.linkedin}
                  onChange={(e) => handleInputChange('contact', 'linkedin', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Twitter</span>
                </label>
                <input
                  type="url"
                  value={formData.contact.twitter}
                  onChange={(e) => handleInputChange('contact', 'twitter', e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-base-300 bg-base-200/30 -mx-8 px-8 py-6">
            <div className="text-sm text-base-content/70">
              * Required fields
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-outline btn-lg px-8"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-lg px-8"
              >
                Save Portfolio
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;
