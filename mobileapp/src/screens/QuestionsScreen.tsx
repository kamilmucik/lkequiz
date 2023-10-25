import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../store/AppContext";
import GlobalStyle from "../utils/GlobalStyle";

const QuestionsScreen = ({ navigation, route }) => {
  const { categoryId } = route.params;
  const { categoryName } = route.params;
  const appCtx = useContext(AppContext);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  const PAGE_SIZE = 5;
  const IP = '10.0.10.163';

  const fetchQuestions = async (page) => {
      try {
          const response = await fetch(`http://${IP}:3000/question/${categoryId}/${page}/${PAGE_SIZE}/`);
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


  useEffect(() => {
    setLoading(true);
    loadProperties();
    // Fetch initial page of data
    fetchQuestions(currentPage).then(json => {
        // console.log("data",json);
        setTotalPage(json.totalPage);
        setQuestions(json.data);
        setLoading(false);
    });
  }, []);

  const renderListItems = ({ item }) => {
    return (
      <View>
        <Text style={{ fontSize: 16, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4, marginBottom:4, marginTop:10  }} >
          {item.question}
        </Text>
          <FlatList
            data={item.answers}
            renderItem={renderAnswerListItems}
            keyExtractor={itemAnswer => itemAnswer.id.toString()}
            />
        
      </View>
    );
  };
  const renderAnswerListItems = ({ item }) => {
    return (
      <View>
        <Text style={{ fontSize: 10, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4 }} >
         {item.correct == 1 ? (<Text>* </Text>) : null} {item.answer}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
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
        
    </View>
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