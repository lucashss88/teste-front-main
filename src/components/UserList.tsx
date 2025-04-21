import React, {useState} from "react";
import { useUserContext, UserType } from "../context/UserContext";
import UserForm from "./UserForm";
import {ToastContainer} from "react-toastify";

const UserList: React.FC = () => {
    const { users, deleteUser, updateUser } = useUserContext();
    const [showForm, setShowForm] = useState(false);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editingUserID, setEditingUserID] = useState<number | null>(null);

    const form = () => setShowForm(prev => !prev);

    const editUpdate = (user: UserType) => {
      setEditingUserID(user.id);
      setEditEmail(user.email);
      setEditName(user.name);
    };

    const cancelUpdate = () => {
      setEditingUserID(null);
      setEditName('');
      setEditEmail('');
    };

    const saveUpdate = async () => {
      if (editingUserID !== null) {
        await updateUser(editingUserID, {name: editName, email: editEmail});
        cancelUpdate();
      }
    };

    return (
      <div className="text-center align-items-center mt-4">
        <ToastContainer />
        <h2>
          Users List
        </h2>
        <table className="w-100 collapsed">
          <thead>
            <tr>
              <th className="border-black border-bottom text-center p-2">Name</th>
              <th className="border-black border-bottom text-center p-2">Email</th>
              <th className="border-black border-bottom text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: UserType) => (
              <tr key={user.id}>
                {editingUserID === user.id ? (
                  <>
                    <td className="p-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Name"
                        className="input-group-sm rounded-1 px-1"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="Email"
                        className="input-group-sm rounded-1 px-1"
                      />
                    </td>
                    <td>
                      <button
                        onClick={saveUpdate}
                        className="bg-light text-black p-1 px-2 border-black rounded-2 "
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelUpdate}
                        className="bg-light text-black p-1 px-2 m-lg-2 border-black rounded-2"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td>
                      <button
                        onClick={() => editUpdate(user)}
                        className="bg-light text-black p-1 px-2 border-black rounded-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-danger text-white m-lg-2 p-1 px-2 border-black rounded-2"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={form}
          className="mb-1 p-2 mt-4 bg-light text-black rounded-2"
        >
            {showForm ? 'Close form' : 'Add User'}
        </button>
          {showForm && <UserForm /> }
      </div>
    );
};

export default UserList;