import * as React from 'react';
import { Text } from 'react-native';
import { theme } from '../../theme';
import { ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE } from '../../constants';

interface labelPopsType {
  title: string,
  center?: boolean,
  right?: boolean,
  white?: boolean,
  secondary?: boolean,
  primary?: boolean,
  light?: boolean,
  regular?: boolean,
  medium?: boolean,
  semibold?: boolean,
  bold?: boolean,

  xs?: boolean,
  s?: boolean,
  m?: boolean,
  l?: boolean,
  xl?: boolean,
  xl20?: boolean,
  xl22?: boolean,
  xxl?: boolean,
  xxxl?: boolean,
  xxxl34?: boolean,
  xxxxl?: boolean,
  xl5?: boolean,
  style?: any,
  ellipsizeMode?: string,
  numberOfLines?: number,
  testID?: string,
  accessibilityLabel?: string,
  allowFontScaling?: boolean
};
export const Label = ({
  title,
  center,
  right,
  white,
  secondary,
  primary,
  light,
  regular,
  medium,
  semibold,
  bold,

  xs,
  s,
  m,
  l,
  xl,
  xl20,
  xl22,
  xxl,
  xxxl,
  xxxl34,
  xxxxl,
  xl5,
  style,
  ellipsizeMode,
  numberOfLines = 1,
  testID,
  accessibilityLabel,
  allowFontScaling = true
}: labelPopsType) => {

  // Default style
  const newStyle: any = {
    fontSize: theme.fontSizes.l,
    color: theme.colors.font.primary,
    fontFamily: theme.fonts.medium
  };

  // Assign Font Colors based on type.
  white && (newStyle.color = theme.colors.background.default);
  secondary && (newStyle.color = theme.colors.font.secondary);
  primary && (newStyle.color = theme.colors.font.base);

  // Align Self
  center && (newStyle.alignSelf = newStyle.textAlign = 'center');
  right && (newStyle.textAlign = 'right');

  // Set font Style
  light && (newStyle.fontFamily = theme.fonts.light);
  regular && (newStyle.fontFamily = theme.fonts.regular);
  medium && (newStyle.fontFamily = theme.fonts.medium);
  semibold && (newStyle.fontFamily = theme.fonts.semibold);
  bold && (newStyle.fontFamily = theme.fonts.bold);

  // Easily Set Font Sizes
  xs && (newStyle.fontSize = theme.fontSizes.xs);
  s && (newStyle.fontSize = theme.fontSizes.s);
  m && (newStyle.fontSize = theme.fontSizes.m);
  l && (newStyle.fontSize = theme.fontSizes.l);
  xl && (newStyle.fontSize = theme.fontSizes.xl);
  xl20 && (newStyle.fontSize = theme.fontSizes.xl20);
  xl22 && (newStyle.fontSize = theme.fontSizes.xl22);
  xxl && (newStyle.fontSize = theme.fontSizes.xxl);
  xxxl && (newStyle.fontSize = theme.fontSizes.xxxl);
  xxxl34 && (newStyle.fontSize = theme.fontSizes.xxxl34);
  xxxxl && (newStyle.fontSize = theme.fontSizes.xxxxl);
  xl5 && (newStyle.fontSize = theme.fontSizes.xl5);

  return (
    <Text testID = {testID} accessibilityLabel = {accessibilityLabel} maxFontSizeMultiplier = {ACCESSIBILITY_MAXIMUM_FONT_SIZE_SCALE} numberOfLines = {(ellipsizeMode === undefined) ? undefined : numberOfLines} style = { { ...newStyle, ...style } } allowFontScaling = {allowFontScaling}>
      {title}
    </Text>
  );
};
