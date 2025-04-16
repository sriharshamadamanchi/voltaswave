/* eslint-disable react-native/no-unused-styles */
import * as React from 'react';
import { theme } from '../../theme';
import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE } from '../../constants';
import { Ripple } from '../Ripple/Ripple';
import { ActivityIndicator } from 'react-native-paper';

const normalStyles = StyleSheet.create({
  buttonStyle: {
    height: moderateScale(30),
    width: moderateScale(90),
    borderRadius: moderateScale(100),
    backgroundColor: theme.colors.background.base,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  textStyle: {
    color: theme.colors.font.default
  },
  iconStyle: {
    paddingRight: moderateScale(20)
  }
});

const inverseStyles = StyleSheet.create({
  buttonStyle: {
    height: moderateScale(40),
    width: moderateScale(100),
    borderRadius: moderateScale(100),
    borderWidth: 1,
    borderColor: theme.colors.border.base,
    backgroundColor: theme.colors.background.default,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  textStyle: {
    color: theme.colors.font.base
  },
  iconStyle: {
    paddingRight: moderateScale(20)
  }
});

interface curvedButtonType {
  title: string,
  inverse?: boolean,
  disableButton?: boolean,
  loading?: boolean,
  buttonStyle?: any,
  textStyle?: any,
  iconStyle?: any,
  events?: string,
  onPress?: () => any,
  onLongPress?: () => void,
  Icon?: any,
  light?: boolean,
  regular?: boolean,
  medium?: boolean,
  bold?: boolean,
  xs?: boolean,
  s?: boolean,
  m?: boolean,
  l?: boolean,
  xl?: boolean,
  xxl?: boolean,
  componentName?: string,
  resolver?: ({ userRole }: { userRole: string }) => string,
  testID?: string,
  accessibilityLabel?: string,
  allowFontScaling?: boolean
};
export const CurvedButton = ({
  title,
  inverse,
  disableButton,
  loading,
  buttonStyle,
  textStyle,
  iconStyle,
  events,
  onPress = () => {

  },
  onLongPress = () => {
  },
  Icon,
  light,
  regular,
  medium,
  bold,
  xs,
  s,
  m,
  l,
  xl,
  xxl,
  componentName,
  resolver,
  testID,
  accessibilityLabel,
  allowFontScaling = true
}: curvedButtonType) => {
  // Default style

  const styles = inverse ? inverseStyles : normalStyles;
  const newStyle = {
    fontSize: theme.fontSizes.l,
    fontFamily: theme.fonts.medium
  };

  // Set font Style
  light && (newStyle.fontFamily = theme.fonts.light);
  regular && (newStyle.fontFamily = theme.fonts.regular);
  medium && (newStyle.fontFamily = theme.fonts.medium);
  bold && (newStyle.fontFamily = theme.fonts.bold);

  // Easily Set Font Sizes
  xs && (newStyle.fontSize = theme.fontSizes.xs);
  s && (newStyle.fontSize = theme.fontSizes.s);
  m && (newStyle.fontSize = theme.fontSizes.m);
  l && (newStyle.fontSize = theme.fontSizes.l);
  xl && (newStyle.fontSize = theme.fontSizes.xl);
  xxl && (newStyle.fontSize = theme.fontSizes.xxl);

  const disableButtonStyle = disableButton === true ? { opacity: 0.35 } : {};

  return (
    <Ripple
      rippleContainerBorderRadius = { { ...styles.buttonStyle, ...buttonStyle }.borderRadius }
      disabled = {disableButton}
      style = { { ...styles.buttonStyle, ...buttonStyle, ...disableButtonStyle } }
      onPress = {() => {
        if (!disableButton) {
          onPress();
        }

      }}
      onLongPress = {() => {
        if (!disableButton) {
          onLongPress();
        }
      }}
      testID = {testID}
      accessibilityLabel = {accessibilityLabel}
    >
      {
        loading ?
          <ActivityIndicator size = {moderateScale(25)} color = {theme.colors.background.default} />
          :
          <View
            style = {styles.buttonContainerStyle}
          >
            {Icon &&
              <View style = { { ...styles.iconStyle, ...iconStyle } }>
                {Icon}
              </View>
            }
            <Text maxFontSizeMultiplier = {ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE} style = { { ...styles.textStyle, ...newStyle, ...textStyle } } allowFontScaling = {allowFontScaling}>{title}</Text>
          </View>
      }

    </Ripple>
  );
};
