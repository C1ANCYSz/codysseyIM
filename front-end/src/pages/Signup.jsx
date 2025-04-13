import { useForm } from "react-hook-form";

function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <div className="via-primary-600 flex h-dvh w-screen items-center justify-center bg-gradient-to-br from-blue-950 to-blue-950 lg:h-[calc(100dvh-80px)]">
      <div className="flex w-full max-w-4xl rounded-3xl bg-gradient-to-r from-purple-800 to-purple-600 p-1">
        {/* Left side - Purple gradient section */}
        <div className="hidden w-1/2 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-8 lg:flex lg:items-center lg:justify-center">
          <img
            src="/src/assets/images/login2.png"
            alt="signup"
            className="-mt-5 h-[270px] object-cover"
          />
        </div>

        {/* Right side - White form section */}
        <div className="w-full rounded-2xl bg-white p-8 lg:w-1/2">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-nowrap text-purple-600 md:text-3xl">
              WELCOME ABOARD!
            </h1>
            <p className="text-gray-600">Create your account now</p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-600"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-600"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-600"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="hover:text-primary-700 h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-purple-600"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === getValues("password") ||
                    "password does not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="hover:text-primary-700 h-5 w-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            <button className="mt-2 cursor-pointer rounded-lg bg-black p-3 font-semibold text-white transition-all hover:opacity-90">
              SIGNUP
            </button>

            <p className="text-center text-sm text-gray-600">
              Already a member?{" "}
              <a href="/login" className="text-purple-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
