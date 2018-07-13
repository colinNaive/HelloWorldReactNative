/**
 * Created by colinambitious on 2017/9/12.
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
    StackNavigator
} from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import * as listAction from '../actions/ListAction'

import Item from '../components/Item';

const styles = StyleSheet.create({
    row: {
        marginLeft: 15
    }
});

const api = 'https://api.douban.com/v2/movie/in_theaters';

class List extends Component {
    static navigationOptions = {
        title: '上映',
        header: null
    };

    componentDidMount() {
        this.props.events.initData()
    }

    render() {
        const {movies, refreshing} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <View>
                <FlatList
                    style={styles.row}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    onRefresh={this.props.events.fetchListData}
                    refreshing={refreshing}
                    data={movies}
                    renderItem={
                 ({item}) =>
                 <Item
                 title={item.title}
                 image={item.images.large}
                 stars={item.rating.stars}
                 onPress={() => navigate('Detail',{
                     id: item.id,
                     callback: (data) => {
                         this.setState({
                             childState: data
                         })
                     }
                 })}/>
                 }
                />
            </View>

        );
    }
}

const map2Props = dispatch => {
    return {
        events: bindActionCreators(listAction, dispatch)
    }
}

export default connect(
    (state) => ({
        refreshing: state.listFetchData.refreshing,
        movies: state.listFetchData.movies
    }), map2Props
)(List)