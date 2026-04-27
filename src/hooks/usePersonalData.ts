import { useCallback } from "react";
import { useFormContext } from "../context/FormContext";

export const usePersonalData = () => {
  const { formData, updateFormData, errors, setErrors } = useFormContext();

  const formatPhone = useCallback(
    (rawValue: string) => {
      let digits = rawValue.replace(/\D/g, "");
      if (digits.length === 0) {
        updateFormData({ phone: "0" });
        return;
      }
      if (digits[0] !== "0") {
        digits = "0" + digits.substring(1);
      }
      digits = digits.substring(0, 10);
      let formatted = digits[0];
      if (digits.length > 1) formatted += " " + digits.substring(1, 4);
      if (digits.length > 4) formatted += " " + digits.substring(4, 7);
      if (digits.length > 7) formatted += " " + digits.substring(7, 10);
      updateFormData({ phone: formatted });
    },
    [updateFormData],
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input === "" || input === "0") {
      updateFormData({ phone: "0" });
      if (errors.phone) setErrors({ ...errors, phone: "" });
      return;
    }
    formatPhone(input);
    if (errors.phone) setErrors({ ...errors, phone: "" });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const digitsOnly = formData.phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10 || digitsOnly[0] !== "0") {
      newErrors.phone = "Введите полный номер (0XXX XXX XXX)";
    }
    if (!formData.firstName.trim()) newErrors.firstName = "Имя обязательно";
    if (!formData.lastName.trim()) newErrors.lastName = "Фамилия обязательна";
    if (!formData.gender) newErrors.gender = "Выберите пол";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { phone: formData.phone, handlePhoneChange, validate };
};
