import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack() {
  navigator._navigation.goBack();
}

//  other navigation functions that we need and export them

export default {
  goBack,
  navigate,
  setTopLevelNavigator,
};
