import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CategoryScreen = ({ navigation, route }) => {

  const insets = useSafeAreaInsets();
  const { departmentId } = route.params;
  const { departmentName } = route.params;
  const appCtx = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  
  const [loading, setLoading] = useState(false);
  const [isListEnd, setListEnd] = useState(false);

  const PAGE_SIZE = 20;
  const HOST = 'http://info.e-strix.pl';

  const fetchCategories = async (page) => {
    if (loading) return;
    if (isListEnd) return;
    setLoading(true);
    try {
        const response = await fetch(`${HOST}/api/category/${departmentId}/${page}/${PAGE_SIZE}/`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return [];
    }
  }

  const reloadData = () => {
    fetchCategories(1).then(json => {
      setTotalPage(json.totalPage);
       categories.length === 0  ? setCategories(json.data) : setCategories([categories, ...json.data]);
       setLoading(false);
  });
  }

  const LoadMoreRandomData = () =>{
    if (currentPage < totalPage && !isListEnd && !loading) {
      setCurrentPage(currentPage + 1)
    }  else {
      setCurrentPage(totalPage);
    } 
  }

  useEffect(() => {
     
    // Fetch initial page of data
    fetchCategories(currentPage).then(json => {
        // console.log("data",json);
        setTotalPage(json.totalPage);
         categories.length === 0  ? setCategories(json.data) : setCategories([...categories, ...json.data]);

        if (currentPage === totalPage) {
          setListEnd(true)
        } 
         
         setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    // loadProperties();
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
        <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 16, paddingHorizontal: 12,  marginTop:4, verticalAlign:'middle', flex: 1 }]} >
          {item.name}
        </Text>
          <Text style={{ fontSize: 8, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4, marginBottom:4}} >
          {item.code} | {item.time_limit}(min) | {item.question_limit} z {item.max_question_limit}
          </Text>
      </Pressable>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <Text style={{ fontSize: 8 }}>Quiz Działa: {departmentId} {departmentName} </Text>
        <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {totalPage}  [{PAGE_SIZE}]</Text>
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
          { loading && <ActivityIndicator size='large' />}
          {/* { isListEnd && <Text style={{ fontSize: 8, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 10, marginBottom:10}}>Nie ma więcej danych do pobrania</Text>} */}
        </View>
      );
    }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 2,
          width: '100%',
          // backgroundColor: '#C8C8C8',
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
        
    <FlatList
        data={categories}
        style={styles.flatList}
        renderItem={renderListItems}
        contentContainerStyle={[styles.flatListItem,{}]}
        keyExtractor={ (item, index) => `${item.id}-${index}`}
        ItemSeparatorComponent={ItemSeparatorView}
        onEndReachedThreshold={0.2}
        onEndReached={LoadMoreRandomData}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:40,
  },
  flatList: {
    width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  flatListItem: {
    // width: '100%',
    // backgroundColor:'red'
    margin: 4,
    
  }
});

export default CategoryScreen;