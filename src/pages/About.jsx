// Importing React to use JSX and create the component
import React from 'react';

// Defining the functional component 'About'
const About = () => {
    return (
        // Main container div without background colors
        <div className="text-gray-900">
            {/* Hero section without background gradient */}
            <section className="py-20 px-6 text-center text-gray-800 shadow-xl">
                <div className="border-2 border-gray-300 rounded-xl p-6 inline-block bg-white/70 shadow-lg">
                    <h1 className="text-5xl font-extrabold mb-4 animate-fade-in-up drop-shadow-lg">
                        About Us
                    </h1>
                </div>
            </section>



            {/* Top section with title and intro */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl border border-pink-300 p-8">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-4 text-pink-700">Who We Are</h2>
                            <p className="text-lg leading-relaxed text-gray-800">
                                Learn more about PrintCraft and our journey to revolutionize the custom apparel industry.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-800 mt-4">
                                We are a team of designers, developers, and dreamers committed to pushing boundaries. Our focus is on delivering exceptional quality and empowering individuality through our designs.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-800 mt-4">
                                Every product we create is a result of collaboration, creativity, and a drive to bring something unique to our customers. Innovation and customer satisfaction are at the heart of everything we do.
                            </p>
                        </div>
                        <img
                            src="/images/team.jpg.webp"
                            alt="Team working together"
                            className="rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 border-4 border-pink-300"
                        />
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <div className="border-4 border-purple-300 rounded-xl p-6 shadow-xl bg-white/70">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <img
                            src="/images/officescene.jpg"
                            alt="Office scene"
                            className="rounded-xl shadow-xl hover:rotate-1 transition-transform duration-300 border-4 border-purple-200"
                        />
                        <div>
                            <h2 className="text-3xl font-bold mb-3 text-purple-700">
                                Our Mission: Delivering Creativity Through Apparel
                            </h2>
                            <p className="text-base leading-relaxed text-gray-800">
                                At PrintCraft, we empower individuals and businesses to express themselves through high-quality custom clothing. Our mission is to make customization easy, accessible, and joyful.
                                <br /><br />
                                We believe every piece of clothing tells a story — your story. 
          That's why we blend creativity with precision to bring your vision to life.  
          From bold prints to minimal designs, we ensure every order reflects personality, passion, and purpose.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 px-6 max-w-7xl mx-auto">
                <div className="border-4 border-red-300 rounded-xl p-6 shadow-xl bg-white/70">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-3 text-red-600">Our Story</h2>
                            <p className="text-base leading-relaxed text-gray-800">
                                Founded in 2025 by a group of passionate creators, PrintCraft was born from the desire to bring personalized apparel to everyone. Starting as a small idea in a college dorm, we've grown into a vibrant team with a shared love for creativity and technology.
                            </p>
                            <p className="text-base leading-relaxed text-gray-800 mt-4">
                                Over the years, we've empowered thousands of creators and brands to stand out in their own way. Every design we print, every idea we bring to life — it's all part of a bigger mission to celebrate individuality.
                            </p>
                        </div>
                        <img
                            src="/images/ourstory.webp"
                            alt="Founders chatting"
                            className="rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 border-4 border-red-300 w-3/4 mx-auto"
                        />
                    </div>
                </div>
            </section>


            {/* Call to Action Section */}
            <section className="py-16 text-center text-gray-900">
                <h2 className="text-3xl font-bold mb-4 drop-shadow-md">Join the PrintCraft Movement</h2>
                <p className="mb-6 max-w-xl mx-auto text-gray-700">
                    Be a part of our creative community. Whether you're a designer, entrepreneur, or simply a fan of unique apparel — there's a place for you at PrintCraft.
                </p>
                <button className="bg-pink-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:bg-pink-700 transition duration-300">
                    Get Started
                </button>
            </section>
        </div>
    );
};

// Exporting the component to be used in other parts of the app
export default About;
