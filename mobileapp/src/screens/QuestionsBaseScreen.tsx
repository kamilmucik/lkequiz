import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import GlobalStyle from "../utils/GlobalStyle";
import { useSwipe } from '../hooks/UseSwipe'

const QuestionsBaseScreen = ({ navigation, route }) => {
  const { quizId } = route.params;
  const appCtx = useContext(AppContext);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);


  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)
  
  const PAGE_SIZE = 5;
  const IP = '10.0.10.163';
  // const IP = '172.17.64.27';

  const fetchDepartments = async (page) => {
    try {
        const response = await fetch(`http://${IP}:3000/department/${quizId}/${page}/${PAGE_SIZE}/`);
        // console.log("response", response);
        const json = await response.json();
        // console.log("json", json);
        return json;
    } catch (error) {
        console.error(error);
        return [];
    }
}
  
  async function loadProperties() {
    // try {
    //   appCtx.setIsDebugMode(0);
    // } catch(e) {
    //   console.error(e)
    // }
  }

  function onSwipeLeft(){
    console.log('SWIPE_LEFT');

    currentPage > 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  }

  function onSwipeRight(){
      console.log('SWIPE_RIGHT')
      currentPage < totalPage ? setCurrentPage(currentPage + 1) : setCurrentPage(totalPage);
  }

  useEffect(() => {
    // Fetch initial page of data
    fetchDepartments(currentPage).then(json => {
        // console.log("data",json);
        setTotalPage(json.totalPage);
        setDepartments(json.data);
    });
  }, [currentPage]);

  useEffect(() => {
    loadProperties();
    setCurrentPage(1)
  }, []);
  // useEffect(() => {
  //   loadProperties();
  //   // Fetch initial page of data
  //   fetchDepartments(currentPage).then(json => {
  //       console.log("data",json);
  //       setDepartments(json.data);
  //   });
  // }, []);

  const renderListItems = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Categories', {
            departmentId: item.id,
            departmentName: item.name,
          })
        }
      >
        <Text style={{ fontSize: 16, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 10, marginBottom:10, marginTop:10 }} >
          {item.name}
        </Text>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#ccc',
          }}
        />
      </Pressable>
    );
  };

  return (
    
    <ScrollView style={{ flex: 1, paddingTop: 10 }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Text style={{ fontSize: 8 }}>QuizId: {quizId} </Text>
        <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {totalPage}  [{PAGE_SIZE}]</Text>
        <FlatList
            data={departments}
            renderItem={renderListItems}
            keyExtractor={item => item.id.toString()}
            />
    </ScrollView>
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

export default QuestionsBaseScreen;