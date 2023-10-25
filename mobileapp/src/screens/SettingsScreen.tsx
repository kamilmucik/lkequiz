import React, { useState, useEffect, useContext } from "react";
import { StyleSheet,Text, View, TextInput,SafeAreaView, ScrollView,TouchableOpacity,Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from "../store/AppContext";
import GlobalStyle from "../utils/GlobalStyle";

const SettingsScreen = ({navigation, route}) => {


  const appCtx = useContext(AppContext);
//   const appCtxSettingsURLValue = appCtx.settingsURLValue;
//   const appCtxSettingsPortValue = appCtx.settingsPortValue;
//   const appCtxSettingsInstanceValue = appCtx.settingsInstanceValue;
//   const appCtxSettingsOperatorValue = appCtx.settingsOperatorValue;
//   const appCtxSettingsIsMobile = appCtx.isMobile;
//   const appCtxSettingsIsDebugMode = appCtx.isDebugMode;

//   const [loading, setLoading] = useState(false);
//   const [sourceUrl, setSourceUrl] = useState(appCtxSettingsURLValue);
//   const [sourcePort, setSourcePort] = useState(appCtxSettingsPortValue);
//   const [sourceCollectorNo, setSourceCollectorNo] = useState(appCtxSettingsInstanceValue);
//   const [sourceOperatorName, setSourceOperatorName] = useState(appCtxSettingsOperatorValue);
//   const [debugInfo, setDebugInfo] = useState('');
//   const [switchValue, setSwitchValue] = useState(appCtxSettingsIsMobile ==='true');
//   const [isDebugModeSwitchValue, setIsDebugModeSwitchValue] = useState(appCtxSettingsIsDebugMode ==='true');

  async function saveData(key, value) {
    const str = await AsyncStorage.setItem(key,value);

    return str;
  }
  const saveProperties = () => {
    // try {
    //   saveData('@storage_sourceUrl', sourceUrl);
    //   saveData('@storage_sourcePort', sourcePort);
    //   saveData('@storage_sourceCollectorNo', sourceCollectorNo);
    //   saveData('@storage_sourceOperatorName', sourceOperatorName);
    //   saveData('@storage_isMobile', switchValue?'true':'false');
    //   saveData('@storage_isDebugMode', isDebugModeSwitchValue?'true':'false');
    // } catch(e) {
    //   console.error(e)
    // }
  }

  const saveSettings = typ => {
    // setLoading(true);

    // appCtx.setSettingsURLValue(sourceUrl);
    // appCtx.setSettingsPortValue(sourcePort);
    // appCtx.setSettingsInstanceValue(sourceCollectorNo);
    // appCtx.setSettingsOperatorValue(sourceOperatorName);
    // appCtx.setIsMobile(switchValue?'true':'false');
    // appCtx.setIsDebugMode(isDebugModeSwitchValue?'true':'false');

    saveProperties();

    // appCtx.setToastInfoValue('Zapisałem zmiany', 'info');
    // setLoading(false);
  }

//   const toggleSwitch = (value) => {
//     setSwitchValue(value);
//   };
//   const isDebugModeSwitch = (value) => {
//     setIsDebugModeSwitchValue(value);
//   };

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer]}>
      <ScrollView style={[GlobalStyle.AppScrollView]}>
        <View style={{flex: 1}}>
          <Text>
            Coś tam działa
            {/* {debugInfo} */}
          </Text>
        </View>
       </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;