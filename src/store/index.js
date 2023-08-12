import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  token: "",
  department: "",
  admin: {},
};

export const useStore = create(
  persist(
    (set) => ({
      ...initialState,
      updateToken: (token) => set((state) => ({ ...state, token: token })),
      updateDepartment: (dep) =>
        set((state) => ({ ...state, department: dep })),
      updateAdmin: (data) => set((state) => ({ ...state, admin: data })),
      resetAuth: () => set(initialState),
    }),
    {
      name: "storage",
    }
  )
);
