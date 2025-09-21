import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with real-time inventory management, secure payments, and analytics dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, team chat, and progress tracking.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80",
      tags: ["Vue.js", "Firebase", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Beautiful weather application with location-based forecasts and interactive maps.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&q=80",
      tags: ["React", "API Integration", "Charts.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Responsive portfolio website with smooth animations and content management system.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80",
      tags: ["Next.js", "Sanity CMS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Social Media Analytics",
      description: "Comprehensive analytics dashboard for social media performance tracking and insights.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
      tags: ["React", "D3.js", "Python", "FastAPI"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "Learning Management System",
      description: "Educational platform with course creation, student tracking, and interactive learning modules.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80",
      tags: ["Angular", "MongoDB", "Express.js"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const featured = projects.filter(p => p.featured);
  const other = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, featuring web applications and digital experiences
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featured.map((project, index) => (
            <Card key={project.id} className="group overflow-hidden border-border/50 shadow-card hover:shadow-soft transition-all duration-500 hover:scale-[1.02]">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </Button>
                  <Button size="sm" variant="outline">
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className="text-2xl font-serif font-semibold text-foreground mb-8 text-center">
            More Projects
          </h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {other.map((project, index) => (
              <Card key={project.id} className="group overflow-hidden border-border/50 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <ExternalLink size={14} className="mr-1" />
                      Demo
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Github size={14} className="mr-1" />
                      Code
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
