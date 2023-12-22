import { View, Text, StyleSheet, SafeAreaView, Image, ActivityIndicator, FlatList, Pressable } from "react-native";
import React, { useContext, useEffect, useState, useReducer } from "react";
import airplane from '../../assets/img/airplane.png';
import airplane2 from '../../assets/img/airplane2.png';
import glider from '../../assets/img/glider.png';
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BASE_API_URL, QUIZ_ID, PAGE_SIZE } from '../../config.tsx';
import {INITIAL_STATE, postReducer} from '../../hooks/postReducer';
import {ACTION_TYPE} from '../../hooks/postActionTypes';

const tileImages = {
  1: airplane,
  5: glider,
  6: airplane2,
}

const QuestionsBaseScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(1);
  const [state, dispach] = useReducer(postReducer, INITIAL_STATE);

  const fetchDepartments = async (page) => {
    if (state.loading || state.moreLoading || state.isListEnd) return;
    dispach({type: ACTION_TYPE.FETCH_START, currentPage: page});
    fetch(`${BASE_API_URL}/department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`)
      .then( (response) => {
        return response.json();
      })
      .then( (data) => {
        dispach({type: ACTION_TYPE.FETCH_SUCCESS, payload: data.data, totalPage: data.totalPage});
      })
      .catch( (error) => {
        dispach({type: ACTION_TYPE.FETCH_ERROR});
      });
}
  
  useEffect(() => {
    if (state.loading) return;
    // Fetch initial page of data
    dispach({type: "FETCH_START"});
    fetchDepartments(currentPage);
  }, [currentPage]);

  useEffect(() => {
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
        <View style={[GlobalStyle.AppFlatListStyleItem,{ flexDirection: 'row' }]}>
          <Image source={tileImages[item.id]} style={[{ width: 48, height: 48, marginLeft:8 , marginTop:8  }]} />
          <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 18, paddingHorizontal: 12, verticalAlign:'middle', flex: 1}]} >
            {item.name}
          </Text>
        </View>
        
      </Pressable>
    );
  };
  const LoadMoreRandomData = () =>{
    if (state.totalPage > 1 && currentPage < state.totalPage ) {setCurrentPage(currentPage + 1) ;}
  }
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 4,
          width: '100%',
        }}
      />
    );
  };
  const renderFooter = () => {
    return (
        <View>
          { state.loading && <ActivityIndicator />}
        </View>
      );
    }
  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      alignItems: 'center'
    }]}>
        {state.loading ? 
        <View>
          <ActivityIndicator size='large' />
        </View>
        :
        <FlatList
            data={state.data}
            style={styles.flatList}
            renderItem={renderListItems}
            keyExtractor={ (item, index) => `${item.id}-${index}`}
            contentContainerStyle={[styles.flatListItem,{}]}
            ItemSeparatorComponent={ItemSeparatorView}
            onEndReached={LoadMoreRandomData}
            onEndReachedThreshold={0.2}
            ListFooterComponent={renderFooter}
            />
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
  },

  flatListItem: {
    margin: 4,
  }
});

export default QuestionsBaseScreen;