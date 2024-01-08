import { View, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
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
  const {loading, moreLoading, data} = useCustomFetch(query, true);

  const fetchDepartments = async (page) => {
    setQuery(`department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`);
  }

  useEffect(() => {
    fetchDepartments(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const onPressItemHandler = (id, name) => {
    navigation.navigate('Category', {
      departmentId: id,
      departmentName: name,
    })
  };

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        alignItems: 'center',
      }]}>
      {loading ? 
        <View>
          <ActivityIndicator size='large' />
        </View>
        :
        <FlatList
          data={data}
          renderItem={ ({item}) => {return ( <HomeMenuTile id={item.id} name={item.name} onPress={ onPressItemHandler } />) }}
          keyExtractor={item => item.id.toString()}
          horizontal={false}
          numColumns={2} 
          style={[styles.tileList]}
          contentContainerStyle={[styles.tileListContent,GlobalStyle.AppScreenViewBackgroundColor]}
          onEndReachedThreshold={0.2}
          ListFooterComponent={<ListFooter loading={moreLoading} />}
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