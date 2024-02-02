import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PAGE_SIZE } from '../../config.tsx';
import {useCustomFetch} from '../../hooks/useCustomFetch'
import QuestionListItem from '../../components/QuestionListItem';
import CustomList from '../../components/CustomList';

const QuestionsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { categoryId } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const {moreLoading, totalPage, data } = useCustomFetch(query);

  const fetchData = async (page) => {
    setQuery(`question/${categoryId}/${page}/${PAGE_SIZE}/`);
  }

  const loadMoreData = () =>{
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

  const renderItem = (item) => {
    return <QuestionListItem item={item} />
  }
  
  const reloadHandler = () => {
    setCurrentPage(1);
  }

  return (
    <CustomList 
      data={data} 
      moreLoading={moreLoading} 
      loadMoreData={ loadMoreData }
      reloadHandler={ reloadHandler }
      numColumns={1}
      viewStyle={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
        paddingBottom: insets.bottom,
        alignItems: 'center',
      }]}
      listStyle={styles.flatList}
      contentContainerStyle={[styles.flatListItem,{}]}
      displayItem={({item}) => renderItem(item)} 
    />
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

export default QuestionsScreen;