// src/components/DesignTemplates.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // NEW: Import for navigation
import { Search, X, PencilRuler } from 'lucide-react'; // NEW: Added icons for modal

// NEW: Expanded template data with descriptions and use cases
const templates = [
  { id: 1, name: 'Vintage Tee Design', category: 'T-Shirts', imageUrl: 'https://via.placeholder.com/300/a78bfa/ffffff?text=Vintage+Tee', description: 'A classic, retro-inspired design perfect for a timeless look.', useCase: 'Fashion Brands, Band Merch' },
  { id: 2, name: 'Hoodie Logo Placement', category: 'Hoodies', imageUrl: 'https://via.placeholder.com/300/81e6d9/ffffff?text=Hoodie+Logo', description: 'Optimal logo placement for maximum brand visibility on hoodies.', useCase: 'Corporate Swag, Streetwear' },
  { id: 3, name: 'Custom Cap Emblem', category: 'Caps', imageUrl: 'https://via.placeholder.com/300/fbd38d/ffffff?text=Cap+Emblem', description: 'Create a bold statement with a custom emblem for your caps.', useCase: 'Sports Teams, Events' },
  { id: 4, name: 'Sports Jersey Number', category: 'Jerseys', imageUrl: 'https://via.placeholder.com/300/d6bcfa/ffffff?text=Jersey+Num', description: 'Professional athletic numbering and lettering for team jerseys.', useCase: 'Local Leagues, School Teams' },
  { id: 5, name: 'Team Apparel Graphic', category: 'Team Wear', imageUrl: 'https://via.placeholder.com/300/b2f5ea/ffffff?text=Team+Graphic', description: 'A cohesive graphic theme to unify your team\'s look.', useCase: 'Tournaments, Company Outings' },
  { id: 6, name: 'Event T-Shirt Layout', category: 'Event Wear', imageUrl: 'https://via.placeholder.com/300/f6ad55/ffffff?text=Event+Tee', description: 'Eye-catching layouts designed for memorable event merchandise.', useCase: 'Concerts, Festivals, Conferences' },
  { id: 7, name: 'Kids Wear Character', category: 'Kids Wear', imageUrl: 'https://via.placeholder.com/300/9ae6b4/ffffff?text=Kids+Char', description: 'Fun and playful character designs that kids will love to wear.', useCase: 'Children\'s Brands, Birthdays' },
  { id: 8, name: 'Workwear Uniform', category: 'Workwear', imageUrl: 'https://via.placeholder.com/300/76e0a6/ffffff?text=Work+Uniform', description: 'Clean and professional template for company uniforms.', useCase: 'Service Industry, Trades' },
];

const DesignTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState(null); // NEW: State to manage the modal
  const navigate = useNavigate(); // NEW: Hook for handling navigation

  const categories = ['All', ...new Set(templates.map(template => template.category))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // NEW: Function to handle opening the modal
  const handleOpenModal = (template) => {
    setSelectedTemplate(template);
  };

  // NEW: Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedTemplate(null);
  };

  // NEW: Function to navigate to the editor page
  // const handleStartCustomizing = () => {
  //   if (selectedTemplate) {
  //     console.log(`Navigating to editor for template ID: ${selectedTemplate.id}`);
  //     // This will navigate the user to a route like "/editor/1", "/editor/2", etc.
  //     navigate(`/editor/${selectedTemplate.id}`);
  //   }
  const handleStartCustomizing = () => {
    if (selectedTemplate) {
      // Navigate to the '/artpage' route.
      // You can also pass the selected template's data using the `state` option.
      navigate('/Artpage', { state: { template: selectedTemplate } });
    }
  };

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 my-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Explore Apparel Design Templates</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto">
          Browse our collection of professional designs. Select a template to see details and start your customization journey.
        </p>

        {/* Search and Filter Section (Unchanged) */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative w-full sm:w-2/3 md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search clothing templates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                className="bg-green-50 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden group border border-green-200 flex flex-col"
              >
                <img
                  src={template.imageUrl}
                  alt={template.name}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-green-800 mb-1">{template.name}</h3>
                  <p className="text-sm text-green-600 mb-4 flex-grow">{template.category}</p>
                  {/* MODIFIED: Button now opens the modal */}
                  <button
                    onClick={() => handleOpenModal(template)}
                    className="w-full mt-auto px-4 py-2 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition-colors"
                  >
                    Customize This Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No apparel templates found.</p>
            <p className="text-md text-gray-400 mt-2">Try adjusting your search or category selection.</p>
          </div>
        )}

        {/* Back to Design Studio Button */}
        <div className="text-center mt-12">
          {/* MODIFIED: Button now uses navigate for better SPA behavior */}
          <button
            onClick={() => navigate(-1)} // Navigates to the previous page in history
            className="px-8 py-4 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all duration-300"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* NEW: Template Detail Modal */}
      {selectedTemplate && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={handleCloseModal} // Close modal on backdrop click
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 scale-95 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Modal Image */}
            <div className="w-full md:w-1/2">
              <img src={selectedTemplate.imageUrl} alt={selectedTemplate.name} className="w-full h-full object-cover"/>
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <div className="flex justify-between items-start">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedTemplate.name}</h2>
                  <button onClick={handleCloseModal} className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full">
                      <X size={24} />
                  </button>
              </div>
              <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-4 self-start">{selectedTemplate.category}</span>
              
              <p className="text-gray-600 mb-4 flex-grow">{selectedTemplate.description}</p>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h4 className="font-semibold text-gray-700">Best for:</h4>
                <p className="text-gray-600 text-sm">{selectedTemplate.useCase}</p>
              </div>

              <button
                onClick={handleStartCustomizing}
                className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
              >
                <PencilRuler className="mr-3" size={22} />
                Start Customizing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignTemplates;