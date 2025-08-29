import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddItemScreen from "../screens/AddItemScreen";
import WishlistScreen from "../screens/WishlistScreen";
import WebViewScreen from "../screens/WebViewScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer
      theme={DefaultTheme}
      linking={{
        prefixes: ["centscape://"],
        config: {
          screens: {
            AddItem: "add",
            Wishlist: "wishlist",
          },
        },
      }}
    >
      <Stack.Navigator initialRouteName="Wishlist" id={undefined}>
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{ title: "View Item" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
