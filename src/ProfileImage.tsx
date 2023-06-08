import React from "react";
import { Tooltip } from "@mui/material";

interface ProfileImageProps {
  profileImageUrl: string;
  githubUrl: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  profileImageUrl,
  githubUrl,
}) => {
  return (
    <div className="row  justify-content-center ">
      <Tooltip title="Mustafa Uhud Durmuş">
        <a className="row justify-content-center" href={githubUrl}>
          <img
            onClick={() => {}}
            src={profileImageUrl}
            alt=""
            className="Responsive image w-25 mt-5 rounded-circle"
          />
        </a>
      </Tooltip>
    </div>
  );
};

export default ProfileImage;
