import * as React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image} from 'react-native';
import GlobalStyle from "../utils/GlobalStyle";
import airplane from '../assets/img/airplane.png';
import airplane2 from '../assets/img/airplane2.png';
import glider from '../assets/img/glider.png';

const tileImages = {
  1: airplane,
  5: glider,
  6: airplane2,
}

const KnowlageMenuListElement = ({item}) => {
    return (
      <View style={[GlobalStyle.AppFlatListStyleItem,{ flexDirection: 'row' }]}>
        <Image source={tileImages[item.id]} style={[{ width: 48, height: 48, marginLeft:8 , marginTop:8  }]} />
        <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 18, paddingHorizontal: 12, verticalAlign:'middle', flex: 1}]} >
          {item.name}
        </Text>
      </View>
    )
}


export default KnowlageMenuListElement