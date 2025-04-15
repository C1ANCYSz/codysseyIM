import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";

function Footer() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return null;
  return (
    <footer className="bg-footer-900 text-white">
      <div className="container mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 px-4 py-10 text-sm md:py-20 md:text-base">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 select-none">
            <img
              src="/src/assets/logo.png"
              alt="logo"
              className="mt-2 h-10 w-10"
            />
            <h2 className="font-logo text-2xl font-bold tracking-wider md:text-4xl">
              Codyssey
            </h2>
          </div>
          <p className="text-footer-text">
            Codyssey is a platform that helps programmers learn to code through
            structured roadmaps, concise tutorials, and practical tools — all in
            one place.
          </p>
          <div className="flex items-center gap-3">
            <FaFacebookF className="bg-footer-700/20 hover:bg-primary-600 hover:shadow-primary-600/50 cursor-pointer p-3 text-5xl text-white transition-all duration-300 hover:shadow-lg" />
            <FaInstagram className="bg-footer-700/20 hover:bg-primary-600 hover:shadow-primary-600/50 cursor-pointer p-3 text-5xl text-white transition-all duration-300 hover:shadow-lg" />
            <FaTwitter className="bg-footer-700/20 hover:bg-primary-600 hover:shadow-primary-600/50 cursor-pointer p-3 text-5xl text-white transition-all duration-300 hover:shadow-lg" />
            <FaLinkedin className="bg-footer-700/20 hover:bg-primary-600 hover:shadow-primary-600/50 cursor-pointer p-3 text-5xl text-white transition-all duration-300 hover:shadow-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-5 md:ml-10">
          <h3 className="text-lg font-bold capitalize">top 4 categories</h3>
          <ul className="flex flex-col gap-2">
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              Front-end
            </li>
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              Back-end
            </li>
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              Full-Stack Development
            </li>
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              DevOps
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-bold capitalize">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              About
            </li>
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              Become instructor
            </li>
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              Contact us
            </li>
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              SignUp
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-bold capitalize">Support</h3>
          <ul className="flex flex-col gap-2">
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              Help Center
            </li>
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              FAQs
            </li>
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              Terms of Service
            </li>
            <li className="hover:border-primary-500 text-footer-text w-fit cursor-pointer border-b-3 border-transparent py-1 pr-1 font-bold capitalize transition-all duration-300 hover:border-b-3 hover:text-white">
              Privacy Policy
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
