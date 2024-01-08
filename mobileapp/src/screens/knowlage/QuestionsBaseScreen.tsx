import { View, StyleSheet, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QUIZ_ID, PAGE_SIZE } from '../../config.tsx';
import KnowlageMenuListElement from '../../components/KnowlageMenuListElement';
import ListFooter from '../../components/ListFooter';
import ItemSeparator from '../../components/ItemSeparator';
import {useCustomFetch} from '../../hooks/useCustomFetch'

const QuestionsBaseScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const {loading, moreLoading, totalPage, data} = useCustomFetch(query, true);

  const fetchDepartments = async (page) => {
    setQuery(`department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`);
    }
  
  useEffect(() => {
    fetchDepartments(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, []);

  const onPressItemHandler = (id, name) => {
    navigation.navigate('Categories', {
      departmentId: id,
      departmentName: name,
    })
  };

  const LoadMoreRandomData = () =>{
    if (currentPage < totalPage ) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingTop: insets.top,
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
            renderItem={ ({item}) => <KnowlageMenuListElement id={item.id} name={item.name} onPress={ onPressItemHandler } /> }
            keyExtractor={ (item, index) => `${item.id}-${index}`}
            contentContainerStyle={[styles.flatListItem,{}]}
            ItemSeparatorComponent={<ItemSeparator />}
            onEndReached={LoadMoreRandomData}
            onEndReachedThreshold={0.2}
            ListFooterComponent={<ListFooter loading={moreLoading} />}
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
    marginTop: 30, 
  },

  flatListItem: {
    margin: 4,
  }
});

export default QuestionsBaseScreen;