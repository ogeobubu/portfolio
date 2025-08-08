import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Star, CheckCircle, Send } from 'lucide-react';

interface EnhancedContactSectionProps {
  isDark: boolean;
  isLoaded: boolean;
}

export const EnhancedContactSection: React.FC<EnhancedContactSectionProps> = ({ isDark, isLoaded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://portfolio-z8z6.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
  
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error message to the user
    } finally {
      setIsSubmitting(false);
      
      // Reset form after 3 seconds if submitted successfully
      if (isSubmitted) {
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      }
    }
  };

  const services = [
    { title: "Custom Web Applications", icon: CheckCircle, description: "Full-stack solutions tailored to your needs" },
    { title: "Mobile-First Design", icon: CheckCircle, description: "Responsive applications that work on all devices" },
    { title: "Performance Optimization", icon: CheckCircle, description: "Lightning-fast applications with optimized code" },
    { title: "Security Implementation", icon: CheckCircle, description: "Enterprise-grade security for sensitive data" }
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 sm:mb-16 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } transition-all duration-700`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Let's Work Together</h2>
            <p className="text-lg sm:text-xl text-gray-400 px-4">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Information */}
            <div className={`p-6 sm:p-8 rounded-2xl ${
              isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
            } transition-all duration-700 delay-200 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get In Touch</h3>
              <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      backgroundColor: '#3b82f6' // Fallback
                    }}
                  >
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Email</h4>
                    <a 
                      href="mailto:ogeobubu@gmail.com"
                      className="text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
                    >
                      ogeobubu@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                      backgroundColor: '#10b981' // Fallback
                    }}
                  >
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Location</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Available for remote work worldwide</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
                      backgroundColor: '#f97316' // Fallback
                    }}
                  >
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">Response Time</h4>
                    <p className="text-gray-400 text-sm sm:text-base">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`p-6 sm:p-8 rounded-2xl ${
              isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
            } transition-all duration-700 delay-400 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send a Message</h3>
              
              {isSubmitted ? (
                <div className="text-center py-8 sm:py-12">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                      backgroundColor: '#10b981' // Fallback
                    }}
                  >
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-gray-400 text-sm sm:text-base">Thank you for reaching out. I'll get back to you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                            : 'bg-gray-100 border-gray-300 text-gray-900 focus:border-blue-400'
                        } focus:outline-none`}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base ${
                          isDark 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                            : 'bg-gray-100 border-gray-300 text-gray-900 focus:border-blue-400'
                        } focus:outline-none`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors text-sm sm:text-base ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                          : 'bg-gray-100 border-gray-300 text-gray-900 focus:border-blue-400'
                      } focus:outline-none`}
                      placeholder="Project inquiry"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-colors resize-none text-sm sm:text-base ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                          : 'bg-gray-100 border-gray-300 text-gray-900 focus:border-blue-400'
                      } focus:outline-none`}
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      isSubmitting
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'transform hover:scale-105'
                    } text-white`}
                    style={!isSubmitting ? {
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      backgroundColor: '#3b82f6' // Fallback
                    } : undefined}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Services Offered */}
          <div className={`mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl ${
            isDark ? 'bg-gray-800/50 border border-gray-700/50' : 'bg-white/50 border border-gray-200/50'
          } transition-all duration-700 delay-600 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">What I Offer</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <div key={index} className="text-center group">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      backgroundColor: '#3b82f6' // Fallback
                    }}
                  >
                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{service.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
