import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../../theme';
import { RootSiblingPortal } from 'react-native-root-siblings';

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
    elevation: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background.black,
    opacity: 0.3
  }
});

type LoadingIndicatorProps = {
  loading: boolean,
  color?: string,
  size?: 'small' | 'large' | number
}

export const LoadingIndicator = ({ loading, color = theme.colors.background.black, size = moderateScale(40) }: LoadingIndicatorProps) => {
  if (loading) {
    return (
      <RootSiblingPortal>
        <React.Fragment>
          <StatusBar barStyle = "light-content" backgroundColor = {"#0000004A"} />
          <View style = {styles.container}>
            <View style = {styles.background} />
            <ActivityIndicator size = {size} animating = {loading} color = {color} hidesWhenStopped = {true} />
          </View>
        </React.Fragment>
      </RootSiblingPortal>
    );
  }

  return null;
};
