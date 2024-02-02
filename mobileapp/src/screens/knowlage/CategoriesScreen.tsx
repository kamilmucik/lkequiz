import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PAGE_SIZE } from '../../config.tsx';
import CategoryListItem from '../../components/CategoryListItem';
import {useCustomFetch} from '../../hooks/useCustomFetch'
import CustomList from '../../components/CustomList';

const CategoriesScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { departmentId } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const {moreLoading, totalPage, data } = useCustomFetch(query);

  const fetchCategories = async (page) => {
    setQuery(`category/${departmentId}/${page}/${PAGE_SIZE}/`);
  }

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, []);

  const onPressItemHandler = (item) => {
    navigation.navigate('Questions', {
      categoryId: item.id,
      categoryName: item.name,
    })
  };
  const reloadHandler = () => {
    fetchCategories(1);
  }

  const loadMoreData = () =>{
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const renderItem = (item) => {
    return <CategoryListItem item={item} onPress={ onPressItemHandler } />
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

export default CategoriesScreen;