import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Vue.js", level: 80 },
        { name: "Tailwind CSS", level: 95 },
        { name: "SASS/SCSS", level: 85 }
      ]
    },
    {
      title: "Backend Development", 
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "Express.js", level: 88 },
        { name: "Django", level: 75 },
        { name: "GraphQL", level: 80 },
        { name: "REST APIs", level: 92 }
      ]
    },
    {
      title: "Database & Cloud",
      skills: [
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Redis", level: 75 },
        { name: "AWS", level: 80 },
        { name: "Docker", level: 85 },
        { name: "Firebase", level: 88 }
      ]
    }
  ];

  const tools = [
    "Git & GitHub", "VS Code", "Figma", "Postman", "Jira", "Slack",
    "Adobe Creative Suite", "Webpack", "Vite", "Jest", "Cypress", "Storybook"
  ];

  return (
    <section id="skills" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Technical Skills */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card key={index} className="p-6 border-border/50 shadow-card hover:shadow-soft transition-all duration-300">
              <h3 className="font-serif font-semibold text-xl text-foreground mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2 bg-muted"
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Tools & Technologies */}
        <div className="text-center">
          <h3 className="text-2xl font-serif font-semibold text-foreground mb-8">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:scale-105 cursor-default"
              >
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: "🧠", title: "Problem Solving", description: "Breaking down complex challenges into manageable solutions" },
            { icon: "🤝", title: "Team Collaboration", description: "Working effectively with cross-functional teams" },
            { icon: "📢", title: "Communication", description: "Clear technical communication with stakeholders" },
            { icon: "📚", title: "Continuous Learning", description: "Staying updated with latest technologies and trends" }
          ].map((skill, index) => (
            <Card key={index} className="p-6 text-center border-border/50 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105">
              <div className="text-3xl mb-3">{skill.icon}</div>
              <h4 className="font-serif font-semibold text-foreground mb-2">{skill.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{skill.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;