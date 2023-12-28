import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState, useReducer, useMemo } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_API_URL, QUIZ_ID, PAGE_SIZE } from '../../config.tsx';
import KnowlageMenuListElement from '../../components/KnowlageMenuListElement';
import ListFooter from '../../components/ListFooter';
import ItemSeparator from '../../components/ItemSeparator';
import {useCustomFetch} from '../../hooks/useCustomFetch'

const QuestionsBaseScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const {loading, moreLoading, totalPage, data} = useCustomFetch(query);

  const fetchDepartments = async (page) => {
    setQuery(`department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`);
    }
  
  useEffect(() => {
    fetchDepartments(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, []);

  const renderListItems = ({ item }) => {
    return (
      <Pressable
       style={[GlobalStyle.AppFlatListStyleItem]}
        onPress={() =>
          navigation.navigate('Categories', {
            departmentId: item.id,
            departmentName: item.name,
          })
        }
      >
        <KnowlageMenuListElement item={item} /> 
      </Pressable>
    );
  };
  const LoadMoreRandomData = () =>{
    if (currentPage < totalPage ) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      alignItems: 'center'
    }]}>
        {loading ? 
        <View>
          <ActivityIndicator size='large' />
        </View>
        :
        <FlatList
            data={data}
            style={styles.flatList}
            renderItem={renderListItems}
            keyExtractor={ (item, index) => `${item.id}-${index}`}
            contentContainerStyle={[styles.flatListItem,{}]}
            ItemSeparatorComponent={ () => {
              return (<ItemSeparator />)
            }}
            onEndReached={LoadMoreRandomData}
            onEndReachedThreshold={0.2}
            ListFooterComponent={ () =>{
               return (<ListFooter loading={moreLoading} />)
            }}
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

export default QuestionsBaseScreen;