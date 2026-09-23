import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SocialIcons3D } from './SocialIcons3D';
import { saveVisitorMessage } from '../utils/messagesManager';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastSavedName, setLastSavedName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    // Save to the persistent backend storage
    saveVisitorMessage({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    setLastSavedName(formData.name);
    setSubmitted(true);
  };

  const handleOpenMailApp = () => {
    const subject = encodeURIComponent(`Portfolio Message from ${lastSavedName || formData.name}`);
    const body = encodeURIComponent(
      `Name: ${lastSavedName || formData.name}\nEmail: ${formData.email || 'Not provided'}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 relative bg-white border-t border-sky-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold tracking-wide uppercase mb-3 shadow-2xs">
            <Mail className="w-3.5 h-3.5 text-blue-700" />
            <span>Get In Touch</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-blue-950">
            Let's Connect & Talk
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2 font-normal">
            Whether you want to discuss technology, share study advice, or connect with a student from Nepal, feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-sky-50/80 via-white to-amber-50/40 border-2 border-sky-200 p-6 sm:p-8 space-y-6 shadow-sm"
          >
            <div>
              <h3 className="font-display font-extrabold text-xl text-blue-950">
                Contact Details
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-normal">
                I regularly check my email and respond to genuine messages.
              </p>
            </div>

            {/* Email item */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-sky-200 shadow-2xs hover:border-amber-300 transition-colors">
              <div className="p-2.5 rounded-xl bg-sky-100 text-blue-700 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-extrabold text-blue-800 uppercase block">Email Address</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-bold text-blue-950 hover:text-blue-600 transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            {/* Location item */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-sky-200 shadow-2xs hover:border-amber-300 transition-colors">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold text-amber-900 uppercase block">Location</span>
                <span className="text-sm font-bold text-blue-950">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>

            {/* Official Social Media Buttons */}
            <div className="pt-2 border-t border-sky-100">
              <span className="text-xs font-extrabold text-blue-950 uppercase tracking-wider block mb-3">
                Social Media & Direct Chat
              </span>
              <SocialIcons3D size="lg" withWhatsAppButton={true} />
            </div>
          </motion.div>

          {/* Direct Message Drafter Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7 rounded-3xl bg-white border-2 border-amber-200/80 p-6 sm:p-8 shadow-sm"
          >
            <h3 id="contact-form-heading" className="font-display font-extrabold text-xl sm:text-2xl text-blue-950 mb-2 leading-tight">
              Wanna create something from me? Then fill the below form
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Got a project, question, or want to collaborate? Fill out this quick form and your message will be delivered directly to my private inbox.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-300 text-center">
                <CheckCircle2 className="w-10 h-10 text-amber-600 mx-auto mb-2" />
                <h4 className="font-bold text-amber-950 text-base">Message Sent & Saved!</h4>
                <p className="text-xs text-slate-700 mt-1 max-w-md mx-auto">
                  Thank you, <strong>{lastSavedName}</strong>! Your message has been saved into Shishir's owner inbox.
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleOpenMailApp}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Also Send Via Email App</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({ name: '', email: '', message: '' });
                      setSubmitted(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-blue-950 text-xs font-bold transition-all"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-blue-950 mb-1.5" htmlFor="contact-name">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Ram Tharu"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-sky-50/50 border border-sky-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-amber-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-blue-950 mb-1.5" htmlFor="contact-email">
                      Your Email (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="e.g. ram@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-sky-50/50 border border-sky-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-amber-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-blue-950 mb-1.5" htmlFor="contact-message">
                    Your Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Hello Shishir, I visited your portfolio and wanted to say hi..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-sky-50/50 border border-sky-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-amber-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
