/**
 * Created by colinambitious on 12/17/16.
 */
import React, {Component} from 'react';
import {
    TabNavigator,
    StackNavigator
} from 'react-navigation';

import List from './pages/List';
import Detail from './pages/Detail';
import Cinema from './pages/Cinemas';
import MyMovies from './pages/MyMovies';

const MyTab = TabNavigator({
    List: {screen: List},
    Cinema: {screen: Cinema},
    MyMovies: {screen: MyMovies},
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#0390eb',
        inactiveTintColor: '#fff',
        labelStyle: {
            fontSize: 20,
            marginBottom: 10
        },
        style: {
            backgroundColor: '#222',
        }
    }
});

const App = StackNavigator({
    Home: {screen: MyTab},
    Detail: {screen: Detail},
}, {
    headerMode: 'screen'
});

export default App;