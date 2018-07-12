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

export default class Cinemas extends Component {
    static navigationOptions = {
        title: '影院',
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>影院页</Text>
            </View>

        );
    }
}