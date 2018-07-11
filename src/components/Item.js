/**
 * Created by colinambitious on 2017/9/7.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    AppRegistry,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const {width, height} = Dimensions.get('window');

const thirdWidth = width / 3;

const imageWidth = thirdWidth - 10 * 2;
const imageHeight = imageWidth / 0.697

export default class Item extends Component {
    render() {
        const {title, image, stars, onPress} = this.props;
        return (
            <TouchableOpacity style={styles.root} onPress={onPress}>
                <Image source={{uri:image}}
                       style={styles.image}/>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                {renderStars(stars)}
            </TouchableOpacity>
        );
    }
}

const renderStars = (stars) => {
    const total = 5;
    let full, half, empty;
    full = stars[0];
    if (stars[1] === '5') {
        full++;
        half = 0;
        empty = total - full;
    } else {
        half = 1;
        empty = total - full - half;
    }
    const results = [];
    let i;
    for (i = 0; i < full; i++) {
        results.push(
            <Image
                key={i}
                style={styles.stars}
                source={require("../img/star-full.png")}
            />);
    }
    if (half) {
        results.push(
            <Image
                key={i}
                style={styles.stars}
                source={require("../img/star-half.png")}
            />);
        i++;
    }
    for (let j = 0; j < empty; j++) {
        results.push(
            <Image
                key={i+j}
                style={styles.stars}
                source={require("../img/star-empty.png")}
            />);
    }
    return (
        <View style={styles.starsWrapper}>
            {results}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: imageWidth,
        marginRight: 15,
        marginTop: 10,
    },
    image: {
        height: imageHeight,
        width: imageWidth,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    starsWrapper: {
        flexDirection: 'row',
    },
    stars: {
        width: 10,
        height: 10
    }
});