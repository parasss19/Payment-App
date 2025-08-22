import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Footer = () => {
  return (
    <div className="container pb-2">
      
      <div className=" flex flex-col p-4 bg-gray-50 border border-gray-300 rounded-lg">
        <div className="flex flex-col gap-4 justify-around items-center sm:flex-row sm:gap-0">
          {/* Logo */}
          <div className="flex items-center justify-center gap-4">
            <img src={logo} alt="brand_logo" className="w-10 h-10" />
            <span className="font-bold text-lg font-[Geist]">PayEasy</span>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3 items-center justify-center">
            <h1 className="font-[rubik] font-semibold text-md">Legal</h1>

            <div className="flex flex-col gap-3 items-center justify-center">
              <Link to="/privacy" className="text-black">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-black">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1 className="font-[rubik] font-semibold text-md"> Connect With Us </h1>

            <div className="flex flex-col gap-3 justify-center items-center">
              {/* socials */}
              <div className="flex gap-3">
                <a
                  href="https://x.com/Paras_tsx"
                  target="blank"
                  className="text-black hover:-translate-y-1 transition-transform ease-linear"
                >
                  <FaXTwitter className="w-[15px] h-[15px] sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://github.com/parasss19"
                  target="blank"
                  className="text-black hover:-translate-y-1 transition-transform ease-linear"
                >
                  <FaGithub className="w-[15px] h-[15px] sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/paras-mehta19/"
                  target="blank"
                  className="text-black hover:-translate-y-1 transition-transform ease-linear"
                >
                  <FaLinkedinIn className="w-[15px] h-[15px] sm:w-5 sm:h-5" />
                </a>
              </div>

              {/* Email */}
              <div>
                <a
                  href="mailto:parasss0708@gmail.com"
                  target="blank"
                  className="text-black underline"
                >
                  support@payeasy.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* below licencse  */}
        <div className="border-t mt-4 p-2">
          <p className="text-sm sm:text-[17px] text-gray-500 text-center font-[rubik]">
            © 2025 PayEasy. All rights reserved.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Footer