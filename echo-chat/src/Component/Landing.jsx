import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthWrapper";
import { MessageSquare, Edit3, Trash2, Moon, Sun, Eye, Smartphone, Github, Twitter, Linkedin, Mail, MessageCircle, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";


function Landing() {
  const navigate = useNavigate();
  const { currUser } = useAuth();
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Proper redirect (prevents render loop)
  useEffect(() => {
    if (currUser) {
      navigate("/chats");
    }
  }, [currUser, navigate]);

  /* ================= NAVBAR ================= */

  const Header = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/app_logo.png" className="w-9 h-9" alt="EchoChat Logo" />
          <span className="text-2xl font-bold text-white tracking-wide">
            EchoChat
          </span>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="px-8 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-2xl hover:scale-105 transition duration-300"
        >
          Login
        </button>
      </div>
    </nav>
  );

  /* ================= HERO ================= */

  const Hero = () => (
    <section className="relative pt-60 pb-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-14">

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Connect Instantly.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Chat Seamlessly.
            </span>
          </h1>

          <p className="text-lg text-gray-200 mb-10 max-w-xl mx-auto md:mx-0">
            Real-time messaging with message editing, theme switching, and activity tracking.
            Beautiful, responsive design that works perfectly on any device. Built with modern technology for speed and security.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-2xl hover:scale-105 transition duration-300"
          >
            Get Started
          </button>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center animate-float">
          <img
            src="/landing1.png"
            className="relative rounded-3xl shadow-2xl border border-white/20"
            alt="Chat preview"
          />
        </div>
      </div>
    </section>
  );

  /* ================= FEATURES ================= */

  const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className="relative group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center transition duration-300 hover:-translate-y-3 hover:shadow-2xl">

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl"></div>

      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
          <Icon size={30} />
        </div>

        <h3 className="text-2xl font-semibold text-white mb-3">
          {title}
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );

  const Features = () => (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features Built For You
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Everything you need for seamless real-time communication — message editing,
            theme customization, activity tracking, and complete control over your conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={MessageSquare}
            title="Real-time Messaging"
            desc="Instant low-latency conversations powered by Firebase. See your messages and replies in real-time."
          />
          <FeatureCard
            icon={Edit3}
            title="Edit & Delete Messages"
            desc="Made a mistake? Edit your messages anytime. Delete conversations you don't need with one click."
          />
          <FeatureCard
            icon={Moon}
            title="Dark & Light Theme"
            desc="Switch seamlessly between dark and light themes. Your preference is saved automatically."
          />
          <FeatureCard
            icon={Eye}
            title="Last Seen Status"
            desc="Know when your contacts were last active. Stay updated on who's online."
          />
          <FeatureCard
            icon={Smartphone}
            title="Fully Responsive"
            desc="Chat on any device. Works perfectly on mobile, tablet, and desktop with adaptive layouts."
          />
          <FeatureCard
            icon={MessageCircle}
            title="Secure & Private"
            desc="Built with Firebase authentication and modern security standards to protect your conversations."
          />
        </div>
      </div>
    </section>
  );

  /* ================= ABOUT ================= */

  const About = () => (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Modern Messaging, Your Way
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            EchoChat is designed to make real-time communication intuitive and enjoyable.
            With features like message editing, deletion, and last-seen status, you have full control over your conversations.
            Switch between dark and light themes based on your preference, and enjoy seamless messaging across all devices.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Built with React, Firebase, and Tailwind CSS, EchoChat delivers lightning-fast performance,
            secure authentication, and a beautiful user experience that works perfectly on mobile, tablet, and desktop.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-600/30 blur-3xl rounded-full"></div>
          <img
            src="/landing2.png"
            className="relative rounded-3xl shadow-2xl border border-white/20"
            alt="App Preview"
          />
        </div>

      </div>
    </section>
  );

  /* ================= HOW IT WORKS SECTION ================= */

  const HowItWorks = () => (
    <section className="py-28 bg-white/5 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-16">
          How EchoChat Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Sign in with Google",
              desc: "Secure authentication powered by Firebase. Login with your Google account in seconds."
            },
            {
              step: "02",
              title: "Find & Select Contacts",
              desc: "Browse all available users, search by name, and select who you want to chat with."
            },
            {
              step: "03",
              title: "Chat & Interact",
              desc: "Send instant messages, edit or delete them anytime. Toggle themes and see when friends are active."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
              <div className="text-5xl font-bold text-cyan-400 mb-4">
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ================= FAQ SECTION ================= */
  const FAQ = () => (
    <section className="py-28 bg-white/5 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: "Can I edit my messages after sending?",
              a: "Yes! You can edit any of your sent messages anytime. Edited messages will show an '(edited)' indicator."
            },
            {
              q: "Is my data secure?",
              a: "Absolutely. We use Firebase authentication and secure infrastructure. All your conversations are protected."
            },
            {
              q: "Can I switch between dark and light themes?",
              a: "Yes, toggle between themes anytime using the sun icon in the chat panel. Your preference is saved automatically."
            },
            {
              q: "How do I see when my contacts were last active?",
              a: "Each contact shows their last seen status in the chat list. You'll see timestamps like '5m ago', '2h ago', etc."
            },
            {
              q: "Is EchoChat available on mobile?",
              a: "Absolutely. EchoChat is fully responsive and works perfectly on phones, tablets, and desktops."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden transition duration-300">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition"
              >
                <h3 className="text-white font-semibold text-lg text-left">
                  {faq.q}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 flex-shrink-0 ml-4 transition duration-300 ${expandedFAQ === index ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {expandedFAQ === index && (
                <div className="px-6 pb-6 pt-4 border-t border-white/10">
                  <p className="text-gray-300">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );


  /* ================= CTA ================= */

  const CTA = () => (
    <section className="py-28 px-6 text-center">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-xl border border-white/20 p-12 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold text-white mb-6">
          Start Messaging in Seconds
        </h2>
        <p className="text-gray-300 mb-10">
          Sign in with Google and start real-time conversations with instant message editing, theme switching, and activity tracking.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-xl hover:scale-105 transition duration-300"
        >
          Get Started Today
        </button>
      </div>
    </section>
  );


  /* ================= FOOTER ================= */

  const Footer = () => {
    return (
      <footer className="relative mt-24 border-t border-white/10">

        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="text-cyan-400" size={32} />
                <span className="text-2xl font-bold text-white">
                  EchoChat
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Real-time messaging with message editing, theme switching, and activity tracking.
                Built with React, Firebase, and modern web technologies for seamless communication.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-6">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition cursor-pointer">Features</li>
                <li className="hover:text-white transition cursor-pointer">Security</li>
                <li className="hover:text-white transition cursor-pointer">Updates</li>
                <li className="hover:text-white transition cursor-pointer">Roadmap</li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition cursor-pointer">About</li>
                <li className="hover:text-white transition cursor-pointer">Careers</li>
                <li className="hover:text-white transition cursor-pointer">Blog</li>
                <li className="hover:text-white transition cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold mb-6">
                Stay Updated
              </h3>
              <p className="text-gray-400 mb-4 text-sm">
                Subscribe to get the latest updates and feature releases.
              </p>

              <div className="flex bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent px-4 py-3 text-white placeholder-gray-400 outline-none w-full"
                />
                <button className="px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:opacity-90 transition">
                  <Mail size={18} />
                </button>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="my-12 border-t border-white/10"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">

            {/* Copyright */}
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2026 EchoChat. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 text-sm text-gray-400">
              <span className="hover:text-white transition cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-white transition cursor-pointer">
                Terms of Service
              </span>
              <span className="hover:text-white transition cursor-pointer">
                Cookies
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex gap-5">
              <Github className="text-gray-400 hover:text-white transition cursor-pointer" />
              <Twitter className="text-gray-400 hover:text-white transition cursor-pointer" />
              <Linkedin className="text-gray-400 hover:text-white transition cursor-pointer" />
            </div>

          </div>

        </div>
      </footer>
    );
  };

  /* ================= BACKGROUND ================= */

  const Background = () => (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0c143c] to-[#0a5263]"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl"></div>
    </div>
  );

  /* ================= RETURN ================= */

  return (
    <div className="font-sans text-white overflow-x-hidden">
      <Background />
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <HowItWorks />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
