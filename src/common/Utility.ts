import { Alert } from "react-native";

const showMessage = (title: string, message?: string, actions: Array<Object> = [
  {
    text: "Ok",
    onPress: () => console.log('OK Pressed')
  }
], cancelable: boolean = true) => {
  const newActions = actions.map((action: any) => {
    return {
      ...action,
      onPress: () => {
        action.onPress && action.onPress();
      }
    };
  });

  Alert.alert(
    title,
    message,
    newActions,
    { cancelable }
  );
}

const isEmpty = (str: any): boolean => {
  return (str === null || str === undefined || str === "");
};

const isNotEmpty = (str: any): boolean => {
  return !(str === null || str === undefined || str === "");
};

export default {
  showMessage,
  isEmpty,
  isNotEmpty
}
