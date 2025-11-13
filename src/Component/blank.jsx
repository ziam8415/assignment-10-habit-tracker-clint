import React from "react";
import {
  Github,
  LinkedinIcon,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left Section - Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Habit<span className="text-pink-500">Flow</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Build better habits, one day at a time.
          </p>
        </div>

        {/* Middle Section - Contact Info */}
        <div className="text-center md:text-left space-y-2 text-gray-600 text-sm">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>support@habitflow.com</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>+880 1234-567890</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Right Section - Social + Legal */}
        <div className="flex flex-col items-center md:items-end gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.4l-5.204-6.817L5.16 21.75H1.848l7.73-8.838L1.39 2.25h6.045l4.713 6.231 6.096-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-800 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Terms & Privacy */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-500">
            <a href="/terms" className="hover:text-gray-800 transition">
              Terms & Conditions
            </a>
            <a href="/privacy" className="hover:text-gray-800 transition">
              Privacy Policy
            </a>
            <a href="/contact" className="hover:text-gray-800 transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} HabitFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
