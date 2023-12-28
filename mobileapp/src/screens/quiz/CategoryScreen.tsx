import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, {  useEffect, useState, useReducer, useMemo } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_API_URL, PAGE_SIZE } from '../../config.tsx';
import {useCustomFetch} from '../../hooks/useCustomFetch'
import ListEmpty from '../../components/ListEmpty';
import CategoryListItem from '../../components/CategoryListItem';
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

  const onPressItemHandler = (item) => {
    navigation.navigate('Quiz', {
      quizCategoryName: item.name,
      quizCategoryId: item.id,
      quizTimeLimit: item.time_limit,
      quizQuestionLimit: item.question_limit
    })
  };

  const reloadHandler = () => {
    fetchCategories(1);
  }

  const renderHeader = () => {
    return (
      <View>
        {/* <Text style={{ fontSize: 8 }}>Quiz Działa: {departmentId} {departmentName} </Text> */}
        {/* <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} [{PAGE_SIZE}]</Text> */}
      </View>
    );
  }

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
            renderItem={ ({item}) => <CategoryListItem item={item} details={true} onPress={ onPressItemHandler } /> }
            contentContainerStyle={[styles.flatListItem,{}]}
            keyExtractor={ (item, index) => `${item.id}-${index}`}
            ItemSeparatorComponent={ () => <ItemSeparator />}
            onEndReachedThreshold={0.2}
            onEndReached={LoadMoreRandomData}
            ListFooterComponent={ () =><ListFooter loading={moreLoading} />}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={ () =><ListEmpty onPress={ reloadHandler }  />}
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