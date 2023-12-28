import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';

const ListFooter = ({loading}) => {

    return (
        <View >
         {loading && <ActivityIndicator size='large'/>}
        </View>
    )
}


export default ListFooter