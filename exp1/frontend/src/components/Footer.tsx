import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
            Portfolio
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Creating beautiful digital experiences with passion and precision.
          </p>
          
          <div className="flex items-center justify-center text-muted-foreground text-sm">
            <span>© {currentYear} Portfolio Manager. Made with</span>
            <Heart size={16} className="mx-2 text-red-500 fill-current" />
            <span>by developers, for developers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;