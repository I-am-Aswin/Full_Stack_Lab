import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@johndoe.com",
      link: "mailto:hello@johndoe.com"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      link: "#"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Get In Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you're looking to build a new website, improve an existing one, 
                or just want to discuss a potential collaboration, I'm always excited 
                to connect with fellow creators and innovators.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                    <info.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{info.title}</p>
                    <p className="text-muted-foreground">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-8">
              <h4 className="font-serif font-semibold text-foreground mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-card border border-border/50 rounded-lg flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover:scale-110 group"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8 border-border/50 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg shadow-soft hover:shadow-lg transition-all duration-300"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;