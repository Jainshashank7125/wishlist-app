import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { RouteProp, useRoute } from "@react-navigation/native";

export default function WebViewScreen() {
  const route = useRoute<RouteProp<Record<string, { url: string }>, string>>();
  const url = route.params?.url;

  if (!url || typeof url !== "string" || !/^https?:\/\//.test(url)) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  
  return (
    //@ts-ignore
    <WebView
      source={{ uri: url }}
      style={{ flex: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
