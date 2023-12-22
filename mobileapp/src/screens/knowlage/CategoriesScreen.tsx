import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_API_URL, PAGE_SIZE } from '../../config.tsx';
import {INITIAL_STATE, postReducer} from '../../hooks/postReducer'
import {ACTION_TYPE} from '../../hooks/postActionTypes';

const CategoriesScreen = ({ navigation, route }) => {
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
        dispach({type: ACTION_TYPE.FETCH_SUCCESS, payload: data.data, totalPage: data.totalPage, currentPage: page});
      })
      .catch( (error) => {
        dispach({type: ACTION_TYPE.FETCH_ERROR});
      });
  }

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, []);

  const renderListItems = ({ item }) => {
    return (
      <Pressable
      style={[GlobalStyle.AppFlatListStyleItem]}
        onPress={() =>
          navigation.navigate('Questions', {
            categoryId: item.id,
            categoryName: item.name,
          })
        }
      >
        <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 18, paddingHorizontal: 12,  marginTop:10, verticalAlign:'middle', flex: 1 }]} >
          {item.name}
        </Text>
        <Text style={{ fontSize: 12, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4, marginBottom:4}} >
            {item.code} | {item.max_question_limit} pytań
          </Text>
      </Pressable>
    );
  };
  const LoadMoreRandomData = () =>{
    if (currentPage < state.totalPage && state.totalPage > 1) { setCurrentPage(currentPage + 1) ;}
  }
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
        </View>
      );
    }
  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingBottom: insets.bottom,
      alignItems: 'center'
    }]}>
        {/* <Text style={{ fontSize: 8 }}>kn.Dział: {departmentId} - {departmentName}</Text> */}
        {/* <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {state.totalPage}  [{PAGE_SIZE}]</Text> */}
        {state.loading ? 
        <View>
          <ActivityIndicator size='large' />
        </View>
        :
          <FlatList
              data={state.data}
              style={styles.flatList}
              renderItem={renderListItems}
              keyExtractor={ (item, index) => `${item.id}-${index}`}
              contentContainerStyle={[styles.flatListItem,{}]}
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
  },

  flatListItem: {
    margin: 4,
    
  }
});

export default CategoriesScreen;