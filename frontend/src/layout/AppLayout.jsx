import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <div className="min-h-screen w-full bg-white relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #14b8a6 100%)`,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Layout */}
      <div className="relative ">
        <div className="px-6 py-4">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>

    </div>
  );
};

export default AppLayout;
