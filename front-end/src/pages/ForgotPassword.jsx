import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { useState } from "react";
import EmailForm from "../ui/EmailForm";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
function ForgotPassword() {
  const [step, setStep] = useState(1);

  if (step === 1) {
    return <EmailForm setStep={setStep} />;
  }

  if (step === 2) {
    return <VerifyEmail setStep={setStep} />;
  }

  if (step === 3) {
    return <ResetPassword />;
  }
}

export default ForgotPassword;
