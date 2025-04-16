import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryView } from "../common/components/PrimaryView/PrimaryView";
import { CurvedButton, Label, LoadingIndicator } from "../common/components";
import { moderateScale } from "react-native-size-matters";
import { theme } from "../common/theme";
import { useNavigation } from "@react-navigation/native";
import Utility from "../common/Utility";
import { loaderSelector } from "../common/loaderRedux/selectors";
import { addPostAction, updatePostAction } from "./redux/actions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(30),
    marginTop: moderateScale(20)
  },
  mainContainer: {
    marginVertical: moderateScale(10)
  },
  titleTextInputStyle: {
    backgroundColor: theme.colors.background.default,
    borderRadius: moderateScale(10),
    height: moderateScale(50),
    paddingHorizontal: moderateScale(10),
    fontSize: theme.fontSizes.l,
    fontFamily: theme.fonts.medium,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    textAlignVertical: "top"
  },
  bodyTextInputStyle: {
    backgroundColor: theme.colors.background.default,
    borderRadius: moderateScale(10),
    height: moderateScale(250),
    paddingHorizontal: moderateScale(10),
    fontSize: theme.fontSizes.l,
    fontFamily: theme.fonts.medium,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    textAlignVertical: "top"
  },
  curvedButtonStyle: {
    marginTop: moderateScale(20),
    width: moderateScale(250),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    backgroundColor: theme.colors.background.base
  }
})

export const AddOrEditPost = ({ route: { params } }: any) => {

  const dispatch = useDispatch()
  const navigation = useNavigation<any>()
  const [title, setTitle] = React.useState(params?.post?.title ?? "")
  const [body, setBody] = React.useState(params?.post?.body ?? "")
  const { loading: updateLoading }:{ loading: boolean } = useSelector(loaderSelector("UpdatePost"))
  const { loading: addLoading }:{ loading: boolean } = useSelector(loaderSelector("AddPost"))

  const isEdit = Utility.isNotEmpty(params?.post)

  React.useEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Post" : "Add Post"
    })
  }, [navigation, isEdit])

  return (
    <PrimaryView>
      <View style = {styles.container}>
        <LoadingIndicator loading = {addLoading || updateLoading} />
        <View style = {styles.mainContainer}>
          <Label primary title = "Title" />
          <TextInput
            onChangeText = {(text: string) => setTitle(text)}
            value = {title}
            placeholderTextColor = {theme.colors.textSelectionColor}
            selectionColor = {theme.colors.textSelectionColor}
            multiline = {false}
            placeholder = {"Enter Title..."}
            style = {styles.titleTextInputStyle}
          />
        </View>
        <View style = {styles.mainContainer}>
          <Label primary title = "Body" />
          <TextInput
            onChangeText = {(text: string) => setBody(text)}
            value = {body}
            placeholderTextColor = {theme.colors.textSelectionColor}
            selectionColor = {theme.colors.textSelectionColor}
            multiline
            placeholder = {"Enter Body..."}
            style = {styles.bodyTextInputStyle}
          />
        </View>

        <CurvedButton
          disableButton = {Utility.isEmpty(title) || Utility.isEmpty(body) || updateLoading || addLoading}
          buttonStyle = {styles.curvedButtonStyle}
          title = "Submit"
          onPress = {() => {
            if (isEdit) {
              dispatch(updatePostAction({ postId: params.post.id, title, body }))
            } else {
              dispatch(addPostAction({ title, body }))
            }
          }}
        />
      </View>
    </PrimaryView>
  )
}
