import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { useCategories } from "../hooks/useCategories";

const Form2AddressWork = () => {
  const { formData, updateFormData, errors, setErrors } = useFormContext();
  const { categories, loading } = useCategories();
  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.workplace) newErrors.workplace = "Выберите место работы";
    if (!formData.address.trim()) newErrors.address = "Адрес обязателен";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) navigate("/form3");
  };
  const handleBack = () => navigate("/form1");

  useEffect(() => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.phone ||
      !formData.gender
    ) {
      navigate("/form1", { replace: true });
    }
  }, [formData, navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">
                Адрес и место работы
              </h3>
              <div className="mb-3">
                <label htmlFor="workplace" className="form-label">
                  Место работы
                </label>
                <select
                  className={`form-select ${errors.workplace ? "is-invalid" : ""}`}
                  id="workplace"
                  value={formData.workplace}
                  onChange={(e) => {
                    updateFormData({ workplace: e.target.value });
                    if (errors.workplace)
                      setErrors({ ...errors, workplace: "" });
                  }}
                  disabled={loading}
                >
                  <option value="">
                    {loading ? "Загрузка..." : "Выберите место работы..."}
                  </option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.workplace && (
                  <div className="invalid-feedback">{errors.workplace}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Адрес проживания
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  id="address"
                  value={formData.address}
                  onChange={(e) => {
                    updateFormData({ address: e.target.value });
                    if (errors.address) setErrors({ ...errors, address: "" });
                  }}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleBack}
                >
                  Назад
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Далее
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form2AddressWork;
