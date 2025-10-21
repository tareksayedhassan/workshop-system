import { create } from "zustand";
interface ILoading {
  loading: boolean;
  setLoading: (value: boolean) => void;
}
export const useLoginLoading = create<ILoading>((set) => ({
  loading: false,
  setLoading: (value: boolean) => {
    set(() => ({
      loading: value,
    }));
  },
}));
