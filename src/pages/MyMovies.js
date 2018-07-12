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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class MyMovies extends Component {
    static navigationOptions = {
        title: '我的',
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>我的电影</Text>
            </View>

        );
    }
}
