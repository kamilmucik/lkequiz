import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import GlobalStyle from "../utils/GlobalStyle";
import { useSwipe } from '../hooks/UseSwipe'

const QuestionsScreen = ({ navigation, route }) => {
  const { categoryId } = route.params;
  const { categoryName } = route.params;
  const appCtx = useContext(AppContext);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setLoading] = useState(false);


  const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

  const PAGE_SIZE = 5;
  const IP = '162.19.227.81';
  const PORT = '3001';

  const fetchQuestions = async (page) => {
      try {
          const response = await fetch(`http://${IP}:${PORT}/question/${categoryId}/${page}/${PAGE_SIZE}/`);
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
    fetchQuestions(currentPage).then(json => {
        // console.log("data",json);
        setTotalPage(json.totalPage);
        setQuestions(json.data);
    });
  }, [currentPage]);

  useEffect(() => {
    loadProperties();
    setCurrentPage(1)
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   loadProperties();
  //   // Fetch initial page of data
  //   fetchQuestions(currentPage).then(json => {
  //       // console.log("data",json);
  //       setTotalPage(json.totalPage);
  //       setQuestions(json.data);
  //       setLoading(false);
  //   });
  // }, []);

  const renderListItems = ({ item }) => {
    return (
      <ScrollView style={{ flex: 1, paddingTop: 10 }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Text style={{ fontSize: 16, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4, marginBottom:4, marginTop:10  }} >
          {item.question}
        </Text>
          <FlatList
            data={item.answers}
            renderItem={renderAnswerListItems}
            keyExtractor={itemAnswer => itemAnswer.id.toString()}
            />
        
      </ScrollView>
    );
  };
  const renderAnswerListItems = ({ item }) => {
    return (
      <View>
        {item.correct == 1 ? (
          <Text style={{fontWeight: 'bold',fontSize: 12, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4 }}>{item.answer} </Text>
        ): (
          <Text style={{ fontSize: 10, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4 }} >
          {item.answer}
          </Text>
        )}
        

      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, paddingTop: 10 }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <Text style={{ fontSize: 8 }}>Kategoria: {categoryId} - {categoryName}</Text>
        <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {totalPage}  [{PAGE_SIZE}]</Text>
        {isLoading ? <ActivityIndicator /> :
        (
          <FlatList
            data={questions}
            renderItem={renderListItems}
            keyExtractor={item => item.id.toString()}
            />
        )}
        
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

export default QuestionsScreen;