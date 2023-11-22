import React, { useState, useEffect, useContext } from "react";
import { StyleSheet,Text, View, TextInput,SafeAreaView, ScrollView,TouchableOpacity,Switch } from 'react-native';
import AppContext from "../../store/AppContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QuizScreen = ({navigation, route}) => {


  const appCtx = useContext(AppContext);
    const insets = useSafeAreaInsets();

  
  return (
    <SafeAreaView style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,

      flex: 1,
    }}>
      <ScrollView >
        <View style={{flex: 1}}>
          <Text>
            quiz
            
          </Text>

        </View>
       </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:40,
  }
});
export default QuizScreen;