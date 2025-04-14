import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useVerifyEmail } from "../hooks/useForgotPassword";
import { useSearchParams } from "react-router-dom";

// Add this helper function at the top of your file
const mergeRefs = (...refs) => {
  return (element) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref != null) {
        ref.current = element;
      }
    });
  };
};

function VerifyEmail({ setStep }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange", // This will enable real-time validation
  });
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { verifyEmail, isLoading, error } = useVerifyEmail();

  const inputRefs = {
    code1: useRef(null),
    code2: useRef(null),
    code3: useRef(null),
    code4: useRef(null),
    code5: useRef(null),
    code6: useRef(null),
  };

  const handleCodeChange = (e, currentField) => {
    const value = e.target.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      e.target.value = "";
      return;
    }

    const fields = ["code1", "code2", "code3", "code4", "code5", "code6"];
    const currentIndex = fields.indexOf(currentField);

    if (value.length === 1) {
      if (currentIndex < fields.length - 1) {
        inputRefs[fields[currentIndex + 1]].current.focus();
      }
    }

    if (value.length === 0 && currentIndex > 0) {
      inputRefs[fields[currentIndex - 1]].current.focus();
    }
  };

  function onSubmit(data) {
    const verificationCode = Object.keys(data)
      .filter((key) => key.startsWith("code"))
      .map((key) => data[key])
      .join("");

    console.log(verificationCode);
    verifyEmail({ email, code: verificationCode, setStep });
  }

  return (
    <div className="via-primary-600 flex min-h-dvh w-full items-center justify-center bg-gradient-to-br from-blue-950 to-blue-950 p-4 text-center lg:min-h-[calc(100dvh-80px)]">
      <div className="flex w-full max-w-md flex-col rounded-3xl bg-gradient-to-r from-purple-800 to-purple-600 p-1 md:max-w-2xl">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 p-6 md:space-y-6 md:p-8">
          <img
            src="/src/assets/images/VerifyEmail.png"
            alt="locker"
            className="h-[120px] w-auto object-cover md:h-[200px]"
          />
          <h1 className="text-2xl font-bold text-white md:text-4xl">
            Verification Email sent successfully
          </h1>
          <p className="text-center text-base text-white md:text-2xl">
            Enter the code you received
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center space-y-6 rounded-b-3xl bg-white p-6 md:p-10"
        >
          <div className="flex w-full max-w-[400px] items-center justify-between gap-2 px-2 py-2 md:px-4 md:py-3">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const { ref: registerRef, ...registerProps } = register(
                `code${num}`,
                {
                  required: true,
                  pattern: /^[0-9]$/,
                },
              );

              return (
                <input
                  key={`code${num}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`h-24 w-1/6 max-w-[93px] rounded-md border-2 px-3 py-2.5 text-center text-3xl transition-all duration-300 outline-none md:px-4 md:py-3 ${errors[`code${num}`] ? "border-red-500" : "focus:border-primary-600"}`}
                  ref={mergeRefs(registerRef, (el) => {
                    inputRefs[`code${num}`].current = el;
                  })}
                  {...registerProps}
                  onChange={(e) => {
                    registerProps.onChange(e); // Call react-hook-form's onChange
                    handleCodeChange(e, `code${num}`); // Call our custom onChange
                  }}
                />
              );
            })}
          </div>

          {/* Error message */}
          {Object.keys(errors).length > 0 && (
            <p className="text-sm text-red-500">
              Please fill all fields with valid numbers
            </p>
          )}

          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 w-full rounded-full px-8 py-2.5 text-sm tracking-wider text-white uppercase transition-all duration-300 md:w-auto md:px-20 md:py-3 md:text-base"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
