import { create } from "zustand";
interface IStatus {
  Status: "available" | "unavailable";
  setStatus: (value: "available" | "unavailable") => void;
}
export const useProductStatus = create<IStatus>((set) => ({
  Status: "available",
  setStatus: (newStatus) => set({ Status: newStatus }),
}));
