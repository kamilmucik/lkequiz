import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState, useReducer, useMemo } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QUIZ_ID, PAGE_SIZE } from '../../config.tsx';
import HomeMenuTile from '../../components/HomeMenuTile';
import ListFooter from '../../components/ListFooter';
import {useCustomFetch} from '../../hooks/useCustomFetch'

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const {loading, moreLoading, totalPage, data} = useCustomFetch(query);

  const fetchDepartments = async (page) => {
    setQuery(`department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`);
}

useEffect(() => {
  fetchDepartments(currentPage);
}, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const renderTileItems = ({item}) => {    
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Category', {
            departmentId: item.id,
            departmentName: item.name,
          })
        }
      >
        <HomeMenuTile item={item} />
      </Pressable>
    );
  }

  const LoadMoreRandomData = () =>{ 
    if (currentPage < totalPage){
      setCurrentPage(currentPage + 1);
    } 
  }

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        alignItems: 'center',
      }]}>
      {/* <Text style={{ fontSize: 10 }}>Paginacja: {currentPage} / {state.totalPage} "{state.isListEnd?'true':'false'}" [{PAGE_SIZE}]</Text> */}
      {loading ? 
        <View>
          <ActivityIndicator size='large' />
        </View>
        :
        <FlatList
          data={data}
          renderItem={renderTileItems}
          keyExtractor={item => item.id.toString()}
          horizontal={false}
          numColumns={2} 
          style={[styles.tileList]}
          contentContainerStyle={[styles.tileListContent,GlobalStyle.AppScreenViewBackgroundColor]}
          onEndReachedThreshold={0.2}
          onEndReached={LoadMoreRandomData}
          ListFooterComponent={ () =>{
            <HomeMenuTile loading={moreLoading} />
          }}
          />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tileList: {
  },
  tileListContent: {
    marginTop: 30, 
  }
});

export default HomeScreen;