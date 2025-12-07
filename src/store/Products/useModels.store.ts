import { create } from "zustand";
interface IModels {
  model: string;
  setModel: (value: "") => void;
}
export const useProductModels = create<IModels>((set) => ({
  model: "",
  setModel: (newStatus) => set({ model: newStatus }),
}));
