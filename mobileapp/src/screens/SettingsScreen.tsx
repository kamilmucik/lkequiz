import React, { useState, useEffect, useContext } from "react";
import { StyleSheet,Text, View, TextInput,SafeAreaView, ScrollView,Switch, TouchableOpacity, Alert ,Button, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from "../store/AppContext";
import PackageJson from '../../package';
import CustomComponent from '../components/CustomComponent';
import GlobalStyle from "../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import { BASE_API_URL, API_KEY } from '../config.tsx';
import PushNotification, {Importance} from 'react-native-push-notification';


const SettingsScreen = ({navigation, route}) => {
  const {control, handleSubmit, formState: { errors } } = useForm();
  const appCtx = useContext(AppContext);
  const insets = useSafeAreaInsets();

  const [showCorrectAnswerOnly, setShowCorrectAnswerOnly] = useState(appCtx.settingsShowCorrectAnswerOnly);

  useEffect(() => {
  }, []);

  const handleNotification = () => {
    PushNotification.localNotification(
      {
        channelId: "test-channel",
        title: "You clicked it",
        message: "Zagramy w 3 szybkie?"
      }
    )
  }

  async function saveData(key, value) {
    await AsyncStorage.setItem(key,value);
  }

  const saveForm = (formValue) => {
    Alert.alert("saveForm.Form Value", JSON.stringify(formValue))
    appCtx.setSettingsOnlyCorrectValue(formValue.correct);
    appCtx.setSettingsShowPageSize(formValue.pageSize);
    try {
      saveData('@storage_lkequiz3',  JSON.stringify(formValue));
    } catch(e) {
      Alert.alert("saveForm.Form Value", e);
      // console.error(e)
    }
  };

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      alignItems: 'center',
      width: '100%',
    }]}>
        <View style={{flex: 1,width: '100%', padding: 5}}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '25%'}}>
                <Text style={{ fontSize: 14}}>Wersja</Text>
            </View>
            <View style={{ width: '75%'}}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' , textAlign: 'right'}}>{PackageJson.version}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '25%'}}>
                <Text style={{ fontSize: 14}}>API</Text>
            </View>
            <View style={{ width: '75%'}}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' , textAlign: 'right'}}>{BASE_API_URL}</Text>
            </View>
          </View>


          <Controller
            control={control}
            name="correct"
            defaultValue={showCorrectAnswerOnly}
            render={({field: {onChange,value} }) => (
              <View style={[GlobalStyle.AppFlatListStyleItem,{ flexDirection: 'row', marginTop: 10 }]}>
                <View style={{ width: '75%'}}>
                    <Text style={{ fontSize: 14,flex: 1, verticalAlign: 'middle', paddingLeft: 10}}>Pokaz tylko dobre odpowiedzi</Text>
                </View>
                <View style={{ width: '25%'}}>
                <Switch
                  style={{marginTop: 10}}
                  onValueChange={(item) => onChange(item)}
                  value={value}
                />
                </View>
              </View>
            )}
          />
          
          <Controller
            control={control}
            name="pageSize"
            defaultValue={appCtx.settingsShowPageSize}
            render={({field: {onChange,value} }) => (
              <View style={[GlobalStyle.AppFlatListStyleItem,{ flexDirection: 'row', marginVertical: 10}]}>
                <View style={{ width: '75%',}}>
                    <Text style={{ fontSize: 14, flex: 1, verticalAlign: 'middle', paddingLeft: 10}}>Limit rekordów na stronie</Text>
                </View>
                <View style={{ width: '25%',}}>
                <TextInput
                  placeholder='Limit rekordów na stronie'
                  keyboardType='numeric'
                  style={{ alignContent: 'center', textAlign:'center', backgroundColor: 'white'}}
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  maxLength={2}
                />
                </View>
              </View>
            )}
            rules={{
              required: {
                value: true,
                message: 'Pole jest wymagane'
              },
              validate: {
                minLength: (v) => v.length >= 1,
                matchPattern: (v) => /^[0-9]+$/.test(v),
              },
            }}
          />
          {errors['pageSize']?.message ?
          <Text style={styles.errorText}>{errors['pageSize']?.message}</Text>
          : null}

      <View style={styles.container}>
        <TouchableOpacity 
        style={[GlobalStyle.AppButton, GlobalStyle.AppPrimaryButton, {marginTop: 24}]}
        onPress={
          handleSubmit((formValue) => saveForm(formValue))
        }>
          <Text style={[GlobalStyle.AppPrimaryButtonText]}>Zapisz</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity 
        style={[GlobalStyle.AppButton, GlobalStyle.AppPrimaryButton, {marginTop: 24}]}
        onPress={
          () => handleNotification()
        }>
          <Text style={[GlobalStyle.AppPrimaryButtonText]}>Notyfikacje</Text>
        </TouchableOpacity>
      </View>

</View>
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