import { Link } from "react-router-dom";
import { TbMapRoute } from "react-icons/tb";
import { MdOndemandVideo } from "react-icons/md";
import { FaArrowRight, FaRegUser } from "react-icons/fa";
const Home = () => {
  return (
    <div className="containertwo mx-auto space-y-12 p-2 lg:p-10">
      <div className="relative min-h-[calc(100vh-80px)] rounded-lg border-4 border-white bg-[url(/src/assets/images/exploreMore.jpg)] bg-cover bg-center md:rounded-4xl">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-black/70 to-black/20 backdrop-blur-[2px] md:rounded-4xl"></div>

        <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-8 px-4 text-center md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold tracking-wide text-white uppercase md:text-5xl lg:text-6xl">
            Your Companion for a
            <span className="text-primary-400"> Better</span>
            <br />
            Academic Journey
          </h2>

          <p className="max-w-2xl text-lg text-gray-200 md:text-xl">
            We help programmers learn to code through structured roadmaps,
            concise tutorials, and practical tools — all in one place.
          </p>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link to="/signup">
              <button className="bg-primary-600 hover:bg-primary-700 cursor-pointer rounded-lg px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-105">
                Get Started
              </button>
            </Link>
            <button className="cursor-pointer rounded-lg border-2 border-white bg-transparent px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10">
              Explore Roadmaps
            </button>
          </div>
        </div>
      </div>
      <div className="bg-primary-600 relative w-full rounded-lg pt-20 pb-30 md:rounded-4xl">
        <div className="absolute inset-0 bg-[url(/src/assets/images/wiggly.png)] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <h2 className="text-center text-3xl font-bold tracking-wide text-white uppercase md:text-5xl lg:text-6xl">
            JOIN OUR COMMUNITY
          </h2>
          <div className="mt-20 grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="rounded-full border-4 bg-white p-8">
                <TbMapRoute className="text-[120px]" />
              </div>
              <h3 className="text-4xl font-bold text-white capitalize">
                Customized roadmaps
              </h3>
              <p className="mx-8 text-center text-xl text-gray-200">
                Build your skills strategically with expert-designed learning
                paths
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="rounded-full border-4 bg-white p-8">
                <MdOndemandVideo className="text-[120px]" />
              </div>
              <h3 className="text-4xl font-bold text-white capitalize">
                High-quality Content
              </h3>
              <p className="mx-8 text-center text-xl text-gray-200">
                Master programming concepts through clear, concise, and
                practical lessons
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="rounded-full border-4 bg-white p-10">
                <FaRegUser className="text-[100px]" />
              </div>
              <h3 className="text-4xl font-bold text-white capitalize">
                Start at any level
              </h3>
              <p className="mx-8 text-center text-xl text-gray-200">
                Whether you&apos;re a beginner or pro, there&apos;s always room
                to grow
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full border-4 bg-white p-8">
                <MdOndemandVideo className="text-[120px]" />
              </div>
              <h3 className="text-4xl font-bold text-white capitalize">
                Flexible Learning
              </h3>
              <p className="mx-8 text-center text-xl text-gray-200">
                Learn at your own pace, on your own schedule
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full rounded-lg bg-[#D2EEFF] pt-20 pb-30 md:rounded-4xl">
        <div className="absolute inset-0 bg-[url(/src/assets/images/wiggly.png)] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <h2 className="text-center text-3xl font-bold tracking-wide uppercase md:text-5xl lg:text-6xl">
            FEATURED CATEGORIES
          </h2>
          <div className="mt-20 grid w-full grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="bg-primary-600 rounded-full p-6">
                <img
                  src="/src/assets/images/frontend.png"
                  alt="frontend"
                  className="w-[160px]"
                />
              </div>
              <h3 className="text-4xl font-bold capitalize">
                Front-end Development
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="bg-primary-600 rounded-full p-6">
                <img
                  src="/src/assets/images/backend.png"
                  alt="backend"
                  className="w-[160px]"
                />
              </div>
              <h3 className="text-4xl font-bold capitalize">
                Back-end Development
              </h3>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="bg-primary-600 rounded-full p-8">
                <img
                  src="/src/assets/images/uiux.png"
                  alt="uiux"
                  className="w-[140px]"
                />
              </div>
              <h3 className="text-4xl font-bold capitalize">UI/UX Design</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="bg-primary-600 rounded-full p-8">
                <img
                  src="/src/assets/images/machinelearning.png"
                  alt="machinelearning"
                  className="w-[140px]"
                />
              </div>
              <h3 className="text-4xl font-bold capitalize">
                Machine Learning
              </h3>
            </div>
          </div>
          <button className="bg-footer-800 hover:bg-footer-900 mt-20 flex cursor-pointer items-center gap-2 rounded-full px-8 py-5 text-4xl font-bold text-white transition-all duration-300 hover:scale-105">
            <span>Explore More</span>
            <FaArrowRight className="mt-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
