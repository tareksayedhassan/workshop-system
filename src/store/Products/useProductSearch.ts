import { create } from "zustand";
interface IStatus {
  searchQuery: string;
  setSearhQuery: (value: string) => void;
}
export const useProductSearch = create<IStatus>((set) => ({
  searchQuery: "",
  setSearhQuery: (newStatus) => set({ searchQuery: newStatus }),
}));
