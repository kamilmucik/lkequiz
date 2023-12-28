import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import React, { useReducer, useEffect, useState, useRef } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_API_URL, PAGE_SIZE } from '../../config.tsx';
import ListFooter from '../../components/ListFooter';
import ItemSeparator from '../../components/ItemSeparator';
import {useCustomFetch} from '../../hooks/useCustomFetch'

const QuestionsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { categoryId } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  const { loading, moreLoading, totalPage, isListEnd, status, data, error } = useCustomFetch(query);
  const fetchData = async (page) => {
    setQuery(`question/${categoryId}/${page}/${PAGE_SIZE}/`);
  }

  const LoadMoreRandomData = () =>{
    if (currentPage < totalPage ) {
      setCurrentPage(currentPage + 1) ;
    }
  }
  
  useEffect(() => {
    fetchData(currentPage);
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

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingBottom: insets.bottom,
      alignItems: 'center'
    }]}>
        {/* <Text style={{ fontSize: 8 }}>Kategoria: {categoryId} - {categoryName}</Text> */}
        {/* <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {totalPage} ({moreLoading? 't':'f'}) [{PAGE_SIZE}]</Text> */}
        {loading ? 
            <View>
              <ActivityIndicator size='large' />
            </View>
          :
            <FlatList
              data={data}
              renderItem={renderListItems}
              style={styles.flatList}
              contentContainerStyle={[styles.flatListItem,{}]}
              keyExtractor={ (item, index) => `${item.id}-${index}`}
              contentContainerStyle={{flexGrow: 1}}
              ItemSeparatorComponent={ () => {
                return (<ItemSeparator />)
              }}
              onEndReachedThreshold={0.2}
              onEndReached={LoadMoreRandomData}
              ListFooterComponent={ () =>{
                return (<ListFooter loading={moreLoading} />)
              }}
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