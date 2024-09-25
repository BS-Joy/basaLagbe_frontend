import { useState } from "react";
import ProfileCardData from "./ProfileCardData";
import ProfileCardEditForm from "./ProfileCardEditForm";

const ProfileCard = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <aside className="w-full lg:w-1/4 dark:overflow-hidden dark:bg-[#33445B] ">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-lg w-full"
        data-v0-t="card"
      >
        {/* form of username & email */}
        {editMode ? (
          <ProfileCardEditForm user={user} setEditMode={setEditMode} />
        ) : (
          <ProfileCardData user={user} setEditMode={setEditMode} />
        )}
      </div>
    </aside>
  );
};

export default ProfileCard;
