import React, {useState} from "react";
import { useUserContext, UserType } from "../context/UserContext";
import UserForm from "./UserForm";
import {ToastContainer} from "react-toastify";
import UserModalSearch from "./UserModalSearch";

const UserList: React.FC = () => {
    const { users, deleteUser, updateUser, getUserByID } = useUserContext();
    const [showForm, setShowForm] = useState(false);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editingUserID, setEditingUserID] = useState<number | null>(null);
    const [searchID, setSearchID] = useState('');
    const [foundUser, setFoundUser] = useState<UserType | null>(null);
    const [showModal, setShowModal] = useState(false);

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

    const handleSearch = async () => {
        const user = await getUserByID(Number(searchID));
        if (user) {
            setFoundUser(user);
            setShowModal(true);
        }
    }

    return (
      <div className="text-center align-items-center mt-4">
        <ToastContainer />
        <h2>
          Users List
        </h2>
        <div className="mb-2">
          <input
          type="number"
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
          placeholder="User ID"
          className="mr-2 px-1 input-group-sm me-2"
          />
          <button
            onClick={handleSearch}
            className="bg-light btn"
          >
            Search User
          </button>
        </div>
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
                        className="btn bg-light text-black p-1 px-2 border-black rounded-2 "
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelUpdate}
                        className="btn bg-light text-black p-1 px-2 m-lg-2 border-black rounded-2"
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
                        className="btn bg-light text-black p-1 px-2 border-black rounded-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn bg-danger text-white m-lg-2 p-1 px-2 border-black rounded-2"
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
          className="btn mb-1 p-2 mt-4 bg-light text-black rounded-2"
        >
            {showForm ? 'Close form' : 'Add User'}
        </button>
          {showForm && <UserForm /> }
          {showModal && foundUser && (
            <UserModalSearch user={foundUser} onclose={() => setShowModal(false)} />
          )}
      </div>
    );
};

export default UserList;