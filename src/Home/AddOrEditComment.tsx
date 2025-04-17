import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { PrimaryView } from "../common/components/PrimaryView/PrimaryView";
import { moderateScale } from "react-native-size-matters";
import { theme } from "../common/theme";
import { useNavigation } from "@react-navigation/native";
import Utility from "../common/Utility";
import { CurvedButton } from "../common/components";
import { strings } from "../common/i18n";

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

  const navigation = useNavigation<any>()
  const [message, setMessage] = React.useState(params?.comment?.body ?? "")

  const isEdit = Utility.isNotEmpty(params?.comment)

  React.useEffect(() => {
    navigation.setOptions({
      title: isEdit ? strings("editComment") : strings("addComment")
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
          placeholder = {strings("typeHere")}
          style = {styles.textInputStyle}
        />

        <CurvedButton
          disableButton = {Utility.isEmpty(message.trim()) || (isEdit && message.trim() === params?.comment?.body)}
          buttonStyle = {styles.curvedButtonStyle}
          title = {strings("submit")}
          onPress = {() => {}}
        />
      </View>
    </PrimaryView>
  )
}
