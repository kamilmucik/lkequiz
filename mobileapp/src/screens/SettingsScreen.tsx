import React, { useState, useEffect, useContext } from "react";
import { StyleSheet,Text, View, TextInput,SafeAreaView, ScrollView,Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from "../store/AppContext";
import PackageJson from '../../package';
import GlobalStyle from "../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SettingsScreen = ({navigation, route}) => {


  const appCtx = useContext(AppContext);
    const insets = useSafeAreaInsets();
//   const appCtxSettingsURLValue = appCtx.settingsURLValue;
//   const appCtxSettingsPortValue = appCtx.settingsPortValue;
//   const appCtxSettingsInstanceValue = appCtx.settingsInstanceValue;
//   const appCtxSettingsOperatorValue = appCtx.settingsOperatorValue;
//   const appCtxSettingsIsMobile = appCtx.isMobile;
//   const appCtxSettingsIsDebugMode = appCtx.isDebugMode;

//   const [loading, setLoading] = useState(false);
//   const [sourceUrl, setSourceUrl] = useState(appCtxSettingsURLValue);
//   const [sourcePort, setSourcePort] = useState(appCtxSettingsPortValue);
//   const [sourceOperatorName, setSourceOperatorName] = useState(appCtxSettingsOperatorValue);
//   const [debugInfo, setDebugInfo] = useState('');

  const [showPageAnswer, setShowPageAnswer] = useState(4);
  const [showCorrectAnswerOnly, setShowCorrectAnswerOnly] = useState(false);


  const showCorrectAnswerOnlySwitch = (value) => {
    setShowCorrectAnswerOnly(value);
  };
  const handleNumberChange = event => {
    const result = event.target.value.replace(/\D/g, '');
    setShowPageAnswer(result);
  };

  return (
    <SafeAreaView style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: 'white',
      flex: 1,
    }}>
      <ScrollView style={[GlobalStyle.AppScrollView]}>
        <View style={{flex: 1}}>

  
        <View style={[{flexDirection: 'row'}]}>
            <Text >Wersja: </Text>
            <Text>{PackageJson.version} </Text>
          </View>

          <View style={[{flexDirection: 'row'}]}>
            <Text style={{marginTop: 14}}>Pokaz tylko dobre odpowiedzi: </Text>
            <Switch
              style={{marginTop: 10}}
              onValueChange={showCorrectAnswerOnlySwitch}
              value={showCorrectAnswerOnly}
            />
          </View>
          <View style={[{flexDirection: 'row'}]}>
            <Text style={{marginTop: 14}}>Limit rekordów na stronie: </Text>
            <TextInput
                placeholder='Limit rekordów na stronie'
                keyboardType='numeric'
                value={showPageAnswer}
                onChangeText={(text) => setShowPageAnswer(text)}
                maxLength={2}
              />
          </View>
        </View>
       </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:40,
  },
  versionText: {
    color: 'gray',
    fontSize: 10,
    textAlign: 'right',
    position: 'absolute',
    bottom: 10,
  },
});
export default SettingsScreen;