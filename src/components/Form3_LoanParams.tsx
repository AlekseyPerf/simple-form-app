import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import Modal from "./Modal";
import { useLoanParams } from "../hooks/useLoanParams";

const Form3LoanParams = () => {
  const { formData, updateFormData, errors, setErrors, clearFormData } =
    useFormContext();
  const {
    loanAmount,
    loanTerm,
    handleAmountChange,
    handleTermChange,
    dayWord,
    termInput,
    setTermInput,
    handleSubmit,
    submitting,
    showModal,
    setShowModal,
  } = useLoanParams();
  const navigate = useNavigate();

  const handleBack = () => navigate("/form2");
  const handleCloseModal = () => {
    navigate("/form1");
    setShowModal(false);
    clearFormData();
  };

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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Параметры займа</h3>

              <div className="mb-4">
                <label
                  htmlFor="loanAmount"
                  className="form-label d-flex align-items-center gap-2 mb-2"
                >
                  Сумма займа: $
                  <input
                    type="number"
                    className={`form-control ${errors.loanAmount ? "is-invalid" : ""}`}
                    style={{ width: "110px" }}
                    min="200"
                    max="1000"
                    step="100"
                    value={loanAmount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                  />
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="200"
                  max="1000"
                  step="100"
                  value={loanAmount}
                  onChange={(e) => {
                    updateFormData({ loanAmount: Number(e.target.value) });
                    if (errors.loanAmount)
                      setErrors({ ...errors, loanAmount: "" });
                  }}
                />
                <div className="d-flex justify-content-between">
                  <small>$200</small>
                  <small>$1000</small>
                </div>
                {errors.loanAmount && (
                  <div className="text-danger small">{errors.loanAmount}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="loanTerm"
                  className="form-label d-flex align-items-center gap-2 mb-2"
                >
                  Срок займа:
                  <input
                    type="number"
                    className={`form-control ${errors.loanTerm ? "is-invalid" : ""}`}
                    style={{ width: "80px" }}
                    min="10"
                    max="30"
                    step="1"
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    onBlur={(e) => handleTermChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        handleTermChange(e.currentTarget.value);
                    }}
                  />
                  {dayWord}
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="10"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => {
                    updateFormData({ loanTerm: Number(e.target.value) });
                    if (errors.loanTerm) setErrors({ ...errors, loanTerm: "" });
                  }}
                />
                <div className="d-flex justify-content-between">
                  <small>10 дней</small>
                  <small>30 дней</small>
                </div>
                {errors.loanTerm && (
                  <div className="text-danger small">{errors.loanTerm}</div>
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
                  className="btn btn-success"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Отправка...
                    </>
                  ) : (
                    "Подать заявку"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <Modal onClose={handleCloseModal} dayWord={dayWord} />}
    </div>
  );
};

export default Form3LoanParams;
