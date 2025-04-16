import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loaderSelector } from "../common/loaderRedux/selectors";
import { PrimaryView } from "../common/components/PrimaryView/PrimaryView";
import { moderateScale } from "react-native-size-matters";
import { theme } from "../common/theme";
import { useNavigation } from "@react-navigation/native";
import Utility from "../common/Utility";
import { CurvedButton } from "../common/components";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textInputStyle: {
    backgroundColor: theme.colors.background.default,
    borderRadius: moderateScale(10),
    height: moderateScale(250),
    paddingHorizontal: moderateScale(10),
    fontSize: theme.fontSizes.l,
    fontFamily: theme.fonts.medium,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    margin: moderateScale(30),
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

export const AddOrEditComment = ({ route: { params } }: any) => {

  const dispatch = useDispatch()
  const navigation = useNavigation<any>()
  const { loading }:{ loading: boolean } = useSelector(loaderSelector("FetchPosts"))
  const [message, setMessage] = React.useState(params?.comment?.body ?? "")

  const isEdit = Utility.isNotEmpty(params?.comment)

  React.useEffect(() => {
    navigation.setOptions({
      title: isEdit ? "Edit Comment" : "Add Comment"
    })
  }, [navigation, isEdit])

  return (
    <PrimaryView>
      <View style = {styles.container}>
        <TextInput
          onChangeText = {(text: string) => setMessage(text)}
          value = {message}
          placeholderTextColor = {theme.colors.textSelectionColor}
          selectionColor = {theme.colors.textSelectionColor}
          multiline
          placeholder = {"Type Here..."}
          style = {styles.textInputStyle}
        />

        <CurvedButton
          disableButton = {Utility.isEmpty(message.trim()) || (isEdit && message.trim() === params?.comment?.body)}
          buttonStyle = {styles.curvedButtonStyle}
          title = "Submit"
          onPress = {() => {
          }}
        />
      </View>
    </PrimaryView>
  )
}
