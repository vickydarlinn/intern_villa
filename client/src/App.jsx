import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import ProfileLayout from "./pages/profile/ProfileLayout";
import PersonalDetails from "./pages/profile/personalDetails/PersonalDetails";
import Education from "./pages/profile/education/Education";
import Projects from "./pages/profile/projects/Projects";
import Login from "./pages/login";
import Protected from "./layout/protected";
import NotFound from "./pages/notFound";
import AppliedJobs from "./pages/appliedJobs";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="/applied-jobs"
          element={
            <Protected>
              <AppliedJobs />
            </Protected>
          }
        />
        <Route
          index
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="profile"
          element={
            <Protected>
              <ProfileLayout />
            </Protected>
          }
        >
          <Route path="personal-details" element={<PersonalDetails />} />
          <Route path="education" element={<Education />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
