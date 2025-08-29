import React from "react";
import AppNavigator from "./navigation/index";
import { WishlistProvider } from "./context/WishlistContext";

export default function App() {
  return (
    <WishlistProvider>
      <AppNavigator />
    </WishlistProvider>
  );
}
