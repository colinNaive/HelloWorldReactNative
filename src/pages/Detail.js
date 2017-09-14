/**
 * Created by colinambitious on 2017/9/12.
 */
/**
 * Created by tdzl2003 on 12/17/16.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    AsyncStorage,
} from 'react-native';

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 222,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        marginTop: 100,
    },
    play: {
        width: 107,
        height: 107,
    }
});

const api = 'https://api.douban.com/v2/movie/subject';

export default class Detail extends Component {
    static navigationOptions = {
        title: '详情页',
        header: null
    };

    state = {
        data: {},
        ready: false,
    }

    componentDidMount() {
        const {state:{params:{id}}} = this.props.navigation;
        AsyncStorage.getItem(id).then((response) => {
            if (response) {
                const json = JSON.parse(response);
                json.image = json.images.large.replace('webp', 'jpg');
                this.setState({
                    data: JSON.parse(response),
                    ready: true
                });
                return;
            }
            fetch(api + '/' + id)
                .then((response) => response.text())
                .then((responseText) => {
                    const json = JSON.parse(responseText);
                    json.image = json.images.large.replace('webp', 'jpg');

                    const textData = JSON.stringify(json);
                    AsyncStorage.setItem(id, textData);

                    this.setState({
                        data: json,
                        ready: true
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        });

    }

    render() {
        const {data : {title, summary, image}, ready} = this.state;
        return (
            <View>
                {
                    ready ?
                        <View>
                            <Image source={{uri: image}} style={styles.image}>
                                <Image source={require('../img/play-icon.png')} style={styles.play}/>
                            </Image>
                            <Text>{title}</Text>
                            <Text>{summary}</Text>
                        </View>
                        :
                        <ActivityIndicator size="large" style={styles.loading}/>
                }
            </View>

        );
    }
}