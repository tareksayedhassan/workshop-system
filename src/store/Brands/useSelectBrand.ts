import { create } from "zustand";

type Item = {
  id: number;
  cate_name: string;
  Brand_logo: string;
  note: string;
  addedById: number;
};

interface IModels {
  SelectBrand: Item | null; // ممكن تكون null في البداية
  setSelectBrand: (value: Item) => void;
}

export const useSelectBrand = create<IModels>((set) => ({
  SelectBrand: null, // القيمة المبدئية
  setSelectBrand: (newStatus) => set({ SelectBrand: newStatus }),
}));
