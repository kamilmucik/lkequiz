import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, {  useEffect, useState, useReducer } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_API_URL, PAGE_SIZE } from '../../config.tsx';
import {INITIAL_STATE, postReducer} from '../../hooks/postReducer'
import {ACTION_TYPE} from '../../hooks/postActionTypes';

const CategoryScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { departmentId } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [state, dispach] = useReducer(postReducer, INITIAL_STATE);

  const fetchCategories = async (page) => {
    if (state.loading || state.moreLoading || state.isListEnd) return;
    dispach({type: ACTION_TYPE.FETCH_START, currentPage: page});
    fetch(`${BASE_API_URL}/category/${departmentId}/${page}/${PAGE_SIZE}/`)
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

  const reloadData = () => {
    fetchCategories(1);
  }

  const LoadMoreRandomData = () =>{
    if (currentPage < state.totalPage && !state.isListEnd && !state.loading) {
      setCurrentPage(currentPage + 1)
    } 
  }

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Fetch initial page of data
    setCurrentPage(1)
  }, []);

  const renderListItems = ({ item }) => {
    return (
      <Pressable
        style={[GlobalStyle.AppFlatListStyleItem]}
        onPress={() =>
          navigation.navigate('Quiz', {
            quizCategoryName: item.name,
            quizCategoryId: item.id,
            quizTimeLimit: item.time_limit,
            quizQuestionLimit: item.question_limit
          })
        }
      >
        <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 18, paddingHorizontal: 12,  marginTop:10, verticalAlign:'middle', flex: 1 }]} >
          {item.name}
        </Text>
          <Text style={{ fontSize: 12, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4, marginBottom:4}} >
            {item.code} | {item.time_limit}(min) | {item.question_limit} z {item.max_question_limit} pytań
          </Text>
      </Pressable>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        {/* <Text style={{ fontSize: 8 }}>Quiz Działa: {departmentId} {departmentName} </Text> */}
        {/* <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} [{PAGE_SIZE}]</Text> */}
      </View>
    );
  }
  const renderEmpty = () => {
    return (
      <View>
        <Pressable onPress={() =>reloadData() }>
          <Text style={{ fontSize: 16, paddingHorizontal: 12,  marginTop:10 }} >
            Odświez
          </Text>
        </Pressable>
        <Text>Brak danych </Text>
      </View>
    );
  }

  const renderFooter = () => {
    return (
        <View>
          { state.moreLoading && <ActivityIndicator size='large' />}
          { state.isListEnd && <Text style={{ fontSize: 8, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 10, marginBottom:10}}>Nie ma więcej danych do pobrania</Text>}
        </View>
      );
    }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 4,
          width: '100%',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      alignItems: 'center',
    }]}>
      {state.loading ? 
        <View>
          <ActivityIndicator size='large' />
        </View>
        :
        <FlatList
            data={state.data}
            style={styles.flatList}
            renderItem={renderListItems}
            contentContainerStyle={[styles.flatListItem,{}]}
            keyExtractor={ (item, index) => `${item.id}-${index}`}
            ItemSeparatorComponent={ItemSeparatorView}
            onEndReachedThreshold={0.2}
            onEndReached={LoadMoreRandomData}
            ListFooterComponent={renderFooter}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmpty}
          />
      }
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:40,
  },
  flatList: {
    width: '100%',
  },

  flatListItem: {
    margin: 4,
  }
});

export default CategoryScreen;