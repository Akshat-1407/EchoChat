import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthWrapper from "./Component/AuthWrapper.jsx";

import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    console.log("New content available");
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </AuthWrapper>
)