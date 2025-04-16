import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Portal } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { theme } from '../../theme';

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
      <Portal>
        <View style = {styles.container}>
          <View style = {styles.background} />
          <ActivityIndicator size = {size} animating = {loading} color = {color} hidesWhenStopped = {true} />
        </View>
      </Portal>
    );
  }

  return null;
};
