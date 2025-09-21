import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const About = () => {
  const highlights = [
    "5+ Years Experience",
    "50+ Projects Completed",
    "Creative Problem Solver",
    "Team Collaborator"
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating meaningful digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in">
            <div className="aspect-square rounded-2xl bg-gradient-primary p-8 shadow-soft mb-8">
              <div className="w-full h-full bg-background/10 rounded-xl flex items-center justify-center text-primary-foreground text-6xl font-serif">
                JD
              </div>
            </div>
          </div>
          
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
              Hello, I'm John Doe
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              I'm a full-stack developer and designer with a passion for creating beautiful, 
              functional web applications. My journey in tech started over 5 years ago, and 
              I've been fortunate to work with startups and established companies alike.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              I believe in the power of clean code, thoughtful design, and user-centered 
              development. When I'm not coding, you can find me exploring new technologies, 
              contributing to open source projects, or enjoying a good coffee.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-8">
              {highlights.map((highlight, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm font-medium bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center border-border/50 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl font-semibold">🎨</span>
            </div>
            <h4 className="font-serif font-semibold text-foreground mb-2">Design</h4>
            <p className="text-muted-foreground text-sm">
              Creating intuitive and beautiful user interfaces that engage and delight users
            </p>
          </Card>
          
          <Card className="p-6 text-center border-border/50 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl font-semibold">⚡</span>
            </div>
            <h4 className="font-serif font-semibold text-foreground mb-2">Development</h4>
            <p className="text-muted-foreground text-sm">
              Building scalable and performant applications with modern technologies
            </p>
          </Card>
          
          <Card className="p-6 text-center border-border/50 shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-xl font-semibold">🚀</span>
            </div>
            <h4 className="font-serif font-semibold text-foreground mb-2">Strategy</h4>
            <p className="text-muted-foreground text-sm">
              Translating business goals into technical solutions that drive results
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;