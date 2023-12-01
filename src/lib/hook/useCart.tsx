import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../types";
import toast from "react-hot-toast";

interface cartProps {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}
const useCart = create(
  persist<cartProps>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItems = currentItems.find((item) => item.id === data.id);
        if (existingItems) {
          return toast.error("Item already in cart");
        }
        set({ items: [...get().items, data] });
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item remove from the cart");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-items", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useCart;
