import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QUIZ_ID, PAGE_SIZE } from '../../config.tsx';
import KnowlageMenuListElement from '../../components/KnowlageMenuListElement';
import {useCustomFetch} from '../../hooks/useCustomFetch'
import CustomList from '../../components/CustomList';

//list of departments
const QuestionsBaseScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const {moreLoading, totalPage, data} = useCustomFetch(query);

  const fetchDepartments = async (page) => {
    setQuery(`department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`);
    }
  
  useEffect(() => {
    fetchDepartments(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, []);

  const onPressItemHandler = (id, name) => {
    navigation.navigate('Categories', {
      departmentId: id,
      departmentName: name,
    })
  };

  const reloadHandler = () => {
    setCurrentPage(1);
  }

  const loadMoreData = () =>{
    if (currentPage < totalPage ) {
      setCurrentPage(currentPage + 1);
    }
  }

  const renderItem = (item) => {
    return <KnowlageMenuListElement id={item.id} name={item.name} onPress={ onPressItemHandler } />
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
  container: {
    marginTop:40,
  },
  flatList: {
    width: '100%',
    marginTop: 30, 
  },

  flatListItem: {
    margin: 4,
  }
});

export default QuestionsBaseScreen;