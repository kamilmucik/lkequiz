import { View, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PAGE_SIZE } from '../../config.tsx';
import ListFooter from '../../components/ListFooter';
import ItemSeparator from '../../components/ItemSeparator';
import {useCustomFetch} from '../../hooks/useCustomFetch'
import QuestionListItem from '../../components/QuestionListItem';

const QuestionsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { categoryId } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const { loading, moreLoading, totalPage, data } = useCustomFetch(query, true);

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

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
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
              renderItem={ ({item}) => <QuestionListItem item={item} /> }
              style={styles.flatList}
              contentContainerStyle={[styles.flatListItem,{}]}
              keyExtractor={ (item, index) => `${item.id}-${index}`}
              ItemSeparatorComponent={<ItemSeparator />}
              onEndReachedThreshold={0.2}
              onEndReached={LoadMoreRandomData}
              ListFooterComponent={<ListFooter loading={moreLoading} />}
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