import api from "./api";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export const getUsers = async () => {
  try {
    const { data } = await api.get<User[]>("/get-all-users-data");
    return data;
  } catch (error) {
    console.error("Nie udało się pobrać użytkowników:", error);
    return [];
  }
};