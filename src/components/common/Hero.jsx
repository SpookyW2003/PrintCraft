import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Truck, Award, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section
      className="relative text-white"
      style={{
        backgroundImage: `
          linear-gradient(to bottom right, rgba(24, 10, 93, 0.85), rgba(24, 10, 93, 0.65)),
          url('https://png.pngtree.com/thumb_back/fh260/background/20250307/pngtree-black-and-white-t-shirts-on-hangers-image_17079360.jpg')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-xl">
                Design Your Perfect
                <span className="text-yellow-400 block">Custom Apparel</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed drop-shadow-sm">
                Transform your ideas into stunning custom clothing with our professional printing services and easy design tools.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/custom-design"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 rounded-lg transition duration-300 shadow-lg"
              >
                Start Designing
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-transparent border-2 border-white hover:bg-white hover:text-blue-700 rounded-lg transition duration-300"
              >
                View Products
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { value: '10k+', label: 'Happy Customers' },
                { value: '50k+', label: 'Designs Created' },
                { value: '99%', label: 'Satisfaction Rate' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{stat.value}</div>
                  <div className="text-sm text-gray-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-6">
            {[
              {
                icon: <Palette className="h-6 w-6 text-white" />,
                title: 'Easy Design Tools',
                desc: 'Upload your artwork or use our design tools to create something amazing.',
                bg: 'bg-yellow-500',
              },
              {
                icon: <Award className="h-6 w-6 text-white" />,
                title: 'Premium Quality',
                desc: 'High-quality materials and professional printing for lasting results.',
                bg: 'bg-indigo-600',
              },
              {
                icon: <Truck className="h-6 w-6 text-white" />,
                title: 'Fast Shipping',
                desc: 'Quick turnaround times with reliable shipping options.',
                bg: 'bg-purple-600',
              },
              {
                icon: <Users className="h-6 w-6 text-white" />,
                title: 'Expert Support',
                desc: 'Our team is here to help you every step of the way.',
                bg: 'bg-pink-600',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${feature.bg} p-3 rounded-lg`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-gray-100">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
