import { Routes, Route, Navigate } from "react-router-dom";
import Form1PersonalData from "./components/Form1_PersonalData";
import Form2AddressWork from "./components/Form2_AddressWork";
import Form3LoanParams from "./components/Form3_LoanParams";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/form1" element={<Form1PersonalData />} />
        <Route path="/form2" element={<Form2AddressWork />} />
        <Route path="/form3" element={<Form3LoanParams />} />
        <Route path="*" element={<Navigate to="/form1" replace />} />
      </Routes>
    </div>
  );
};

export default App;
