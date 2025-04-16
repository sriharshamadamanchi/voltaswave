import { moderateScale } from 'react-native-size-matters';
import { colors } from './color';

const commonTheme = {
  fonts: {
    light: "Rubik-Light",
    regular: "Rubik-Regular",
    medium: "Rubik-Medium",
    semibold: "Rubik-SemiBold",
    bold: "Rubik-Bold"
  },
  fontSizes: {
    xs: moderateScale(11),
    s: moderateScale(12),
    m: moderateScale(14),
    l: moderateScale(16),
    xl: moderateScale(18),
    xl20: moderateScale(20),
    xl22: moderateScale(22),
    xxl: moderateScale(24),
    xxxl: moderateScale(30),
    xxxl34: moderateScale(34),
    xxxxl: moderateScale(40),
    xl5: moderateScale(50)
  }
};

export const theme = {
  ...commonTheme,
  colors: colors
};
