import React, { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import { ImCross } from "react-icons/im";

const Layout = () => {
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsBannerOpen(true);
    }, 3000);
  }, []);

  return (
    <main className="relative flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {isBannerOpen && (
        <BannerModalComponent
          isBannerOpen={isBannerOpen}
          setIsBannerOpen={setIsBannerOpen}
        />
      )}
    </main>
  );
};

function BannerModalComponent({ isBannerOpen, setIsBannerOpen }) {
  return (
    <main className="fixed inset-0 bg-black/70 flex justify-center items-center px-4">
      <div className="relative bg-[#181326] p-10 rounded-xl flex flex-col items-center">
        <p className="text-xl max-[400px]:text-base text-center">
          🪙Start earning coins now!!🪙
        </p>
        <p className="text-red-400 text-center max-[400px]:text-sm">
          You need atleast 50 coins to apply to internships!!
        </p>
        <p className="text-gray-400 mt-4 text-center max-[400px]:text-sm">
          Fill your details in the 'Edit Profile' section to earn coins.
        </p>
        <ImCross
          onClick={() => setIsBannerOpen(!isBannerOpen)}
          className="absolute -top-1 -right-1 p-1 bg-white text-red-400 rounded-full cursor-pointer"
        />
      </div>
    </main>
  );
}

export default Layout;
