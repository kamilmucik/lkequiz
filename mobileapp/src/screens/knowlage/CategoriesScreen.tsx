import { View, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PAGE_SIZE } from '../../config.tsx';
import ListFooter from '../../components/ListFooter';
import ItemSeparator from '../../components/ItemSeparator';
import CategoryListItem from '../../components/CategoryListItem';
import {useCustomFetch} from '../../hooks/useCustomFetch'

const CategoriesScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { departmentId } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const { loading, moreLoading, totalPage, data } = useCustomFetch(query, true);

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

  const LoadMoreRandomData = () =>{
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }
  
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
              style={styles.flatList}
              renderItem={ ({item}) => <CategoryListItem item={item} onPress={ onPressItemHandler } /> }
              keyExtractor={ (item, index) => `${item.id}-${index}`}
              contentContainerStyle={[styles.flatListItem,{}]}
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
  },

  flatListItem: {
    margin: 4,
  }
});

export default CategoriesScreen;