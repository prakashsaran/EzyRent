import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { ThemeProvider, theme } from './theme';
import { Navigator } from './navigation/Navigator';
import NavigationService from './navigation/NavigationService';
import { onAppStart } from './helper/app';
import DropdownAlert from 'react-native-dropdownalert'

import { Spinner,DropDownHolder } from './components';
const padding = { padding: 10 }

onAppStart(store);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PersistGate loading={<Spinner />} persistor={persistor}>
            <Navigator
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
            <DropdownAlert
                updateStatusBar={false}
                defaultContainer={padding}
                ref={ref => DropDownHolder.setDropDown(ref)}
                closeInterval={6000} />
          </PersistGate>
        </ThemeProvider>
      </Provider>
    );
  }
}


export default App;
try{
    console.disableYellowBox = true
    console.clear()
// eslint-disable-next-line no-empty
}catch (e){

}
