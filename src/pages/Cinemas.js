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

export default class Cinemas extends Component {
    static navigationOptions = {
        title: '影院',
        header: null
    };

    render() {
        return (
            <View>
                <Text>影院页</Text>
            </View>

        );
    }
}