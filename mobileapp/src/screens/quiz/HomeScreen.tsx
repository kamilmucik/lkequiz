import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, FlatList, Pressable, Dimensions, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../store/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import airplane from '../../assets/img/airplane.png';
import airplane2 from '../../assets/img/airplane2.png';
import glider from '../../assets/img/glider.png';
import GlobalStyle from "../../utils/GlobalStyle";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width } = Dimensions.get("window");

const tileImages = {
  1: airplane,
  5: glider,
  6: airplane2,
}

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const appCtx = useContext(AppContext);
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const calcTileDimensions = (deviceWidth, tpr) => {
    const margin = (deviceWidth / (tpr * 10));
    const size = ((deviceWidth - margin * (tpr * 2)) / tpr)-5;
    return { size, margin };
  };
  const tileDimensions = calcTileDimensions(width, 2) 
  
  const QUIZ_ID = 1;
  const PAGE_SIZE = 20;

  const HOST = 'http://info.e-strix.pl';

  const fetchDepartments = async (page) => {
    if (loading) return;
    setLoading(true);
    try {
        const response = await fetch(`${HOST}/api/department/${QUIZ_ID}/${page}/${PAGE_SIZE}/`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return [];
    }
}

  async function loadProperties() {
    const value = await AsyncStorage.getItem('@storage_lkequiz3');
    let parsed = JSON.parse(value);
    if(value !== null) {
      appCtx.setSettingsOnlyCorrectValue(parsed.correct);
      appCtx.setSettingsShowPageSize(parsed.pageSize);
    }
  }

  useEffect(() => {
    // Fetch initial page of data
    fetchDepartments(currentPage).then(json => {
        setTotalPage(json.totalPage);
        setDepartments(json.data);
        // departments.length === 0  ? setDepartments(json.data) : setDepartments(prevData => [...prevData, ...json.data]);
        setLoading(false);
    });
  }, [currentPage]);

  useEffect(() => {
    loadProperties();
    setCurrentPage(1)
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
      <View style={[styles.item, {width: tileDimensions.size, height: tileDimensions.size, marginHorizontal: 8.}]}>
        <Image source={tileImages[item.id]} style={[{ width: 64, height: 64 }, styles.tileImg]} />
        <Text style={[GlobalStyle.AppTextMainColor]}>{item.name}</Text>
      </View>

      </Pressable>
    );
    
  }

  const LoadMoreRandomData = () =>{
    if (totalPage > 1 && currentPage < totalPage ) {setCurrentPage(currentPage + 1) ;}
  }

  const renderFooter = () => {
    return (
        <View>
          { loading && <ActivityIndicator size='large'/>}
        </View>
      );
    }

  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        alignItems: 'center',
      }]}>
      {/* <Text style={{ fontSize: 10 }}>Paginacja-: {tileDimensions.size} {currentPage} / {totalPage}  [{PAGE_SIZE}]</Text> */}
      
      <FlatList
          data={departments}
          renderItem={renderTileItems}
          keyExtractor={item => item.id.toString()}
          horizontal={false}
          numColumns={2} 
          style={[styles.tileList]}
          contentContainerStyle={[styles.tileListContent,GlobalStyle.AppScreenViewBackgroundColor]}
          onEndReachedThreshold={0.2}
          onEndReached={LoadMoreRandomData}
          ListFooterComponent={renderFooter}
          />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tileList: {
  },
  tileListContent: {
    marginTop: 30, 
  },
  item: {
    backgroundColor: '#ffffff',
     alignItems: 'center',
     justifyContent: 'center',
     marginBottom: 20,
     borderRadius: 4,
  },
  tileImg: {
    borderColor: '#1f89ce',
    // borderWidth: 1
  }
});

export default HomeScreen;