import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_API_URL, PAGE_SIZE } from '../../config.tsx';
import ListFooter from '../../components/ListFooter';
import ItemSeparator from '../../components/ItemSeparator';
import CategoryListItem from '../../components/CategoryListItem';
import {useCustomFetch} from '../../hooks/useCustomFetch'

const CategoriesScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { departmentId } = route.params;
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const { loading, moreLoading, totalPage, data } = useCustomFetch(query);

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

  // const renderListItems = ({ item }) => {
  //   return (
  //     <Pressable
  //     style={[GlobalStyle.AppFlatListStyleItem]}
  //       onPress={() =>
  //         navigation.navigate('Questions', {
  //           categoryId: item.id,
  //           categoryName: item.name,
  //         })
  //       }
  //     >
  //       <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 18, paddingHorizontal: 12,  marginTop:10, verticalAlign:'middle', flex: 1 }]} >
  //         {item.name}
  //       </Text>
  //       <Text style={{ fontSize: 12, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4, marginBottom:4}} >
  //           {item.code} | {item.max_question_limit} pytań
  //         </Text>
  //     </Pressable>
  //   );
  // };
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
        {/* <Text style={{ fontSize: 8 }}>kn.Dział: {departmentId} - {departmentName}</Text> */}
        {/* <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {state.totalPage}  [{PAGE_SIZE}]</Text> */}
        {loading ? 
        <View>
          <ActivityIndicator size='large' />
        </View>
        :
          <FlatList
              data={data}
              style={styles.flatList}
              // renderItem={renderListItems}
              renderItem={ ({item}) => <CategoryListItem item={item} onPress={ onPressItemHandler } /> }
              keyExtractor={ (item, index) => `${item.id}-${index}`}
              contentContainerStyle={[styles.flatListItem,{}]}
              ItemSeparatorComponent={ () => <ItemSeparator />}
              onEndReachedThreshold={0.2}
              onEndReached={LoadMoreRandomData}
              ListFooterComponent={ () => <ListFooter loading={moreLoading} />}
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