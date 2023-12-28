import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, {  useEffect, useState, useReducer, useMemo } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_API_URL, PAGE_SIZE } from '../../config.tsx';
import {useCustomFetch} from '../../hooks/useCustomFetch'
import ListFooter from '../../components/ListFooter';
import ItemSeparator from '../../components/ItemSeparator';

const CategoryScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const {departmentId} = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const { loading, moreLoading, totalPage, isListEnd, data } = useCustomFetch(query);

  const fetchCategories = async (page) => {
    setQuery(`category/${departmentId}/${page}/${PAGE_SIZE}/`);
  }

  const reloadData = () => {
    fetchCategories(1);
  }

  const LoadMoreRandomData = () =>{
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
    } 
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
          { moreLoading && <ActivityIndicator size='large' />}
          { isListEnd && <Text style={{ fontSize: 8, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 10, marginBottom:10}}>Nie ma więcej danych do pobrania</Text>}
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
      { loading ? 
        <View>
          <ActivityIndicator size='large' />
        </View>
        : 
        <FlatList
            data={data}
            style={styles.flatList}
            renderItem={renderListItems}
            contentContainerStyle={[styles.flatListItem,{}]}
            keyExtractor={ (item, index) => `${item.id}-${index}`}
            ItemSeparatorComponent={ () => {
              return (<ItemSeparator />)
            }}
            onEndReachedThreshold={0.2}
            onEndReached={LoadMoreRandomData}
            ListFooterComponent={ () =>{
              return (<ListFooter loading={moreLoading} />)
            }}
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