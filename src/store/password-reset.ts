import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  email: string;
};

const initialState: State = {
  email: "",
};

const usePasswordResetStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setEmail: (email: string) => set({ email }),
        clear: () => set({ email: "" }),
      },
    })),
    { name: "passwordResetStore" },
  ),
);

export const usePasswordResetEmail = () =>
  usePasswordResetStore((store) => store.email);

export const usePasswordResetActions = () =>
  usePasswordResetStore((store) => store.actions);
