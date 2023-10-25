import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Pressable } from "react-native";
import PackageJson from '../../package';
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import GlobalStyle from "../utils/GlobalStyle";

const HomeScreen = ({ navigation }) => {

  const appCtx = useContext(AppContext);

  async function loadProperties() {
    // try {
    //   appCtx.setIsDebugMode(0);
    // } catch(e) {
    //   console.error(e)
    // }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, styles.container]}>
      <Text style={styles.versionText}>v: {PackageJson.version} </Text>
      <ScrollView style={[GlobalStyle.AppScrollView]}>
        <View style={[GlobalStyle.AppContainer]}>
          <View >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('QuestionBase', {quizId: 1})}
              style={[GlobalStyle.AppButton]}>
              <Text style={[GlobalStyle.AppButtonText]}>Baza Pytań</Text>
            </TouchableOpacity>
          </View>
          <View >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Settings', {name: 'Jane'})}
              style={[GlobalStyle.AppButton]}>
              <Text style={[GlobalStyle.AppButtonText]}>Ustawienia</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:40,
  },
  versionText: {
    color: 'gray',
    fontSize: 10,
    textAlign: 'right',
    position: 'absolute',
    bottom: 10,
  },
});

export default HomeScreen;