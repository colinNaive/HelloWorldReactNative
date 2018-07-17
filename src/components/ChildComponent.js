/**
 * Created by colinambitious on 2018/7/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class ChildComponent extends Component {

    getRandom = (start, end) => {
        var length = end - start
        var num = parseInt(Math.random() * length + start)
        return num
    };

    render() {
        const {childData, handleChild} = this.props
        const value = this.getRandom(5, 97)
        return (
            <TouchableOpacity style={styles.div} onPress={handleChild.bind(this,value)}>
                <Text>{childData}</Text>
                <Text>点我</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    div: {
        width: 50,
        height: 50,
        backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center'
    }
});