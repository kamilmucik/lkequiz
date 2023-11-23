import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const appCtx = useContext(AppContext);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const QUIZ_ID = 1;
  const PAGE_SIZE = 20;

  const HOST = 'http://info.e-strix.pl';

  const fetchDepartments = async (page) => {
    if (loading) return;
    setLoading(true);
    try {
        const response = await fetch(`${HOST}/api/department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`);
        console.log("response", response);
        const json = await response.json();
        console.log("json", json);
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
        console.log("data",json);
        setTotalPage(json.totalPage);
        // setDepartments(json.data);
        departments.length === 0  ? setDepartments(json.data) : setDepartments(prevData => [...prevData, ...json.data]);

        
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
          navigation.navigate('Category', {
            departmentId: item.id,
            departmentName: item.name,
          })
        }
      >
        <Text style={{ fontSize: 16, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 10, marginBottom:10, marginTop:10 }} >
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
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
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
    <SafeAreaView style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: 'white',
      flex: 1,
    }}>
      <ScrollView >
      <Text style={{ fontSize: 10 }}>Paginacja-: {currentPage} / {totalPage}  [{PAGE_SIZE}]</Text>
      {loading ? <ActivityIndicator size='large'/> :
        (
        <FlatList
            data={departments}
            renderItem={renderListItems}
            ItemSeparatorComponent={ItemSeparatorView}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{flexGrow: 1}}
            ItemSeparatorComponent={ItemSeparatorView}
            onEndReachedThreshold={0.2}
            onEndReached={LoadMoreRandomData}
            ListFooterComponent={renderFooter}
            />
        )}
    </ScrollView>
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

export default HomeScreen;