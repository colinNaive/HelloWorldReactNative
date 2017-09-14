/**
 * Created by colinambitious on 2017/9/13.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    AppRegistry,
    Text,
    Image,
    Dimensions,
    FlatList,
    StackNavigator,
} from 'react-native';

export default class MyMovies extends Component {
    static navigationOptions = {
        title: '我的',
        header: null
    };

    render() {
        return (
            <View>
                <Text>我的电影</Text>
            </View>

        );
    }
}
