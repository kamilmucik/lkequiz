import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import { useSwipe } from '../../hooks/UseSwipe';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CategoryScreen = ({ navigation, route }) => {

  const insets = useSafeAreaInsets();
  // const { departmentId } = route.params;
  // const { departmentName } = route.params;
  const appCtx = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 8;
  const departmentId = 1;
  const HOST = 'http://info.e-strix.pl';

  const fetchCategories = async (page) => {
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

  const LoadMoreRandomData = () =>{
    currentPage < totalPage ? setCurrentPage(currentPage + 1) : setCurrentPage(totalPage);
  }
  const LoadLessRandomData = () =>{
    currentPage > 1 ? setCurrentPage(currentPage - 1) : setCurrentPage(1);
  }

  async function loadProperties() {
    // try {
    //   appCtx.setIsDebugMode(0);
    // } catch(e) {
    //   console.error(e)
    // }
  }

  useEffect(() => {
    setLoading(true);
    // Fetch initial page of data
    fetchCategories(currentPage).then(json => {
        // console.log("data",json);
        setTotalPage(json.totalPage);
         categories.length === 0  ? setCategories(json.data) : setCategories([...categories, ...json.data]);
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
        onPress={() =>
          navigation.navigate('Quiz', {
            categoryId: item.id,
            categoryName: item.name,
          })
        }
      >
        <Text style={{ fontSize: 16, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 10, marginBottom:10, marginTop:10 }} >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  const renderFooter = () => {
    return (
        <View>
          { loading && <ActivityIndicator />}
        </View>
      );
    }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };



  return (
    <SafeAreaView style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
  
        flex: 1,
      }}>
        <Text style={{ fontSize: 8 }}>Quiz Działa: {departmentId} </Text>
        <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {totalPage}  [{PAGE_SIZE}]</Text>
          <FlatList
            contentContainerStyle={{flexGrow: 1}}
              data={categories}
              renderItem={renderListItems}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              onEndReachedThreshold={0.2}
              onEndReached={LoadMoreRandomData}
              ListFooterComponent={renderFooter}
              />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:40,
  },
  versionText: {
    color: 'gray',
    fontSize: 10,
    textAlign: 'right',
    position: 'absolute',
    bottom: 10,
  },
});

export default CategoryScreen;