import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { navigationRef } from './src/common/navigation/navigationService';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/common/store';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ErrorBoundary } from './src/common/ErrorBoundary/ErrorBoundary';
import { NavigationContainer } from '@react-navigation/native';
import { Root } from './src';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from './src/common/theme';

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.background.base,
    accent: theme.colors.background.base
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default
  }
});

const App = () => {

  return (
    <Provider store = {store}>
      <PersistGate loading = {null} persistor = {persistor}>
        <RootSiblingParent>
          <PaperProvider theme = {paperTheme}>
            <ErrorBoundary>
              <GestureHandlerRootView style = {styles.container}>
                <View style = {styles.container}>
                  <NavigationContainer ref = {navigationRef}>
                    <Root />
                  </NavigationContainer>
                </View>
              </GestureHandlerRootView>
            </ErrorBoundary>
          </PaperProvider>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
};

export default App
