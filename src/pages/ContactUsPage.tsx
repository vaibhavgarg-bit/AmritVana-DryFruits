import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactUsPage: React.FC = () => {
  const { navigate, showToast } = useShop();

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('Order Support');
  const [contactMsg, setContactMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does AmritVana guarantee 100% unadulterated & unpolished dry fruits?',
      a: 'We source directly from family orchards in Kashmir, California, and Madinah without middleman polishers. Each batch undergoes triple optical sorting to eliminate bitter kernels and is sealed in food-grade nitrogen barrier packaging with zero artificial sulfur or mineral oil.',
    },
    {
      q: 'What is the shelf life of AmritVana products?',
      a: 'When stored in a cool, dry place away from direct sunlight (or in an airtight jar/refrigerator), our nitrogen-sealed products stay fresh, crunchy, and aromatic for 9 to 12 months from the packaging date.',
    },
    {
      q: 'What are the delivery timelines and charges?',
      a: 'Orders above ₹999 qualify for 100% FREE express shipping. Most tier-1 and tier-2 cities (Delhi NCR, Bengaluru, Mumbai, Hyderabad, Chennai, Pune) receive orders within 24 to 48 hours. Other pin codes are delivered within 2-4 business days.',
    },
    {
      q: 'Do you provide customized corporate gifting or wedding hampers?',
      a: 'Yes! We provide custom laser-engraved wooden boxes, custom gold-embossed message ribbons, and personalized dry fruit assortments with bulk volume discounts. Fill the contact form or email care@amritvana.com.',
    },
    {
      q: 'What is your return & refund policy?',
      a: 'We offer a 100% Purity & Freshness Guarantee. If you receive damaged packaging or are dissatisfied with product quality, simply notify us within 7 days of delivery for an instant replacement or full refund.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      showToast('Please fill in your name, email and message', 'warning');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been received! Our support team will reply within 4 business hours.', 'success');
  };

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">Contact & Support</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#FAF5EE] border border-[#EEDCC6] text-[#2D4628] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>WE ARE ALWAYS HERE TO ASSIST YOU</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D4628]">
            Get in Touch with AmritVana
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Have questions regarding your order, wholesale bulk orders, or Ayurvedic usage? Reach out to our concierge team.
          </p>
        </div>

        {/* 3 Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white p-6 rounded-[2rem] border border-[#EEDCC6] shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-[#2D4628] border border-[#EEDCC6] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <strong className="text-sm font-bold text-[#2D4628] block">Phone & WhatsApp</strong>
              <p className="text-xs text-stone-600 mt-1">+91 98765 43210</p>
              <p className="text-xs text-stone-600">+91 80 4123 9988</p>
              <span className="text-[11px] text-[#2D4628] font-semibold block mt-1">Mon - Sat: 9 AM - 8 PM IST</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-[#EEDCC6] shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-[#2D4628] border border-[#EEDCC6] flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <strong className="text-sm font-bold text-[#2D4628] block">Customer Care Email</strong>
              <p className="text-xs text-stone-600 mt-1">care@amritvana.com</p>
              <p className="text-xs text-stone-600">corporate@amritvana.com</p>
              <span className="text-[11px] text-[#2D4628] font-semibold block mt-1">Avg. Response Time: 2 Hours</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-[#EEDCC6] shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-[#2D4628] border border-[#EEDCC6] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <strong className="text-sm font-bold text-[#2D4628] block">Headquarters & Roastery</strong>
              <p className="text-xs text-stone-600 mt-1">
                AmritVana Foods Pvt. Ltd., Indiranagar 100ft Road, Bengaluru, KA 560038 / Industrial Estate, Srinagar, J&K
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form & Bulk Inquiry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left: Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-[#EEDCC6] shadow-md">
            <h2 className="font-serif text-2xl font-bold text-[#2D4628] mb-2">Send us a Direct Message</h2>
            <p className="text-xs text-stone-600 mb-6">Our dry fruit specialists will get back to you promptly.</p>

            {submitted ? (
              <div className="p-8 bg-[#FAF5EE] rounded-2xl border border-[#EEDCC6] text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#2D4628] mx-auto" />
                <h3 className="font-serif font-bold text-lg text-[#2D4628]">Message Dispatched!</h3>
                <p className="text-xs text-stone-600">
                  Thank you, {contactName}. We have received your inquiry regarding <strong>{inquiryType}</strong> and will connect with you via {contactEmail} shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-[#2D4628] text-white rounded-full text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D4628] mb-1">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Meera Reddy"
                      className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D4628] mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="meera@example.com"
                      className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D4628] mb-1">Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 00000"
                      className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D4628] mb-1">Inquiry Topic</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                    >
                      <option value="Order Support">Order Tracking & Delivery</option>
                      <option value="Corporate Bulk Gifting">Corporate Bulk Gifting (50+ Boxes)</option>
                      <option value="Wedding Favors">Wedding & Event Favors</option>
                      <option value="Product Quality & Sourcing">Product Quality & Sourcing</option>
                      <option value="Distribution & Wholesale">Distribution / Wholesale Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D4628] mb-1">Your Message or Custom Request *</label>
                  <textarea 
                    rows={4}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Tell us what you are looking for (e.g. 'We need 150 royal dry fruit hampers for Diwali corporate gifting by next month...')"
                    className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" /> Send Inquiry to Concierge
                </button>
              </form>
            )}
          </div>

          {/* Right: Corporate & Wholesale Perks (5 Cols) */}
          <div className="lg:col-span-5 bg-[#2D4628] p-6 sm:p-8 rounded-[2.5rem] border border-[#EEDCC6]/30 text-white space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-[#1E331B] text-[#FDE68A] border border-[#EEDCC6]/30 px-3 py-1 rounded-full text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                <span>B2B & INSTITUTIONAL PROGRAM</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white">
                Corporate Gifting & Wholesale Supply
              </h3>

              <p className="text-xs text-stone-200 leading-relaxed">
                Elevate your company's gifting with handcrafted wooden keepsake chests filled with unadulterated Kashmiri Mamra, King Cashews, and Saudi Ajwa dates.
              </p>

              <div className="space-y-3 pt-2 text-xs text-stone-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                  <span>Custom laser logo engraving on wooden box lids</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                  <span>Doorstep pan-India multi-address dispatch</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                  <span>GST invoice with input tax credit eligibility</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                  <span>Dedicated corporate relationship manager</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#1E331B] rounded-2xl border border-[#EEDCC6]/20 text-xs">
              <span className="font-bold text-[#FDE68A] block mb-1">Direct Corporate Desk:</span>
              <p className="text-stone-300 font-mono">b2b@amritvana.com | +91 80 4123 9988</p>
            </div>
          </div>

        </div>

        {/* Frequently Asked Questions Section */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#EEDCC6] shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Clear Answers</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D4628] mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="border border-[#EEDCC6] rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-serif font-bold text-xs sm:text-base text-[#2D4628] flex items-center justify-between gap-4 bg-[#FAF5EE]/60 hover:bg-[#FAF5EE]"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#2D4628] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {openFaq === idx && (
                  <div className="p-4 sm:p-5 text-xs sm:text-sm text-stone-600 leading-relaxed bg-white border-t border-[#EEDCC6]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
