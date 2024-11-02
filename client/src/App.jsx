import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RootLayout from "./layouts/RootLayout";
import Footer from "./components/Footer";
import ScrollToTop from "./components/Main/ScrollToTop";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isRightSidebarOpen) {
      setIsRightSidebarOpen(false);
    }
    setIsSidebarOpen((prev) => !prev);
  };

  const handleToggleRightSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    setIsRightSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
        isRightSidebarOpen={isRightSidebarOpen}
        handleToggleRightSidebar={handleToggleRightSidebar}
      />
      <RootLayout
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
        isRightSidebarOpen={isRightSidebarOpen}
        handleToggleRightSidebar={handleToggleRightSidebar}
      />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
