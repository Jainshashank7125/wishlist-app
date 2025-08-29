import AsyncStorage from "@react-native-async-storage/async-storage";
import { normalizeUrl } from "../utils/urlNormalizer";

export type WishlistItem = {
  title: string;
  image: string;
  price?: string;
  currency?: string;
  siteName?: string;
  sourceUrl?: string;
  originalUrl: string;
  normalizedUrl: string;
  createdAt: number;
};

const STORAGE_KEY = "wishlist_v2";

export async function getWishlist(): Promise<WishlistItem[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    // Migration: ensure normalizedUrl exists
    return arr.map((item: any) => ({
      ...item,
      normalizedUrl:
        item.normalizedUrl || normalizeUrl(item.originalUrl || item.url),
    }));
  } catch {
    return [];
  }
}

export async function addWishlistItem(item: WishlistItem) {
  const items = await getWishlist();
  const exists = items.some((i) => i.normalizedUrl === item.normalizedUrl);
  if (exists) throw new Error("Duplicate item");
  const newItem = { ...item, createdAt: Date.now() };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newItem, ...items]));
}
