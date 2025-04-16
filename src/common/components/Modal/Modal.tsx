import React from "react";
import { Animated, Dimensions, StyleSheet, View, useAnimatedValue } from "react-native";
import { Modal as PaperModal, Portal } from "react-native-paper"
import { theme } from "../../theme";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalConatiner: {
    justifyContent: "center",
    alignItems: "center"
  },
  modalOverlay: {
    alignSelf: "center",
    width: "90%"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background.black,
    opacity: 0.1
  }
});

type ModalProps = {
  isVisible: boolean;
  onBackdropPress: () => void;
  style?: any;
  contentContainerStyle?: any;
  backdropColor?: string;
  transparent?: boolean;
  children: any
}

export const Modal = ({
  isVisible,
  onBackdropPress,
  style = {},
  contentContainerStyle = {},
  backdropColor = 'rgba(0,0,0,0.6)',
  transparent = false,
  children
}: ModalProps) => {

  const translateY = useAnimatedValue(height);

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 333,
        useNativeDriver: true
      }).start();
    } else {
      translateY.resetAnimation()
    }
  }, [isVisible])

  if (!isVisible){
    return null
  }

  return (
    <Portal>
      <View style = {styles.background} />
      <PaperModal
        visible = {isVisible}
        onDismiss = {onBackdropPress}
        contentContainerStyle = {[styles.modalOverlay, contentContainerStyle]}
        style = {[styles.modalConatiner, style]}
      >
        <Animated.View style = {[styles.modalContainer, { transform: [{ translateY }] }]} >
          {children}
        </Animated.View>
      </PaperModal>
    </Portal >
  );
}
