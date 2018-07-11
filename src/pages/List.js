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

import Item from '../components/Item';
import movies from '../../movies.json';

const styles = StyleSheet.create({
    row: {
        marginLeft: 15
    }
});

const api = 'https://api.douban.com/v2/movie/in_theaters';

export default class List extends Component {
    static navigationOptions = {
        title: '上映',
        header: null
    };
    state = {
        movies: movies.subjects,
        refreshing: false,
        childState: '',
    };
    refreshing = false;

    fetchdata = () => {
        if (this.refreshing) {
            return;
        }
        this.setState({
            refreshing: true
        });
        this.refreshing = true;
        fetch(api)
            .then((response) => response.text())
            .then((responseText) => {
                const json = JSON.parse(responseText);
                this.setState({
                    movies: json.subjects,
                    refreshing: false,
                });
                this.refreshing = false;
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        // this.fetchdata();
    }

    render() {
        const {movies, refreshing, childState} = this.state;
        const {navigate} = this.props.navigation;
        return (
            <View>
                <FlatList
                    style={styles.row}
                    numColumns={3}
                    keyExtractor={item => item.id}
                    onRefresh={this.fetchdata}
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