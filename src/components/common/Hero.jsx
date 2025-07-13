import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Truck, Award, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Design Your Perfect
                  <span className="text-pink-300 block">Custom Apparel</span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-indigo-100 leading-relaxed text-center mb-8">
                Transform your ideas into stunning custom clothing with our professional printing services and easy design tools.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/custom-design"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-pink-500 hover:bg-pink-600 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Designing
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white hover:bg-white hover:text-indigo-700 rounded-lg transition-all duration-200"
              >
                View Products
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-300">10k+</div>
                <div className="text-sm text-indigo-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-300">50k+</div>
                <div className="text-sm text-indigo-200">Designs Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-300">99%</div>
                <div className="text-sm text-indigo-200">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-pink-500 p-3 rounded-lg">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Easy Design Tools</h3>
                  <p className="text-indigo-100">Upload your artwork or use our design tools to create something amazing.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-500 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Premium Quality</h3>
                  <p className="text-indigo-100">High-quality materials and professional printing for lasting results.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-500 p-3 rounded-lg">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Fast Shipping</h3>
                  <p className="text-indigo-100">Quick turnaround times with reliable shipping options.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="bg-pink-600 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Expert Support</h3>
                  <p className="text-indigo-100">Our team is here to help you every step of the way.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;