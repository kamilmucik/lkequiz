import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import React, { useReducer, useEffect, useState } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_API_URL, PAGE_SIZE } from '../../config.tsx';
import {INITIAL_STATE, postReducer} from '../../hooks/postReducer'
import {ACTION_TYPE} from '../../hooks/postActionTypes';

const QuestionsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { categoryId } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [state, dispach] = useReducer(postReducer, INITIAL_STATE);

  const fetchQuestions = async (page) => {
    if (state.loading || state.moreLoading || state.isListEnd) return;
    dispach({type: ACTION_TYPE.FETCH_START, currentPage: currentPage});
    fetch(`${BASE_API_URL}/question/${categoryId}/${page}/${PAGE_SIZE}/`)
      .then( (response) => {
        return response.json();
      })
      .then( (data) => {
        dispach({type: ACTION_TYPE.FETCH_SUCCESS, payload: data.data, totalPage: data.totalPage});
      })
      .catch( (error) => {
        dispach({type: ACTION_TYPE.FETCH_ERROR});
      });
  }

  const LoadMoreRandomData = () =>{
    if (currentPage < state.totalPage) {setCurrentPage(currentPage + 1) ;}
  }
  
  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, []);

  const renderListItems = ({ item }) => {
    return (
      <View style={[GlobalStyle.AppFlatListStyleItem]}>
      <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 8, paddingHorizontal: 12,  marginTop:10 }]} >
      {item.code}
      </Text>
        <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 18}]} >
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
          <Text style={{fontWeight: 'bold',fontSize: 16, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4 }}>{item.answer} </Text>
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
      <View
        style={{
          height: 4,
          width: '100%',
        }}
      />
    );
  };
  const renderFooter = () => {
    return (
        <View>
          { state.moreLoading && <ActivityIndicator />}
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
        {/* <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {state.totalPage} ({state.isListEnd? 't':'f'}) [{PAGE_SIZE}]</Text> */}
        {state.loading ? 
            <View>
              <ActivityIndicator size='large' />
            </View>
          :
            <FlatList
              data={state.data}
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
        }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  flatList: {
    width: '100%',
    padding: 5
  },

  flatListItem: {
    margin: 4,
    
  }
});

export default QuestionsScreen;