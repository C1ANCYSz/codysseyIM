import { useState } from "react";
import EmailForm from "../ui/EmailForm";

import ResetEmailSent from "./ResetEmailSent";

function ForgotPassword() {
  const [step, setStep] = useState(1);

  if (step === 1) {
    return <EmailForm setStep={setStep} />;
  }

  if (step === 2) {
    return <ResetEmailSent setStep={setStep} />;
  }
}

export default ForgotPassword;
