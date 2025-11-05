import { useNavigate } from 'react-router-dom'
import { useAuth } from "./AuthWrapper";


function Landing() {
  const MessageSquareIcon = ({ className = "w-6 h-6" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );

  const UsersIcon = ({ className = "w-6 h-6" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const LockIcon = ({ className = "w-6 h-6" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  );

  // --- Components ---

  const Header = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md p-4">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <div className="flex items-center justify-center gap-3">
          <img src="/app_logo.png" className="w-8 h-8 mt-2" alt="" />
          <span className="text-2xl font-bold text-white tracking-wide">
            EchoChat
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/login")} className="font-medium px-5 w-25 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all">
            Login
          </button>
        </div>
      </div>
    </nav>
  );

  const Hero = () => (
    <section className="container mx-auto max-w-6xl pt-40 pb-20 flex flex-col md:flex-row items-center gap-12 px-6">
      {/* Left Side: Text Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Connect Instantly.
          <br />
          Chat Seamlessly.
        </h1>
        <p className="text-lg lg:text-xl text-gray-200 mb-10">
          Welcome to EchoChat, where every message resonates. Experience
          real-time conversations with friends, family, and colleagues.
        </p>
        <button onClick={() => navigate("/login")} className="font-bold px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
          Get Started Now
        </button>
      </div>

      <img src="/landing.png" className="h-120 w-150" alt="" />
      
    </section>
  );

  const Features = () => (
    <section id="features" className="py-20 bg-white/5">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Features That Resonate</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            EchoChat is packed with features to make your conversations
            as smooth and expressive as possible.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full inline-block mb-6">
              <MessageSquareIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Real-time Messaging</h3>
            <p className="text-gray-300">
              Instantly send and receive messages with our low-latency
              chat infrastructure. No delays, just pure conversation.
            </p>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full inline-block mb-6">
              <UsersIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Group Chats</h3>
            <p className="text-gray-300">
              Bring your friends, family, or team together. Create
              groups easily and manage them with simple admin tools.
            </p>
          </div>
          {/* Feature Card 3 */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full inline-block mb-6">
              <LockIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Secure & Private</h3>
            <p className="text-gray-300">
              Your conversations are your own. We prioritize your privacy
              with end-to-end encryption (coming soon) and secure data handling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="py-8">
      <div className="container mx-auto max-w-6xl px-6 text-center text-gray-300">
        <p>&copy; 2025 EchoChat. All rights reserved.</p>
      </div>
    </footer>
  );


  const { currUser } = useAuth();
  const navigate = useNavigate()

  if (currUser) {
    navigate("/chats");
    return <></>;
  }

  return (
    <div>
      <div className="font-sans antialiased text-gray-100">
        <div
          className="fixed inset-0 -z-10 h-full w-full bg-indigo-900 bg-[radial-gradient(125%_125%_at_50%_10%,#0c143c_40%,#0a5263_100%)]"
          style={{
            backgroundImage: 'radial-gradient(at left top, #0f172a, #0369a1, #06b6d4)'
          }}
        ></div>

        <Header />
        <main>
          <Hero />
          <Features />
        </main>
        <Footer />
      </div>
    </div>

  )
}

export default Landing