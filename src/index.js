/**
 * Created by colinambitious on 12/17/16.
 */

import { AppRegistry } from 'react-native';
import App from './App';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  };
}

AppRegistry.registerComponent('HelloWorldReactNative', () => App);
