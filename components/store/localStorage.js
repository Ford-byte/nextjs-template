import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLocalStorage = create(
  persist(
    (set) => ({
      showLazy: false,
      setShowLazy: (newState) => set({ showLazy: newState }),

      isLoading: true,
      stopLoading: (newState) => set({ isLoading: newState }),

      isLogged: false,
      setLog : (newState) => set({isLogged: newState}),

      showLogin: false,
      setShowLogin: (newState) => set({ showLogin: newState }),
    }),
    {
      name: "local-storage-state",
    }
  )
);

export default useLocalStorage;
