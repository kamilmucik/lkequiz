import { Stack } from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function AuthLayout() {
  return <Stack screenOptions={{headerShown: false}}>
    <Stack.Screen name="login" />
    <Stack.Screen name="signup" />
  </Stack>;
}
