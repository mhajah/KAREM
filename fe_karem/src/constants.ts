const { BACKEND_URL } = import.meta.env;
export { BACKEND_URL };

export const roleLevel = {
  admin: 100,
  teacher: 2,
  student: 1,
} as const;
