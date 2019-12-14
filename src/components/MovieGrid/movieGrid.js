import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native';

const styles = require('./styles');

function renderMovie(movie, index, separators) {
    return (
        <TouchableHighlight
            style={styles.movie}
            onPress={() => {}}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}
        >
            <View>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                    style={styles.movieImage}
                />
                <Text style={styles.movieTitle}>{movie.title}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default function MovieGrid(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <FlatList
                data={props.data}
                renderItem={({ item, index, separators }) => renderMovie(item, index, separators)}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.movies}
                horizontal={false}
                numColumns={3}
            />
            <View style={styles.paging}>
                <TouchableOpacity
                    disabled={props.pageNumber <= 1}
                    style={styles.pageButton}
                    onPress={() => {
                        if (props.pageNumber > 1) {
                            props.onPrevious();
                        }
                    }}
                >
                    <Text style={[styles.pageButtonText, props.pageNumber <= 1 ? styles.dimText : null]}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.pageNumber}>{props.pageNumber}</Text>
                <TouchableOpacity
                    disabled={props.pageNumber >= props.totalPage}
                    style={styles.pageButton}
                    onPress={() => {
                        if (props.pageNumber < props.totalPage) {
                            props.onNext();
                        }
                    }}
                >
                    <Text style={[styles.pageButtonText, props.pageNumber >= props.totalPage ? styles.dimText : null]}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
