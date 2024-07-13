import React from "react";

// components
import { Button } from "primereact/button";

const UserSkills = ({ skills }) => {
  return (
    <div className="user-skills p-3 pt-0 bg-white border-round-xl">
      <div className="head flex-between-center">
        <span className="text-lg font-semibold text-gray-700">Skills</span>
        <Button
          icon="pi pi-ellipsis-v"
          text
          rounded
          severity="secondary"
          size="small"
        />
      </div>

      <div className="mt-3 flex flex-wrap align-items-center gap-3">
        {skills.map((skill) => (
          <div key={skill} className="py-2 px-3 bg-gray-200 border-round-xl">
            <span className="text-sm font-medium text-gray-700">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSkills;
