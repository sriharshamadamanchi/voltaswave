import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from "./common/theme";
import { moderateScale } from "react-native-size-matters";
import { Label } from "./common/components";
import { Dashboard } from "./Home/Dashboard";
import { RootStackParamList } from "./common/navigation/types";
import { Comments } from "./Home/Comments";
import { AddOrEditComment } from "./Home/AddOrEditComment";
import { AddOrEditPost } from "./Home/AddOrEditPost";

const Stack = createStackNavigator<RootStackParamList>();

export const Root = () => {

  return (
    <Stack.Navigator initialRouteName = {"Dashboard"}
      screenOptions = { {
        headerTitleAlign: 'center',
        headerBackTitle: "",
        headerStyle: {
          backgroundColor: theme.colors.background.default,
          height: moderateScale(50)
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
            title: "Posts"
          };
        }}
        name = "Dashboard" component = {Dashboard} />

      <Stack.Screen
        options = {(): any => {
          return {
            title: "Comments"
          };
        }}
        name = "Comments" component = {Comments} />

      <Stack.Screen
        options = {(): any => {
          return {
            title: "AddOrEditComment"
          };
        }}
        name = "AddOrEditComment" component = {AddOrEditComment} />

      <Stack.Screen
        options = {(): any => {
          return {
            title: "AddOrEditPost"
          };
        }}
        name = "AddOrEditPost" component = {AddOrEditPost} />
    </Stack.Navigator>
  )
}
