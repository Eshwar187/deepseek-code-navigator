
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as anime from 'animejs';

interface HomePageProps {
  onShowLogin: () => void;
  onShowSignup: () => void;
}

export function HomePage({ onShowLogin, onShowSignup }: HomePageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero section animation
    anime.default({
      targets: heroRef.current?.children,
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.default.stagger(200),
      duration: 1000,
      easing: 'easeOutExpo'
    });

    // Features animation
    anime.default({
      targets: featuresRef.current?.children,
      scale: [0.8, 1],
      opacity: [0, 1],
      delay: anime.default.stagger(150, { start: 600 }),
      duration: 800,
      easing: 'easeOutBack'
    });

    // Stats animation
    anime.default({
      targets: statsRef.current?.children,
      translateX: [-100, 0],
      opacity: [0, 1],
      delay: anime.default.stagger(100, { start: 1200 }),
      duration: 700,
      easing: 'easeOutExpo'
    });

    // Floating animation for cards
    anime.default({
      targets: '.floating-card',
      translateY: [-10, 10],
      duration: 3000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Navbar */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">QA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">QA Assistant</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Testing Platform</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onShowLogin}>
                Sign In
              </Button>
              <Button onClick={onShowSignup} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center" ref={heroRef}>
          <h1 className="text-6xl font-bold gradient-text mb-6">
            Revolutionary QA Testing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Harness the power of AI to transform your testing workflow. Generate comprehensive test cases, 
            detect bugs, and optimize your code with unprecedented precision and speed.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={onShowSignup} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-background/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8" ref={statsRef}>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">99%</div>
              <div className="text-muted-foreground">Bug Detection Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">10x</div>
              <div className="text-muted-foreground">Faster Testing</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">500+</div>
              <div className="text-muted-foreground">Happy Teams</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need for modern QA testing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={featuresRef}>
            <Card className="floating-card glass-card">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🧪</span>
                </div>
                <CardTitle>Smart Test Generation</CardTitle>
                <CardDescription>
                  AI-powered test case generation that covers edge cases and critical paths automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Automated test case creation</li>
                  <li>• Edge case detection</li>
                  <li>• Coverage optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="floating-card glass-card">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <CardTitle>Security Analysis</CardTitle>
                <CardDescription>
                  Comprehensive security testing with vulnerability detection and remediation suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Vulnerability scanning</li>
                  <li>• Security best practices</li>
                  <li>• Compliance checking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="floating-card glass-card">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>
                  Real-time performance monitoring with detailed analytics and optimization recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Load testing</li>
                  <li>• Performance metrics</li>
                  <li>• Bottleneck identification</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold gradient-text mb-6">Ready to Transform Your Testing?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers and testers who have revolutionized their QA process with our AI-powered platform.
          </p>
          <Button size="lg" onClick={onShowSignup} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
