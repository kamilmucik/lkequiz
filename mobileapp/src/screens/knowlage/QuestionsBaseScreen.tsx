import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const QuestionsBaseScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  // const { quizId } = route.params;
  const appCtx = useContext(AppContext);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isListEnd, setListEnd] = useState(false);

  
  const QUIZ_ID = 1;
  const PAGE_SIZE = 4;
  
  const HOST = 'http://info.e-strix.pl';

  const fetchDepartments = async (page) => {
    if (loading) return;
    if (isListEnd) return;
    setLoading(true);
    try {
        const response = await fetch(`${HOST}/api/department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`);
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
    // try {
    //   appCtx.setIsDebugMode(0);
    // } catch(e) {
    //   console.error(e)
    // }
  }


  useEffect(() => {
    // Fetch initial page of data
    fetchDepartments(currentPage).then(json => {
        setTotalPage(json.totalPage);
        departments.length == 0  ? setDepartments(json.data) : setDepartments(prevData => [...prevData, ...json.data]);

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
          navigation.navigate('Categories', {
            departmentId: item.id,
            departmentName: item.name,
          })
        }
      >
        <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 16, paddingHorizontal: 12, verticalAlign:'middle', flex: 1}]} >
          {item.name}
        </Text>
      </Pressable>
    );
  };
  const LoadMoreRandomData = () =>{
    if (totalPage > 1 && currentPage < totalPage ) {setCurrentPage(currentPage + 1) ;}
  }
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 2,
          width: '100%',
          // backgroundColor: 'blue',
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
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      alignItems: 'center'
    }]}>
        <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {totalPage}  [{PAGE_SIZE}]</Text>
        {departments && departments.length > 0 ?
        <FlatList
            data={departments}
            style={styles.flatList}
            renderItem={renderListItems}
            keyExtractor={ (item, index) => `${item.id}-${index}`}
            contentContainerStyle={[styles.flatListItem,{}]}
            ItemSeparatorComponent={ItemSeparatorView}
            onEndReached={LoadMoreRandomData}
            onEndReachedThreshold={0.2}
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

export default QuestionsBaseScreen;