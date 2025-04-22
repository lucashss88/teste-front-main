import React, {createContext, useContext, useEffect, useState} from 'react';
import {USERS_BY_ID_URL, USERS_DELETE_URL, USERS_GET_URL, USERS_POST_URL, USERS_UPDATE_URL} from '../config/config';
import {toast} from "react-toastify";

export type UserType = {
  id: number;
  name: string;
  email: string;
};

const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchUsers = async () => {
    const res = await fetch(USERS_GET_URL);
    const data = await res.json();
    setUsers(data);
  };

  const createUser = async (user: Omit<UserType, 'id'>) => {
    const res = await fetch(USERS_POST_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    });
    const newUser = await res.json();
    setUsers((prev) => [...prev, newUser]);

  };

  const getUserByID = async (id: number): Promise<UserType | null> => {
    try {
      const url = USERS_BY_ID_URL.replace(':id', id.toString());
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('User not found');
      }
      return await res.json();
    } catch (error) {
      toast.error('Error found user');
      return null;
    }
  }

  const updateUser = async (id: number, user: Omit<UserType, 'id'>) => {
    const url = USERS_UPDATE_URL.replace(':id', id.toString());

    const res = await fetch(url, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    });
    const updatedUser = await res.json();
    setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
    toast.success('User updated successfully');
  };

  const deleteUser = async (id: number) => {
    const url = USERS_DELETE_URL.replace(':id', id.toString());

    await fetch(url, {method: 'DELETE'});
    setUsers((prev) => prev.filter((u) => u.id !== id));
    toast.success('User deleted successfully');
  };

  useEffect(() => {
    fetchUsers();

  }, []);

  return (
    <UserContext.Provider
      value={{users, fetchUsers, createUser, updateUser, deleteUser, getUserByID }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);