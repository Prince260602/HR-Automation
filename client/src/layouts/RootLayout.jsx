import { Route, Routes } from "react-router-dom";
import OfferLetterPage from "../components/Main/OfferLetter";
import LOP from "../components/Main/LOP";
import RecommendationForm from "../components/Main/RecommendationForm";
import Sidebar from "../components/Main/Sidebar";
import Hero from "@/components/Main/Hero";
import Admin from "@/components/Admin/Admin";
import Info from "@/components/Main/Info";
import AcceptancePage from "@/components/Admin/AcceptancePage";
import StudentData from "@/components/Admin/StudentData";
import CoursesPage from "@/components/Admin/CoursesPage";
import CourseDescription from "@/components/Admin/CourseDescription";
import DocumentUpload from "@/components/Admin/DocumentUpload";
import Pap from "@/components/Main/Pap";
import Agreement from "@/components/Admin/Agreement";
import Call from "@/components/Admin/Call";
import Message from "@/components/Admin/Message";
import Details from "@/components/Admin/Details";
import { useState } from "react";
import EnrollForm from "@/components/Admin/EnrollForm";
import Login from "@/components/Admin/Login";
import Signup from "@/components/Admin/SignUp";
import NewCertificate from "@/components/Main/NewCertificate";

function RootLayout({
  isSidebarOpen,
  handleToggleSidebar,
  isRightSidebarOpen,
  handleToggleRightSidebar,
}) {
  const [logs, setLogs] = useState([]);

  const addLog = (log) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };
  return (
    <Routes>
      <Route
        element={
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            handleToggleSidebar={handleToggleSidebar}
            isRightSidebarOpen={isRightSidebarOpen}
            handleToggleRightSidebar={handleToggleRightSidebar}
          />
        }
      >
        <Route path="/" element={<Hero />} />
        <Route path="offer-letter" element={<OfferLetterPage />} />
        <Route path="/promotion-letter" element={<LOP />} />
        <Route path="/recommendation-form" element={<RecommendationForm />} />
        <Route path="/certificate" element={<NewCertificate />} />

        <Route path="/info" element={<Info />} />
        <Route path="/Pap" element={<Pap />} />
        <Route path="/Admin" element={<Admin />} />
       
        <Route path="/Admin/AcceptancePage" element={<AcceptancePage />} />
        <Route path="/Admin/StudentData" element={<StudentData />} />
        <Route path="/Courses" element={<CoursesPage />} />
        <Route path="/Admin/DocumentUpload" element={<DocumentUpload />} />
        <Route path="/course/:id" element={<CourseDescription />} />
        <Route path="/course/:id/enroll" element={<EnrollForm />} />
        <Route path="Admin/Agreement" element={<Agreement />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
     
        <Route path="/Admin/call" element={<Call addLog={addLog} />} />
        <Route path="/Admin/message" element={<Message addLog= {addLog} />} />
        <Route path="/Admin/details" element={<Details logs= {logs} />} />

       
      </Route>
    </Routes>
  );
}

export default RootLayout;
