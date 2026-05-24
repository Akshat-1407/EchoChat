# EchoChat

A modern, real-time web chatting application built with React and Firebase. Connect with users, discover friends, and chat in real-time with a beautiful, responsive interface.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Development](#development)
- [Environment Setup](#environment-setup)
- [Deployment](#deployment)
- [Routes](#routes)
- [Components](#components)
- [Collaboration & Contributing](#collaboration--contributing)
- [Troubleshooting](#troubleshooting)
- [Future Scope](#future-scope)

## Features

- **Google OAuth Authentication** - Secure sign-in with your Google account
- **Real-time Messaging** - Send and receive messages instantly via Firestore
- **User Discovery** - Browse all online users and their last seen status
- **Dark/Light Theme** - Toggle between themes with local persistence
- **Responsive Design** - Seamless experience on desktop, tablet, and mobile
- **Progressive Web App** - Install as a standalone app on any device
- **Message Orientation** - Automatic left/right alignment based on sender/receiver
- **Protected Routes** - Automatic authorization and redirects

## Tech Stack

### Frontend
- **React 19.1.1** - Modern UI framework with hooks
- **React Router 7.9.4** - Client-side routing and navigation
- **Tailwind CSS 4.1.14** - Utility-first CSS styling
- **Vite 7.1.7** - Lightning-fast build tool and dev server

### Backend & Database
- **Firebase 12.4.0** - Authentication and Firestore database
  - Firebase Auth (Google Sign-In)
  - Firestore Database (real-time data)
  - Firebase Hosting (deployment)

### Tools & Libraries
- **Lucide React 0.552.0** - Beautiful icon library
- **Vite PWA 1.3.0** - Progressive Web App support
- **ESLint 9.36.0** - Code quality and linting

## Quick Start

```bash
# Install dependencies
npm install

# Configure Firebase
# Update firebaseConfig.js with your Firebase credentials

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

## Project Structure

```
src/
├── Component/
│   ├── AuthWrapper.jsx      # Auth state management (Context)
│   ├── ChatPanel.jsx        # User list and discovery sidebar
│   ├── ChatWindow.jsx       # Message interface and chat display
│   ├── Home.jsx             # Main layout with theme toggle
│   ├── Login.jsx            # Google OAuth login page
│   ├── Landing.jsx          # Public landing page
│   ├── Profile.jsx          # User profile and account management
│   ├── ProtectedRoute.jsx   # Route authorization wrapper
│   └── PageNotFound.jsx     # 404 error page
├── App.jsx                  # Main app routing configuration
├── main.jsx                 # React entry point
└── index.css                # Global styles

firebaseConfig.js            # Firebase configuration
vite.config.js               # Vite build configuration
package.json                 # Dependencies and scripts
```

## Installation & Setup

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- Firebase project with Google authentication enabled

### Steps

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd echo-chat
   npm install
   ```

2. **Set up Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project or use existing one
   - Enable Google Sign-in in Authentication
   - Create a Firestore database (Start in test mode)
   - Copy credentials to `firebaseConfig.js`

3. **Start development:**
   ```bash
   npm run dev
   ```
   App will be available at `http://localhost:5173`

## Development

### Available Scripts

```bash
npm run dev      # Start dev server with hot module replacement
npm run build    # Create optimized production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint code quality checks
```

### Workflow
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes - Vite auto-reloads on save
3. Test locally with `npm run dev`
4. Run `npm run lint` before committing
5. Commit: `git commit -m "Add your feature"`

## Environment Setup

### Firebase Configuration
Create or update `firebaseConfig.js`:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};
```

### Local Development
- Vite dev server runs on `http://localhost:5173`
- Hot module replacement enabled
- Check browser console for errors
- Firebase console for database inspection

## Deployment

```bash
# Install Firebase tools globally
npm install -g firebase-tools

# Build production bundle
npm run build

# Login to Firebase (first time)
firebase login

# Initialize Firebase (first time)
firebase init
# Select: Hosting, public dir: dist, SPA: Yes

# Deploy to Firebase Hosting
firebase deploy
```

Your app will be live at your Firebase hosting URL!

## Routes

- `/` - Landing page (public)
- `/login` - Google OAuth login (public)
- `/chats` - Chat interface (protected)
- `/chats/:chatId` - Specific chat conversation (protected)
- `*` - 404 page not found

Protected routes automatically redirect unauthorized users to login.

## Components

- **AuthWrapper** - Global authentication state management via Context API
- **Home** - Main container with layout management and theme toggle
- **ChatPanel** - Left sidebar displaying user list and discovery
- **ChatWindow** - Center section with message display and input
- **Profile** - User account information and settings
- **Login** - Google OAuth authentication interface
- **Landing** - Public landing page with app introduction
- **ProtectedRoute** - Wrapper enforcing user authorization
- **PageNotFound** - 404 error page

## Collaboration & Contributing

We welcome contributions! Here's how to collaborate:

### Getting Started
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/echo-chat.git`
3. Add upstream: `git remote add upstream <original-repo-url>`
4. Create a feature branch: `git checkout -b feature/amazing-feature`

### Making Changes
1. Follow the existing code style
2. Run `npm run lint` to check code quality
3. Test your changes with `npm run dev`
4. Keep commits focused and descriptive

### Submitting Changes
1. Push to your fork: `git push origin feature/amazing-feature`
2. Create a Pull Request on GitHub
3. Describe your changes clearly
4. Link any related issues
5. Wait for review and feedback

### Code Standards
- Use functional components and React hooks
- Follow ESLint rules (run `npm run lint`)
- Write meaningful variable and function names
- Add comments for complex logic
- Test changes before submitting PR

### Areas to Contribute
- Bug fixes and improvements
- UI/UX enhancements
- Performance optimizations
- Documentation improvements
- New feature implementations

## Troubleshooting

### Firebase Connection Issues
- Verify `firebaseConfig.js` has correct credentials
- Check Firebase project status in console
- Ensure Firestore database is created
- Verify Google authentication is enabled

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clean Vite cache
rm -rf dist .vite
npm run build
```

### Development Issues
- Check browser console for errors
- Verify Firebase credentials
- Ensure Node.js version is v16+
- Try `npm run lint` to find code issues

### Deployment Issues
- Ensure `npm run build` succeeds locally
- Verify Firebase CLI: `firebase --version`
- Check login status: `firebase login`
- Confirm `dist/` folder exists after build

## Future Scope

- **File Sharing** - Share images and documents via Firebase Storage
- **Group Chats** - Create and manage group conversations
- **Voice/Video Calling** - One-on-one real-time communication
- **Message Reactions** - React to messages with emojis
- **Typing Indicators** - See when users are typing
- **User Blocking** - Block and unblock users
- **Push Notifications** - Get notified of new messages
- **Message Search** - Search through chat history
- **Read Receipts** - See when messages are read

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b bugfix/YourBugFix` or `git checkout -b feature/newFeature`)
3. Commit your changes (`git commit -m 'fix: resolve issue with newFeature'`)
4. Push to the branch (`git push origin bugfix/YourBugFix` or `git push origin feature/newFeature`)
5. Open a Pull Request


## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a full-stack learning project to demonstrate modern web development practices.

## 📧 Contact & Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using React, Firebase, and Tailwind CSS**