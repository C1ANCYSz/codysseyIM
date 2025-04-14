import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="via-primary-600 flex min-h-dvh w-full items-center justify-center bg-gradient-to-br from-blue-950 to-blue-950 p-4 text-center lg:min-h-[calc(100dvh-80px)]">
      <div className="flex w-full max-w-md flex-col rounded-3xl bg-gradient-to-r from-purple-800 to-purple-600 p-1 md:max-w-2xl">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-6 md:space-y-6 md:p-8">
          <img
            src="/src/assets/images/resetPassword.png"
            alt="locker"
            className="h-[120px] w-auto object-cover md:h-[200px]"
          />
          <h1 className="text-2xl font-bold text-white md:text-4xl">
            NEW CREDENTIALS
          </h1>
          <p className="text-center text-base text-white md:text-2xl">
            Your identity has been verified! Set your new password
          </p>
        </div>

        {/* Form Section */}
        <form
          className="flex flex-col items-center justify-between rounded-b-3xl bg-white p-6 md:p-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="group relative flex w-full items-center gap-2 px-2 py-2 md:px-4 md:py-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="focus:border-primary-600 w-full rounded-md border-2 px-3 py-2.5 transition-all duration-300 outline-none md:px-4 md:py-3"
              {...register("newPassword", { required: true })}
            />
            <FaEye
              className="group-focus-within:text-primary-600 absolute right-6 cursor-pointer text-xl text-black transition-colors duration-300 md:right-8 md:text-2xl"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="group relative flex w-full items-center gap-2 px-2 py-2 md:px-4 md:py-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className="focus:border-primary-600 w-full rounded-md border-2 px-3 py-2.5 transition-all duration-300 outline-none md:px-4 md:py-3"
              {...register("confirmNewPassword", { required: true })}
            />
            <FaEye
              className="group-focus-within:text-primary-600 absolute right-6 cursor-pointer text-xl text-black transition-colors duration-300 md:right-8 md:text-2xl"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 w-full cursor-pointer rounded-full px-8 py-2.5 text-sm tracking-wider text-white uppercase transition-all duration-300 md:w-auto md:px-20 md:py-3 md:text-base"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
