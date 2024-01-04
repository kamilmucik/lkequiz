import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator,SafeAreaView, ScrollView,FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalStyle from "../../utils/GlobalStyle";
import {useCustomFetch} from '../../hooks/useCustomFetch';
import CustomButton from '../../components/CustomButton';
import RowView from '../../components/RowView';
import ItemSeparator from '../../components/ItemSeparator';
import CustomRadioButton from '../../components/CustomRadioButton';

const QuizScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets(); 

  const { quizCategoryName } = route.params;
  const { quizCategoryId } = route.params;
  const { quizTimeLimit } = route.params;
  const { quizQuestionLimit } = route.params;

  const [countDownTime, setCountDownTime] = useState(quizTimeLimit);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [scorePercentage, setScorePercentage] = useState(0);

  const [query, setQuery] = useState('');
  const {data} = useCustomFetch(query,false);

  const fetchQuestions = async (page) => {
      setQuery(`quiz/${quizCategoryId}/1/${quizQuestionLimit}/`);
  }

  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage]);

  async function loadProperties() {
    setScore(0);
  }

  useEffect(() => {
    loadProperties();
    setCurrentPage(1)
    setAnswers([]);
    setShowScore(false);
  }, []);


  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer.id;
    setAnswers(updatedAnswers);
    if (selectedAnswer.correct === "1") {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDownTime > 0) {
        setCountDownTime(countDownTime - 1);
      }
      if (countDownTime === 0) {
        finish();
      }
    }, 60000); // 1 min

    return () => clearInterval(interval);
  }, [countDownTime]);

  function increment() {
    currentQuestion < data.length-1 ? setCurrentQuestion(currentQuestion+1) : setCurrentQuestion(data.length-1);
  }

  function decrement() {
    currentQuestion > 0 ? setCurrentQuestion(currentQuestion-1) : setCurrentQuestion(0);
  }

  function finish() {
    setShowScore(true);
    let count = (score/quizQuestionLimit)*100;
    setScorePercentage(Math.round(count));
  }

  const renderListItems = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
            <CustomRadioButton 
                label={item.answer}
                correct={item.correct === "1"}
                showScore={showScore}
                selected={answers[currentQuestion] == item.id} 
                onSelect={() => handleAnswerSelection(currentQuestion, item)} 
            /> 
        </View>
    );
  };

  const renderHeader = () => ( 
    <View>
      <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 10, marginLeft: 10}}>{data[currentQuestion].code}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 6 }}>
          <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 16, marginLeft: 10}]}>{data[currentQuestion].question}</Text>
      </View>
      <View
        style={{
          height: 6,
          width: '100%',
          backgroundColor: '#e6ecf6',
        }}
      />
    </View>
); 
 
  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      alignItems: 'center', padding: 10
    }]}>
      <ScrollView>
        
        <RowView leftText="Kategoria" rightText={quizCategoryName}/>
        <RowView leftText="Czas" rightText={countDownTime+'(' + quizTimeLimit + ')min'}  />
        <RowView leftText="Pytań" rightText={(currentQuestion + 1) + ' z ' + data.length} />

        {showScore ? (
          <View>
            <RowView leftText="Wynik" rightText={score + ' ' + scorePercentage + '%' + (scorePercentage >=80 ? 'Pozytywny':'Negatywny')} />
            <View style={{ flexDirection: 'row' }}>
              <CustomButton text='Powrót' onPress={() => navigation.goBack(null)} style={{ width: '100%' }} />
            </View>
          </View>
        ) : null}
        
        {data && data.length > 0 ?
        <View >
          <View style={[styles.questionContent,{ flexDirection: 'row' }]}>
          <FlatList
              style={styles.flatList}
              data={data[currentQuestion].answers}
              renderItem={renderListItems}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              ItemSeparatorComponent={<ItemSeparator />}
              keyExtractor={ (item, index) => `${item.id}-${index}`}
              ListHeaderComponent={renderHeader}
              />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <CustomButton text='Wstecz' onPress={() => decrement()} style={{ width: '50%', paddingRight: 4 }} primary={true} />
            <CustomButton text='Dalej'  onPress={() => increment()} style={{ width: '50%', paddingRight: 4 }} primary={true} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <CustomButton text='Zakończ test' onPress={() => finish()} style={{ width: '100%' }} />
          </View>
        </View>
        :
         <View>
            <ActivityIndicator size='large' />
          </View>
        }
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  questionContent: {
    marginTop:20,
    paddingTop: 8, 
    paddingBottom: 2,
  },


  flatList: {
    backgroundColor: '#e6ecf6',
  },
});
export default QuizScreen;