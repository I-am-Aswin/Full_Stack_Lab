import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-semibold text-foreground mb-6 leading-tight">
            Creative
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting beautiful digital experiences with modern design and clean code
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full shadow-soft hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => scrollToNext()}
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/20 hover:border-primary hover:bg-primary/5 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth hover:scale-110 p-2">
              <Github size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth hover:scale-110 p-2">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth hover:scale-110 p-2">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToNext} className="text-muted-foreground hover:text-primary transition-smooth">
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;