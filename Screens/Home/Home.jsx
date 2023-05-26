import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PostsScreen from "../../Screens/PostsScreen/PostsScreen";
import ProfileScreen from "../../Screens/ProfileScreen/ProfileScreen";
import CreatePostsScreen from "../../Screens/CreatePostsScreen/CreatePostsScreen";

import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
const Home = () => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        showLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveBackgroundColor: "#f6f6f6",
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#212121CC",

        tabBarStyle: {
          height: 60,
          paddingVertical: 10,
          paddingHorizontal: 40,
        },

        tabBarItemStyle: {
          borderRadius: 20,
          height: 40,
        },
      }}
    >
      {
        // =========== 1
      }
      <Tab.Screen
        options={() => ({
          title: "Публікації",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            marginLeft: 130,
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginRight: 16 }}
              // onPress={signOut}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={22} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        })}
        name="Posts"
        component={PostsScreen}
      />
      {
        // =========== 2
      }
      <Tab.Screen
        options={({ navigation }) => ({
          title: "Створити публікацію",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            marginLeft: 50,
          },
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.navigate("Posts")}
            >
              <AntDesign name="arrowleft" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),

          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color} />
          ),
        })}
        name="CreatePosts"
        component={CreatePostsScreen}
      />
      {/* ====== 3 ========= */}
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Home;
