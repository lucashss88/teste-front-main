import React from "react";
import { UserType } from "../context/UserContext";

type UserModalProps = {
  user: UserType;
  onclose: () => void;
};

const UserModalSearch: React.FC<UserModalProps> = ({ user, onclose }) => {
    return (
      <div
        className="position-fixed fixed-top bg-opacity-75 w-25 d-block ms-4 mt-4 modal modal-body"
      >
        <div
          className="bg-light p-2 rounded-1"
        >
          <h3>Founded User</h3>
          <p><strong>ID: </strong>{user.id}</p>
          <p><strong>Name: </strong>{user.name}</p>
          <p><strong>Email: </strong>{user.email}</p>
          <button
            onClick={onclose}
            className="mt-1 bg-light text-black"
          >
            Close
          </button>
        </div>
      </div>
    );
};

export default UserModalSearch;

