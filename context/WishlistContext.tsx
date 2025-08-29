import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface WishlistItem {
  title: string;
  image?: string;
  price?: string;
  siteName?: string;
  sourceUrl: string;
  createdAt: string;
  normalizedUrl: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (normalizedUrl: string) => void;
  isDuplicate: (normalizedUrl: string) => boolean;
  reload: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const STORAGE_KEY = "wishlist_v2";

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      setWishlist(JSON.parse(data));
    } else {
      setWishlist([]);
    }
  };

  const saveWishlist = async (items: WishlistItem[]): Promise<void> => {
    setWishlist(items);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const addItem = (item: WishlistItem): void => {
    if (wishlist.find((i) => i.normalizedUrl === item.normalizedUrl)) return;
    const newList = [
      { ...item, createdAt: new Date().toISOString() },
      ...wishlist,
    ];
    void saveWishlist(newList);
  };

  const removeItem = (normalizedUrl: string): void => {
    const newList = wishlist.filter((i) => i.normalizedUrl !== normalizedUrl);
    void saveWishlist(newList);
  };

  const isDuplicate = (normalizedUrl: string): boolean => {
    return wishlist.some((i) => i.normalizedUrl === normalizedUrl);
  };

  const reload = (): void => {
    void loadWishlist();
  };

  const contextValue = useMemo(
    () => ({ wishlist, addItem, removeItem, isDuplicate, reload }),
    [wishlist]
  );
  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
