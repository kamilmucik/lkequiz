import React, { useEffect, useContext } from "react";
import { StyleSheet,Text, View,SafeAreaView,Switch, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from "../store/AppContext";
import PackageJson from '../../package';
import GlobalStyle from "../utils/GlobalStyle";
import SelectDropdown from 'react-native-select-dropdown'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import { BASE_API_URL } from '../config.tsx';

import { MainDepartments } from '../store/MainDepartments';

const SettingsScreen = ({navigation, route}) => {
  const {control, handleSubmit } = useForm();
  const appCtx = useContext(AppContext);
  const insets = useSafeAreaInsets();

  useEffect(() => {
  }, []);

  async function saveData(key, value) {
    await AsyncStorage.setItem(key,value);
  }

  const saveForm = (formValue) => {
    console.log(formValue);
    appCtx.setSettingsOnlyCorrectValue(formValue.correct);
    appCtx.setSettingsFastQuizDepartment(formValue.fastQuizDepartment);
    try {
      saveData('@storage_lkequiz3',  JSON.stringify(formValue));
    } catch(e) {
      console.error(e)
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
            defaultValue={appCtx.settingsShowCorrectAnswerOnly}
            render={({field: {onChange,value} }) => (
              <View style={{ marginTop: 10}}>
                <View >
                    <Text>Baza wiedzy</Text>
                </View>
                <View style={[GlobalStyle.AppFlatListStyleItem,{ flexDirection: 'row', alignContent: 'center', alignItems: "center"}]}>
                  <View style={{ width: '75%'}}>
                    <Text style={{ fontSize: 14,flex: 1, verticalAlign: 'middle', paddingLeft: 10}}>Pokaz tylko dobre odpowiedzi</Text>
                 </View>
                 <View style={{ width: '25%'}}>
                  <Switch
                    style={{marginRight: 10}}
                    onValueChange={(item) => onChange(item)}
                    value={value}
                  />
                  </View>
                  
              </View>
            </View>
              
            )}
          />

          <Controller
            control={control}
            name="fastQuizDepartment"
            defaultValue={appCtx.settingsFastQuizDepartment}
            render={({field: {onChange,value} }) => (
              <View style={{ marginTop: 10}}>
                <View >
                    <Text>Główna dział pytań (3 szybkie)</Text>
                </View>
                <View style={[GlobalStyle.AppFlatListStyleItem,{ flexDirection: 'row', alignContent: 'center', alignItems: "center"}]}>
                  <View style={{ width: '100%', alignContent: 'center', alignItems: "center"}}>
                    <SelectDropdown
                      defaultValue={value}
                      buttonStyle={[GlobalStyle.AppSelectButton,{width:'100%'}]}
                      buttonTextStyle={[GlobalStyle.AppSelectButtonText]}
                      data={MainDepartments}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                        onChange(selectedItem);

                        appCtx.setSettingsFastQuizDepartment(selectedItem);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.code
                      }}
                      rowTextForSelection={(item, index) => {
                        return item
                      }}
                      renderCustomizedButtonChild={(selectedItem, index) => {
                        return (
                          <View >
                            <Text > {selectedItem ? selectedItem.text : 'Wybierz'}</Text>
                          </View>
                        );
                      }}
                      renderCustomizedRowChild={(item, index) => {
                        return (
                          <View >
                            <Text >{item.text}</Text>
                          </View>
                        );
                      }}
                    />
                  </View>
              </View>
            </View>
              
            )}
          />

      <View style={styles.container}>
        <TouchableOpacity 
        style={[GlobalStyle.AppButton, GlobalStyle.AppPrimaryButton, {marginTop: 24}]}
        onPress={
          handleSubmit((formValue) => saveForm(formValue))
        }>
          <Text style={[GlobalStyle.AppPrimaryButtonText]}>Zapisz</Text>
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