import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              PlacementPilot
            </h3>
            <p className="text-sm text-gray-600">
              Empowering careers through seamless interviews
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              For Candidates
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/practice"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Practice Interviews
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Resume Evaluator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              For Companies
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/solutions"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Interview Solutions
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/demo"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Request Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} PlacementPilot. All rights
            reserved.
          </p>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <Link
              to="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Terms of Service
            </Link>
            <Link
              to="/accessibility"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Accessibility
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
