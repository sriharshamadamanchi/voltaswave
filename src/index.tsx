import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from "./common/theme";
import { moderateScale } from "react-native-size-matters";
import { Label } from "./common/components";
import { Dashboard } from "./Home/Dashboard";
import { Comments } from "./Home/Comments";
import { AddOrEditComment } from "./Home/AddOrEditComment";
import { AddOrEditPost } from "./Home/AddOrEditPost";
import { Platform } from "react-native";
import { strings } from "./common/i18n";

const Stack = createStackNavigator();

export const Root = () => {

  return (
    <Stack.Navigator initialRouteName = {strings("Routes.dashboard")}
      screenOptions = { {
        headerTitleAlign: 'center',
        headerBackTitle: "",
        headerTintColor: theme.colors.background.base,
        headerStyle: {
          backgroundColor: theme.colors.background.default,
          height: Platform.OS === "android"? moderateScale(50): moderateScale(100)
        },
        headerTitleStyle: {
          fontSize: theme.fontSizes.xl20,
          color: theme.colors.font.primary,
          fontFamily: theme.fonts.medium,
          marginHorizontal: moderateScale(20)
        },
        headerTitle: ({ children }: { children: string }) => {
          return (
            <Label primary medium xl20 title = {children} ellipsizeMode = {"tail"} numberOfLines = {1} style = { { marginHorizontal: moderateScale(25) } } />
          );
        }
      } }
    >
      <Stack.Screen
        options = {(): any => {
          return {
            title: strings("Routes.posts")
          };
        }}
        name = {strings("Routes.dashboard")} component = {Dashboard} />

      <Stack.Screen
        options = {(): any => {
          return {
            title: strings("Routes.comments")
          };
        }}
        name = {strings("Routes.comments")} component = {Comments} />

      <Stack.Screen
        options = {(): any => {
          return {
            title: strings("Routes.addOrEditComment")
          };
        }}
        name = {strings("Routes.addOrEditComment")} component = {AddOrEditComment} />

      <Stack.Screen
        options = {(): any => {
          return {
            title: strings("Routes.addOrEditPost")
          };
        }}
        name = {strings("Routes.addOrEditPost")} component = {AddOrEditPost} />
    </Stack.Navigator>
  )
}
