import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import WishlistItem from "../components/WishlistItem";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistScreen() {
  const navigation = useNavigation<any>();
  const { wishlist, reload } = useWishlist();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      reload();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.normalizedUrl}
        renderItem={({ item }) => <WishlistItem item={item} />}
        ListEmptyComponent={<Text>No items yet.</Text>}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddItem")}
        accessibilityLabel="Add Item Button"
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  fabText: { color: "white", fontSize: 32, fontWeight: "bold" },
});
