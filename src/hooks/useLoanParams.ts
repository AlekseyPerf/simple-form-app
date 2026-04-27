import { useEffect, useState } from "react";
import { useFormContext } from "../context/FormContext";
import { useNavigate } from "react-router-dom";
import { pluralizeDays, roundToStep } from "../utils";
import axios from "axios";

export const useLoanParams = () => {
  const { formData, updateFormData, errors, setErrors } = useFormContext();
  const navigate = useNavigate();

  const [termInput, setTermInput] = useState<string>(String(formData.loanTerm));
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const dayWord = pluralizeDays(formData.loanTerm);

  const handleAmountChange = (raw: string) => {
    const num = Number(raw);
    if (!isNaN(num)) {
      const corrected = roundToStep(num, 100, 200, 1000);
      updateFormData({ loanAmount: corrected });
      if (errors.loanAmount) setErrors({ ...errors, loanAmount: "" });
    }
  };

  const handleTermChange = (raw: string) => {
    const num = Number(raw);
    if (!isNaN(num)) {
      const corrected = roundToStep(num, 1, 10, 30);
      updateFormData({ loanTerm: corrected });
      setTermInput(String(corrected));
      if (errors.loanTerm) setErrors({ ...errors, loanTerm: "" });
    } else {
      setTermInput(String(formData.loanTerm));
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await axios.post("https://dummyjson.com/products/add", {
        title: formData.firstName + " " + formData.lastName,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Ошибка отправки заявки:", error);
      alert("Произошла ошибка при отправке заявки. Попробуйте снова.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    setTermInput(String(formData.loanTerm));
  }, [formData.loanTerm, setTermInput]);

  useEffect(() => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.gender
    ) {
      navigate("/form1", { replace: true });
    } else if (!formData.workplace || !formData.address) {
      navigate("/form2", { replace: true });
    }
  }, [formData, navigate]);

  return {
    loanAmount: formData.loanAmount,
    loanTerm: formData.loanTerm,
    handleAmountChange,
    handleTermChange,
    dayWord,
    termInput,
    setTermInput,
    handleSubmit,
    submitting,
    showModal,
    setShowModal,
  };
};
