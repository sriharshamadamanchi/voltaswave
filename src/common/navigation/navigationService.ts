import * as React from 'react';
import { CommonActions, StackActions } from '@react-navigation/native';

export const navigationRef: any = React.createRef();

export function navigate(name: string, params: any) {
  navigationRef.current?.popTo(name, params);
}

export function popToTop() {
  if (navigationRef.current && navigationRef.current.canGoBack()) {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }
}

export const resetToRoute = (routeName: string, params: any) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }]
    })
  );
};
