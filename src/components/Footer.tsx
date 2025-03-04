
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Instagram, Linkedin, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-16 animate-fade-in">
      <div className="container mx-auto">
        {/* Upper footer section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 border-b border-white/20">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl">Sarvadhi</span>
            </div>
            <p className="text-sm text-white/80 mb-4">
              ESTABLISHED SINCE 2015, working collectively designing products with an approach to modern solution.
            </p>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Contact Us</h4>
              <p className="text-sm text-white/80">Head Office: In Sycamore, CO 80334</p>
              <p className="text-sm text-white/80 mt-1">hr.sarvadhi@gmail.com</p>
              <p className="text-sm text-white/80 mt-1">+1 (555) 123-4567</p>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-medium mb-4">Information</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="hover:text-white transition-colors">
                  <a href="#">Delivery</a>
                </li>
                <li className="hover:text-white transition-colors">
                  <a href="#">Rush Purchase</a>
                </li>
                <li className="hover:text-white transition-colors">
                  <a href="#">About Us</a>
                </li>
                <li className="hover:text-white transition-colors">
                  <a href="#">Privacy</a>
                </li>
                <li className="hover:text-white transition-colors">
                  <a href="#">Contact Us</a>
                </li>
                <li className="hover:text-white transition-colors">
                  <a href="#">Store</a>
                </li>
              </ul>
            </div>
            
            {/* Newsletter signup */}
            <div className="md:col-span-3">
              <h3 className="text-lg font-medium mb-4">Sign Up To Newsletter</h3>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-r-none focus:ring-1 focus:ring-white/30"
                />
                <Button className="bg-white hover:bg-white/90 text-primary rounded-l-none">
                  SUBMIT
                </Button>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-white/80 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-white/80 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">We Accept</h4>
                <div className="flex space-x-3">
                  <div className="bg-white/10 p-1 rounded">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="bg-white/10 p-1 rounded">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="bg-white/10 p-1 rounded">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="bg-white/10 p-1 rounded">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright */}
        <div className="py-4 px-8 text-center text-sm text-white/70">
          <p>© 2023 Sarvadhi P.V.T. LTD. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
