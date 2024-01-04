import React, { useContext, useEffect } from "react";
import { View, Image, StyleSheet,PermissionsAndroid } from 'react-native';
import AppContext from "../store/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification, {Importance} from 'react-native-push-notification';



const requestNotificationPermission = async () => {
    //https://stackoverflow.com/questions/75169559/reactnative-and-permissionsandroid-0-71-vs-0-70-post-notification-vs-post-notif
      // if (Platform.OS == 'android' && Platform.Version >= 33)
    
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: "App Notification Permission",
            message:"App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Notification permission given");
        } else {
          console.log("Notification permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

const SplashScreen = () => {
  const appCtx = useContext(AppContext);

    const createChannel = () => {
        requestNotificationPermission();
        PushNotification.createChannel(
          {
            channelId: "test-channel",
            channelName: "Test Channel",
            channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            playSound: false, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
          }
        )
      }

  async function loadProperties() {
    const value = await AsyncStorage.getItem('@storage_lkequiz3');
    let parsed = JSON.parse(value);
    if(value !== null) {
      appCtx.setSettingsOnlyCorrectValue(parsed.correct);
      appCtx.setSettingsFastQuizDepartment(parsed.fastQuizDepartment);
    }
  }

useEffect(() => {
    loadProperties();
    createChannel();
    }, []);

  return (
    <View style={styles.container}>
        <Image source={require('../assets/img/glider.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;