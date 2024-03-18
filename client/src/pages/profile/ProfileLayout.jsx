import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <main className="p-10 max-[550px]:px-3">
      <div className="flex gap-6 max-[550px]:gap-1 max-[550px]:text-sm max-[330px]:text-[10px] border-b border-b-gray-700 mb-4">
        <NavLink
          to="personal-details"
          className={({ isActive }) =>
            isActive
              ? "border-b border-b-buttonBg p-4 max-[400px]:p-2"
              : "p-4 max-[400px]:p-2"
          }
        >
          Personal Details
        </NavLink>
        <NavLink
          to="education"
          className={({ isActive }) =>
            isActive
              ? "border-b border-b-buttonBg p-4 max-[400px]:p-2"
              : "p-4 max-[400px]:p-2"
          }
        >
          Education
        </NavLink>
        <NavLink
          to="projects"
          className={({ isActive }) =>
            isActive
              ? "border-b border-b-buttonBg p-4 max-[400px]:p-2"
              : "p-4 max-[400px]:p-2"
          }
        >
          Project Details
        </NavLink>
      </div>

      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default ProfileLayout;
