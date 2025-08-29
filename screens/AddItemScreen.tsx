import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { fetchPreview, PreviewData } from "../utils/fetchPreview";
import { addWishlistItem, WishlistItem } from "../storage/wishlist";
import { normalizeUrl } from "../utils/urlNormalizer";

export default function AddItemScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<any, any>>();
  const [url, setUrl] = useState(route.params?.url || "");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (url) handleFetchPreview();
  //   // eslint-disable-next-line
  // }, [url]);

  const handleFetchPreview = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPreview(url);
      setPreview(data);
    } catch (e: any) {
      setError(e.message || "Failed to fetch preview");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!preview) return;
    try {
      await addWishlistItem({
        ...preview,
        originalUrl: url,
        normalizedUrl: normalizeUrl(url),
      });
      navigation.goBack();
    } catch (e: any) {
      console.log();
      Alert.alert("Error", e.message || "Failed to add item");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Paste URL here"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="URL Input"
      />
      <Button
        title="Fetch Preview"
        onPress={handleFetchPreview}
        accessibilityLabel="Fetch Preview Button"
      />
      {loading && <ActivityIndicator style={{ margin: 20 }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {preview && (
        <View style={styles.preview}>
          <Image
            source={{ uri: preview.image }}
            style={styles.image}
            defaultSource={require("../assets/favicon.png")}
          />
          <Text>{preview.title}</Text>
          <Text>{preview.price ? `$${preview.price}` : "N/A"}</Text>
          <Text>{preview.siteName}</Text>
          <Button
            title="Add to Wishlist"
            onPress={handleAdd}
            accessibilityLabel="Add to Wishlist Button"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  error: { color: "red", marginVertical: 8 },
  preview: { marginTop: 20, alignItems: "center" },
  image: { width: 120, height: 120, marginBottom: 8, backgroundColor: "#eee" },
});
