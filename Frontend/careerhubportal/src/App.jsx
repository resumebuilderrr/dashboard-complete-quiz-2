import "./App.css";
import Jobs from "./components/Jobs";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Templates from "./components/Templates";
import ProtectedRoute from "./components/ProtectedRoute";
import ResumeBuilder from "./components/ResumeBuilder";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import AddProfileInfo from "./components/AddProfileInfo";
import ContactInfo from "./components/ContactInfo";
import ResumeForm from "./components/ResumeForm";
import AllResume from "./components/AllResume";
import AddJob from "./components/AddJob";
import UserJobs from "./components/UserJobs";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}></Route>

        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        <Route
          path="/resume/:id"
          element={<ProtectedRoute element={ResumeBuilder} />}
        />
        <Route
          path="/resumeForm"
          element={<ProtectedRoute element={ResumeForm} />}
        />
        <Route
          path="/resumes"
          element={<ProtectedRoute element={AllResume} />}
        />
        <Route
          path="/templates"
          element={<ProtectedRoute element={Templates} />}
        />
        <Route
          path="/profileInfo"
          element={<ProtectedRoute element={AddProfileInfo} />}
        />
        <Route
          path="/contactInfo"
          element={<ProtectedRoute element={ContactInfo} />}
        />
        <Route
          path="/createJob"
          element={<ProtectedRoute element={AddJob} />}
        />
        <Route
          path="/jobsIPosted"
          element={<ProtectedRoute element={UserJobs} />}
        />
        <Route path="/jobs" element={<ProtectedRoute element={Jobs} />} />
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
