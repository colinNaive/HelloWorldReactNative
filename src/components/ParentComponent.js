/**
 * Created by colinambitious on 2018/7/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import ChildComponent from './ChildComponent'

export default class ParentComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            childData: ""
        }
    }

    handleChild = (value) => {//定义回调，子组件向父组件传值
        this.setState({
            childData: value
        })
    }

    render() {
        const {childData} = this.state
        return (//调用子组件，并向子组件传值
            <View style={styles.container}>
                <Text>{childData}</Text>
                <ChildComponent
                    childData={childData}
                    handleChild={this.handleChild}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 10,
        backgroundColor: '#666',
        alignItems: 'center'
    }
});