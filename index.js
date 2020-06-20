/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { useScreens } from 'react-native-screens';
import App from './src/App';
import {name as appName} from './app.json';
useScreens();
AppRegistry.registerComponent(appName, () => App);
