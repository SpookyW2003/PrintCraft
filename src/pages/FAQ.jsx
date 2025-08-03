import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Mail, MapPin } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I place an order for custom printing?",
      answer: "You can place an order by visiting our Custom Design page, uploading your design or using our design tools, selecting your preferred apparel, and proceeding to checkout."
    },
    {
      question: "What file formats do you accept for designs?",
      answer: "We accept PNG, JPG, SVG, PDF, and AI file formats. For best results, we recommend high-resolution files (300 DPI minimum)."
    },
    {
      question: "What is the turnaround time for orders?",
      answer: "Standard orders take 3-5 business days for production, plus shipping time. Rush orders can be completed in 1-2 business days for an additional fee."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes! We offer discounts for orders of 10+ pieces. The discount increases with quantity. Contact us for a custom quote on large orders."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay."
    },
    {
      question: "Do you ship across India?",
      answer: "Yes, we ship to all major cities and towns across India. Shipping charges vary based on location and order size."
    },
    {
      question: "What if I'm not satisfied with my order?",
      answer: "We offer a satisfaction guarantee. If you're not happy with your order, contact us within 7 days and we'll work to resolve the issue."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order is shipped, you'll receive a tracking number via email and SMS to monitor your package's progress."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg mb-12">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <button
                  className="w-full text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="mt-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Still have questions?
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Can't find the answer you're looking for? Get in touch with our team.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Phone className="h-8 w-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+91 674 251 9876</p>
              <p className="text-sm text-gray-500 mt-1">Mon-Sat 9AM-6PM IST</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Mail className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">support@printcraft.com</p>
              <p className="text-sm text-gray-500 mt-1">24/7 Email Support</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">Plot No. 123, Patia Industrial Estate</p>
              <p className="text-gray-600">Bhubaneswar, Odisha 751024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
