import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { CurvedButton, Label } from '../components';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../theme';
import RNRestart from 'react-native-restart';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    paddingTop: moderateScale(30),
    alignItems: "center",
    justifyContent: 'space-evenly'
  },
  textStyle: {
    margin: moderateScale(20)
  },
  relaunch: {
    height: moderateScale(40),
    width: moderateScale(150),
    marginVertical: moderateScale(50)
  }
});

const Error = () => {

  return (
    <View style = {styles.container}>
      <Label primary style = {styles.textStyle} xxxxl bold title = {"Oops!"} />
      <Label semibold primary xxl center style = {styles.textStyle} title = {"Something went wrong"} />
      <CurvedButton buttonStyle = {styles.relaunch} title = {"Relaunch"} onPress = {() => {
        RNRestart.Restart();
      }} />
    </View>
  );
};

class ErrorBoundaryComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): any {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error Boundry Error", error);
  }

  render(): any {
    if (this.state.hasError) {
      return (
        <Error />
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = ErrorBoundaryComponent;
