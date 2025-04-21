import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { toast } from "react-toastify";

const UserForm: React.FC = () => {
    const { createUser } = useUserContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!name || !email) {
        return alert('Missing fields');
      }

      await createUser({ name, email });
      setName('');
      setEmail('');
      toast.success('User created successfully');
    };

    return (
      <div>
        <form onSubmit={handleSubmit} className="mt-4 w-25 text-center d-inline-block">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-1 m-1 rounded-1 px-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-1 m-1 rounded-1 px-1"
          />
          <div>
            <button
              type="submit"
              className="p-1 px-2 bg-success text-white rounded-2 mt-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>

    );
};

export default UserForm;