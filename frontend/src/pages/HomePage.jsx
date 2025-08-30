import React from 'react'
import BentoCards from '../components/BentoCards'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Sparkles, Zap } from 'lucide-react';
import funds from '../assets/funds.webp'
import signup from '../assets/signup.webp'
import transaction from '../assets/transaction.webp'
import { FaArrowRight } from 'react-icons/fa6';
import heroImg from '../assets/PayEasy.webp'
import zap from '../assets/lightning.webp'
import { ArcadeEmbed } from '@/components/ArcadeEmbed';


const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Secure & Seamless Transactions",
      description: "Experience hassle-free money transfers with our secure and efficient transaction system powered by MongoDB transactions, ensuring your funds are safely processed every time",
    },
    {
      title: "Authenticated & Protected Access",
      description:"Your security is our priority! With robust authentication and protected routes, only verified users can access their accounts, making transactions safer than ever",
    },
    {
      title: "Effortless Money Management",
      description:"Easily track your transactions, monitor your balance, and manage your payments—all in one intuitive and user-friendly dashboard",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <motion.div
        className="mt-14 font-[Geist] flex flex-col items-center justify-center sm:px-8 text-center"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="relative sm:my-12 px-4 sm:px-8 flex flex-col items-center font-[Geist]">
          {/* badge */}
          <div className="font-custom-font inline-flex items-center mb-3 py-0.5 px-3 gap-2 border border-yellow-600 rounded-lg bg-yellow-50 shadow-md hover:shadow-lg hover:-translate-y-1 transition group sm:px-4 sm:py-1">
            <img src={zap} className="w-5 h-5 sm:w-6 sm:h-6" alt="lightning" />
            <p className="text-xs sm:text-sm md:text-base text-yellow-600 font-semibold">
              Blazing fast Payments
            </p>
            <FaArrowRight className="text-yellow-800 text-sm sm:text-base md:text-lg" />
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-3xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Simplify Payments, Amplify Growth{" "}
            <Sparkles className="inline w-6 h-6 sm:w-10 sm:h-10 align-middle text-yellow-800" />
          </h1>

          {/* Subheading */}
          <div class="text-center">
            <p class="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
              Manage your money smarter with{" "}
              <span class="inline-block transform -rotate-5 bg-cyan-400 text-black rounded-lg px-2 font-semibold border">
                PayEasy
              </span>
              {" "} Track transactions, send secure payments, and enjoy effortless
              financial control all in one powerful{" "}
              <span class="curved-underline font-semibold ">
                e-wallet
              </span>
            </p>
          </div>

          {/* CTA btn*/}
          <div className="mt-8">
            <button
              onClick={() => navigate("/auth")}
              className="cursor-pointer bg-cyan-800 hover:bg-cyan-700 text-white font-[Geist] font-semibold text-sm sm:text-lg px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md transition-transform duration-150 active:scale-95"
            >
              Get Started Free
            </button>
          </div>

          {/* Trusted by */}
          <p className="mt-6 text-sm text-gray-500">
            Trusted by{" "}
            <span className="font-semibold text-gray-700">1,000+</span> users
            worldwide 🌍
          </p>

          {/* Product Preview video */}
          {/* <div className="mt-10 flex justify-center items-center max-w-[95%] sm:max-w-[90%] md:max-w-[85%] mx-auto">
            <img
              src={heroImg}
              alt="Dashboard preview"
              className="rounded-2xl shadow-lg w-full border border-gray-100"
            />
          </div> */}

          {/* Product Preview demo video */}
          <div className="mt-12 flex justify-center items-center w-full max-w-[95%] sm:max-w-[95%] md:max-w-[90%] mx-auto">
            <ArcadeEmbed />
          </div>

        </div>
      </motion.div>

      {/* How it works */}
      <div className="container mb-[50px] sm:mb-[60px]  flex flex-col items-center justify-center px-4 sm:px-8 text-center">
        <div className="flex flex-col items-center text-center mb-5 sm:mb-8">
          <span className="px-4 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
            {" "}
            Quick & Easy{" "}
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold font-[Geist] text-gray-800">
            {" "}
            How it works?
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-[Geist] ">
          <div className="rounded-lg flex flex-col gap-3 items-center justify-center p-4">
            <img
              src={signup}
              alt="img1"
              className="w-20 h-20 rounded-full  border border-blue-400"
            />
            <h1 className="font-bold">Get Started in Minutes</h1>
            <span>Join PayEasy with a quick and secure sign-up process</span>
          </div>

          <div className=" rounded-lg flex flex-col gap-3 items-center justify-center p-4">
            <img
              src={funds}
              alt="img2"
              className="w-20 h-20 rounded-full  border border-blue-400"
            />
            <h1 className="font-bold">Top Up Your Wallet</h1>
            <span>
              Instantly load money from your bank account into your PayEasy
              wallet
            </span>
          </div>

          <div className=" rounded-lg flex flex-col gap-3 items-center justify-center p-4">
            <img
              src={transaction}
              alt="img3"
              className="w-20 h-20 rounded-full  border border-blue-400"
            />
            <h1 className="font-bold">Spend, Send & Save</h1>
            <span>
              Make payments, transfer money, and manage your expenses all in one
              place
            </span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <div className="flex flex-col items-center text-center mb-8">
          <span className="px-4 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
            {" "}
            Why Choose Us
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold font-[Geist] text-gray-900">
            {" "}
            Features{" "}
          </h1>
        </div>

        <div className="container flex flex-col lg:flex-row gap-5 font-[Geist] ">
          {features.map((features, index) => (
            <BentoCards
              key={index}
              title={features.title}
              description={features.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage
