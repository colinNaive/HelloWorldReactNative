/**
 * Created by colinambitious on 12/17/16.
 */

import {AppRegistry} from 'react-native';
import Root from './Root';

if (!__DEV__) {
    global.console = {
        info: () => {
        },
        log: () => {
        },
        warn: () => {
        },
        error: () => {
        },
    };
}

AppRegistry.registerComponent('HelloWorldReactNative', () => Root);
