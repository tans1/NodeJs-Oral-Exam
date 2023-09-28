import "./App.css";
import HomePage from "./pages/homePage";
import ReadingPage from "./pages/readingPage";
import ExamPage from "./pages/examPage";
import LoginPage from "./pages/auth/loginPage";
import SignUpPage from "./pages/auth/signupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoutes from "./utils/ProtectRoutes";
import ResultAnalysisPage from "./pages/resultAnalysisPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectRoutes />}>
            <Route path="/reading" element={<ReadingPage />} />
            <Route path="/exam" element={<ExamPage />} />
            <Route path="/analysis" element={<ResultAnalysisPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
