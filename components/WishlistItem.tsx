import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { useWishlist } from "../context/WishlistContext";
import { useNavigation } from "@react-navigation/native";

type Props = { readonly item: any };
export default function WishlistItem({ item }: Props) {
  const { removeItem } = useWishlist();
  const navigation = useNavigation<any>();

  const handleOpenUrl = async () => {
    const url = item.sourceUrl || item.originalUrl;
    if (!url) return;
    // Try to open in-app WebView screen if available
    if (navigation && navigation.navigate) {
      try {
        navigation.navigate("WebViewScreen", { url });
        return;
      } catch {}
    }
    // Fallback: open in browser
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={styles.item}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        defaultSource={require("../assets/favicon.png")}
        accessibilityLabel="Wishlist Item Image"
      />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <TouchableOpacity
          onPress={handleOpenUrl}
          accessibilityLabel="Open Wishlist Item Link"
        >
          <Text style={[styles.title, styles.link]}>{item.title}</Text>
        </TouchableOpacity>
        <Text style={styles.price}>{item.price ? `${item.price}` : "N/A"}</Text>
        <Text style={styles.domain}>{item.siteName || item.sourceDomain}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => removeItem(item.normalizedUrl)}
        accessibilityLabel="Delete Wishlist Item Button"
        style={styles.deleteBtn}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  image: { width: 64, height: 64, backgroundColor: "#eee", borderRadius: 8 },
  title: { fontWeight: "bold", fontSize: 16 },
  link: { color: "#007AFF", textDecorationLine: "underline" },
  price: { color: "#007AFF", marginTop: 4 },
  domain: { color: "#888", marginTop: 2 },
  timestamp: { color: "#aaa", fontSize: 12, marginTop: 2 },
  deleteBtn: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#f8d7da",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    fontSize: 18,
    color: "#d00",
  },
});
