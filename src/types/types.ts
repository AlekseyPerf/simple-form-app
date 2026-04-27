export interface FormData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  workplace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
}

export const initialFormData: FormData = {
  phone: "0",
  firstName: "",
  lastName: "",
  gender: "",
  workplace: "",
  address: "",
  loanAmount: 200,
  loanTerm: 10,
};

export interface FormContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  errors: Record<string, string>;
  setErrors: (errors: Record<string, string>) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
  clearFormData: () => void;
}

export interface ModalProps {
  onClose: () => void;
  dayWord: string;
}
