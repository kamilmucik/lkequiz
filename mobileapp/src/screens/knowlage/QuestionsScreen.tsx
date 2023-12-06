import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QuestionsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { categoryId } = route.params;
  const { categoryName } = route.params;
  const appCtx = useContext(AppContext);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const PAGE_SIZE = 5;
  const HOST = 'http://info.e-strix.pl';

  const fetchQuestions = async (page) => {
    if (loading) return;
    setLoading(true);
      try {
          const response = await fetch(`${HOST}/api/question/${categoryId}/${page}/${PAGE_SIZE}/`);
          // console.log("response", response);
          const json = await response.json();
          // console.log("json", json);
          return json;
      } catch (error) {
          // console.error(error);
          return [];
      }
  }

  const LoadMoreRandomData = () =>{
    if (currentPage < totalPage) {setCurrentPage(currentPage + 1) ;}
  }
  
  async function loadProperties() {
    // try {
    //   appCtx.setIsDebugMode(0);
    // } catch(e) {
    //   console.error(e)
    // }
  }


  useEffect(() => {
    // Fetch initial page of data
    fetchQuestions(currentPage).then(json => {
        // console.log("data",json.totalPage);
        setTotalPage(json.totalPage);
        // setQuestions(json.data);
        questions.length === 0  ? setQuestions(json.data) : setQuestions(prevData => [...prevData, ...json.data]);

        
        setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    loadProperties();
    setCurrentPage(1)
  }, []);


  const renderListItems = ({ item }) => {
    return (
      <View style={[GlobalStyle.AppFlatListStyleItem]}>
        <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 16, paddingHorizontal: 12,  marginTop:10 }]} >
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

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 2,
          width: '100%',
          // backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  const renderFooter = () => {
    return (
        <View>
          { loading && <ActivityIndicator />}
          <ActivityIndicator />
        </View>
      );
    }

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingBottom: insets.bottom,
      alignItems: 'center'
    }]}>
        {/* <Text style={{ fontSize: 8 }}>Kategoria: {categoryId} - {categoryName}</Text> */}
        <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {totalPage}  [{PAGE_SIZE}]</Text>
        
        <FlatList
          data={questions}
          renderItem={renderListItems}
          style={styles.flatList}
          contentContainerStyle={[styles.flatListItem,{}]}
          keyExtractor={ (item, index) => `${item.id}-${index}`}
          contentContainerStyle={{flexGrow: 1}}
          ItemSeparatorComponent={ItemSeparatorView}
          onEndReachedThreshold={0.2}
          onEndReached={LoadMoreRandomData}
          ListFooterComponent={renderFooter}
          />
        
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  flatList: {
    width: '100%',
    padding: 5
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  flatListItem: {
    // width: '100%',
    // backgroundColor:'red'
    margin: 4,
    
  }
});

export default QuestionsScreen;