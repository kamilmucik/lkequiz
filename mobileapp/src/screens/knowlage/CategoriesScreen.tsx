import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CategoriesScreen = ({ navigation, route }) => {
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
          // console.log("response", response);
          const json = await response.json();
          // console.log("json", json);
          return json;
      } catch (error) {
          console.error(error);
          return [];
      }
  }


  async function loadProperties() {
  }


  useEffect(() => {
    // Fetch initial page of data
    fetchCategories(currentPage).then(json => {
        // console.log("data",json);
        setTotalPage(json.totalPage);
        
        categories.length === 0  ? setCategories(json.data) : setCategories(prevData => [...prevData, json.data]);
        if (currentPage === totalPage) {
          setListEnd(true)
        } 
        setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    loadProperties();
    setCurrentPage(1)
  }, []);

  const renderListItems = ({ item }) => {
    return (
      <Pressable
      style={[GlobalStyle.AppFlatListStyleItem]}
        onPress={() =>
          navigation.navigate('Questions', {
            categoryId: item.id,
            categoryName: item.name,
          })
        }
      >
        <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 16, paddingHorizontal: 12, verticalAlign:'middle', flex: 1 }]} >
          {item.name}
        </Text>
      </Pressable>
    );
  };
  const LoadMoreRandomData = () =>{
    if (currentPage < totalPage && totalPage > 1) { setCurrentPage(currentPage + 1) ;}
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
  const renderFooter = () => {
    return (
        <View>
          { loading && <ActivityIndicator />}
        </View>
      );
    }
  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingBottom: insets.bottom,
      alignItems: 'center'
    }]}>
        {/* <Text style={{ fontSize: 8 }}>kn.Dział: {departmentId} - {departmentName}</Text> */}
        <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {totalPage}  [{PAGE_SIZE}]</Text>
        {categories && categories.length > 0 ?
          <FlatList
              data={categories}
              style={styles.flatList}
              renderItem={renderListItems}
              keyExtractor={ (item, index) => `${item.id}-${index}`}
              contentContainerStyle={[styles.flatListItem,{}]}
              ItemSeparatorComponent={ItemSeparatorView}
              onEndReachedThreshold={0.2}
              onEndReached={LoadMoreRandomData}
              ListFooterComponent={renderFooter}
              />
              :
        <ActivityIndicator size='large' />
            }
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:40,
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

export default CategoriesScreen;