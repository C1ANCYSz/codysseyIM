import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Footer() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return null;

  const socialLinks = [
    { icon: FaFacebookF, href: "#" },
    { icon: FaInstagram, href: "#" },
    { icon: FaTwitter, href: "#" },
    { icon: FaLinkedin, href: "#" },
  ];

  const categories = [
    "Front-end",
    "Back-end",
    "Full-Stack Development",
    "DevOps",
  ];

  const quickLinks = [
    { text: "About", to: "/about" },
    { text: "Become instructor", to: "/become-instructor" },
    { text: "Contact us", to: "/contact" },
    { text: "SignUp", to: "/signup" },
  ];

  const supportLinks = [
    { text: "Help Center", to: "/help" },
    { text: "FAQs", to: "/faqs" },
    { text: "Terms of Service", to: "/terms" },
    { text: "Privacy Policy", to: "/privacy" },
  ];

  return (
    <footer className="from-footer-900 relative bg-gradient-to-b to-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]"></div>

      <div className="relative container mx-auto grid grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-24">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/logo.png"
              alt="Codyssey Logo"
              className="h-12 w-12 transition-transform hover:scale-110"
            />
            <h2 className="font-logo bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold tracking-wider text-transparent">
              Codyssey
            </h2>
          </div>

          <p className="text-gray-300">
            Codyssey empowers programmers through structured learning paths,
            expert-crafted tutorials, and cutting-edge tools — your gateway to
            programming excellence.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className="group relative overflow-hidden rounded-lg bg-white/10 p-3 transition-all hover:bg-white/20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Top Categories</h3>
          <ul className="space-y-3">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  to={`/category/${category.toLowerCase()}`}
                  className="group inline-flex items-center text-gray-300 transition-colors hover:text-white"
                >
                  <span className="bg-primary-500 h-[2px] w-0 transition-all group-hover:mr-2 group-hover:w-4"></span>
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center text-gray-300 transition-colors hover:text-white"
                >
                  <span className="bg-primary-500 h-[2px] w-0 transition-all group-hover:mr-2 group-hover:w-4"></span>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Support</h3>
          <ul className="space-y-3">
            {supportLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="group inline-flex items-center text-gray-300 transition-colors hover:text-white"
                >
                  <span className="bg-primary-500 h-[2px] w-0 transition-all group-hover:mr-2 group-hover:w-4"></span>
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Codyssey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
