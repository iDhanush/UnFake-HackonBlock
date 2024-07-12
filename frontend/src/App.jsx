import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";

import { StoreProvider } from "./context/StoreContext";

import toast, { Toaster } from "react-hot-toast";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Pricing from "./pages/Pricing/Pricing";
import Certificate from "./pages/certificate/Certificate";
import ResultPage from "./pages/ResultPage/ResultPage";

function App() {
  return (
    <StoreProvider>
      
      <div className="app">
        <div>
          <Toaster position="bottom-right" reverseOrder={false} />
        </div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/certification" element={<Certificate />} />
          <Route path="/result" element={<ResultPage />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </StoreProvider>
  );
}

export default App;
