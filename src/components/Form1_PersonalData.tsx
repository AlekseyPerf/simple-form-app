import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import { usePersonalData } from "../hooks/usePersonalData";

const Form1PersonalData = () => {
  const { formData, updateFormData, errors, setErrors } = useFormContext();
  const { phone, handlePhoneChange, validate } = usePersonalData();
  const navigate = useNavigate();

  const handleNext = () => {
    if (validate()) {
      navigate("/form2");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Личные данные</h3>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Телефон
                </label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  id="phone"
                  placeholder="0XXX XXX XXX"
                  value={phone}
                  onChange={handlePhoneChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
                <div className="form-text">
                  Формат: 0XXX XXX XXX (первая цифра 0 обязательна)
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  Имя
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => {
                    updateFormData({ firstName: e.target.value });
                    if (errors.firstName)
                      setErrors({ ...errors, firstName: "" });
                  }}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Фамилия
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => {
                    updateFormData({ lastName: e.target.value });
                    if (errors.lastName) setErrors({ ...errors, lastName: "" });
                  }}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Пол
                </label>
                <select
                  className={`form-select ${errors.gender ? "is-invalid" : ""}`}
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => {
                    updateFormData({ gender: e.target.value });
                    if (errors.gender) setErrors({ ...errors, gender: "" });
                  }}
                >
                  <option value="">Выберите...</option>
                  <option value="Мужской">Мужской</option>
                  <option value="Женский">Женский</option>
                </select>
                {errors.gender && (
                  <div className="invalid-feedback">{errors.gender}</div>
                )}
              </div>

              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={handleNext}
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form1PersonalData;
