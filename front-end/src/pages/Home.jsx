import { Link } from "react-router-dom";
import { TbMapRoute } from "react-icons/tb";
import { MdOndemandVideo } from "react-icons/md";
import { FaArrowRight, FaRegUser } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="mx-auto max-w-[1440px] space-y-24 p-4 lg:p-8">
        {/* Hero Section */}
        <div className="from-primary-900 relative min-h-[90vh] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br to-slate-950">
          <div className="bg-[radial-gradient(circle_at_50%_120%,rgba(182, 119, 198, 0.2),rgba(0,0,0,0))] absolute inset-0"></div>

          <div className="relative flex min-h-[90vh] flex-col items-center justify-center gap-10 px-6 text-center lg:px-20">
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              Master Programming
              <span className="bg-gradient-to-r from-indigo-300 to-slate-300 bg-clip-text text-transparent">
                {" "}
                The Right Way
              </span>
            </h1>

            <p className="max-w-2xl text-xl text-gray-300 md:text-2xl">
              Learn to code through interactive roadmaps, hands-on projects, and
              a supportive community. Your journey to becoming a developer
              starts here.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <Link to="/signup">
                <button className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 text-lg font-bold text-slate-800 transition-all hover:scale-105">
                  <span className="relative z-10">Start Learning Now</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-200 to-slate-200 opacity-0 transition-opacity group-hover:opacity-100"></div>
                </button>
              </Link>
              <Link to="/roadmaps">
                <button className="rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  View Learning Paths
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="from-primary-900 relative rounded-3xl bg-gradient-to-r to-slate-950 py-32 text-center">
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <h2 className="text-center text-4xl font-bold text-white md:text-6xl">
              Why Choose Us?
            </h2>

            <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <TbMapRoute className="h-16 w-16" />,
                  title: "Structured Learning",
                  description:
                    "Follow clear, progressive paths to master programming skills",
                },
                {
                  icon: <MdOndemandVideo className="h-16 w-16" />,
                  title: "Interactive Content",
                  description:
                    "Learn through engaging videos, quizzes, and coding challenges",
                },
                {
                  icon: <FaRegUser className="h-16 w-16" />,
                  title: "Personalized Path",
                  description:
                    "Learn at your own pace with customized learning tracks",
                },
                {
                  icon: <LiaChalkboardTeacherSolid className="h-16 w-16" />,
                  title: "Expert Support",
                  description:
                    "Get help from experienced developers when stuck",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center gap-6 rounded-2xl bg-white/10 p-8 backdrop-blur-sm transition-all select-none hover:bg-white/20"
                >
                  <div className="rounded-2xl bg-white/90 p-6 text-indigo-600 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-center text-lg text-gray-200">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Tracks */}
        <div className="from-primary-900 relative rounded-3xl bg-gradient-to-r to-slate-950 py-32">
          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <h2 className="text-center text-4xl font-bold text-white md:text-6xl">
              Popular Learning Tracks
            </h2>

            <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Frontend Development",
                  description:
                    "Master modern web development with React, Vue & more",
                  level: "Beginner Friendly",
                },
                {
                  title: "Backend Development",
                  description: "Build scalable servers & APIs with Node.js",
                  level: "Intermediate",
                },
                {
                  title: "Full Stack Development",
                  description: "Become a complete web developer",
                  level: "Advanced",
                },
              ].map((track, index) => (
                <div
                  key={index}
                  className="group cursor-pointer rounded-xl bg-slate-700/50 p-8 transition-all hover:bg-slate-700"
                >
                  <h3 className="text-2xl font-bold text-white">
                    {track.title}
                  </h3>
                  <p className="mt-4 text-gray-300">{track.description}</p>
                  <span className="mt-4 inline-block rounded-full bg-indigo-500/20 px-4 py-1 text-sm text-indigo-200">
                    {track.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="from-primary-900 relative overflow-hidden rounded-3xl bg-gradient-to-r to-slate-950 py-20">
          <div className="relative z-10 flex flex-col items-center gap-12">
            <h2 className="text-center text-3xl font-bold text-white md:text-5xl">
              Ready to Begin Your Coding Journey?
            </h2>
            <Link to="/signup">
              <button className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-xl font-bold text-slate-800 transition-all hover:scale-105">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started For Free
                  <FaArrowRight className="transition-transform group-hover:translate-x-2" />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
