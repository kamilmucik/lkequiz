import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator,SafeAreaView, ScrollView,TouchableOpacity,FlatList } from 'react-native';
import AppContext from "../../store/AppContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalStyle from "../../utils/GlobalStyle";

const QuizScreen = ({navigation, route}) => {

    const appCtx = useContext(AppContext);
    const insets = useSafeAreaInsets(); 

    const { quizCategoryName } = route.params;
    const { quizCategoryId } = route.params;
    const { quizTimeLimit } = route.params;
    const { quizQuestionLimit } = route.params;

    const [questions, setQuestions] = useState([]);
    const [countDownTime, setCountDownTime] = useState(quizTimeLimit);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [scorePercentage, setScorePercentage] = useState(0);


    const HOST = 'http://info.e-strix.pl';

    const fetchQuestions = async (page) => {
      try {
          const response = await fetch(`${HOST}/api/quiz/${quizCategoryId}/1/${quizQuestionLimit}/`);
          // console.log("response", response);
          const json = await response.json();
          // console.log("json", json);
          return json;
      } catch (error) {
          console.error(error);
          // return [];
      } finally {
          
      }
  }

  useEffect(() => {
      setLoading(true);
    // Fetch initial page of data
      fetchQuestions(currentPage).then(json => {
          setQuestions(json.data);
          // console.log("data",questions);
          setLoading(false);
      });
  }, [currentPage]);

  async function loadProperties() {
    console.log('loadProperties')
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
    setCurrentQuestion(function (prevCount) {
        if (prevCount < questions.length-1) {
            return (prevCount += 1); 
        } else {
            return (prevCount = questions.length-1);
        }
    });
  }

  function decrement() {
    setCurrentQuestion(function (prevCount) {
      if (prevCount > 0) {
        return (prevCount -= 1); 
      } else {
        return (prevCount = 0);
      }
    });
  }
  function finish() {
    setShowScore(true);
    var count = (score/quizQuestionLimit)*100;
    setScorePercentage(Math.round(count));
  }

  const renderListItems = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
            <CustomRadioButton 
                label={item.answer}
                correct={item.correct === "1"}
                selected={answers[currentQuestion] == item.id} 
                onSelect={() => handleAnswerSelection(currentQuestion, item)} 
            /> 
        </View>
        
    );
  };

  const CustomRadioButton = ({ label,correct, selected, onSelect }) => ( 
    <TouchableOpacity 
      disabled={showScore}
        style={[styles.radioButton, 
        { backgroundColor: selected ? '#2db2ff' : '#FFF' }
      ]} 
        onPress={onSelect} 
    > 
        <Text style={[styles.radioButtonText, 
        { color: selected ? 'white' : 'grey' }]}> 
           {correct && showScore? "[poprawna]":""} {label} 
        </Text> 
    </TouchableOpacity> 
); 

  const renderHeader = ({ item }) => ( 
    <View>
      <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 10, marginLeft: 10}}>{questions[currentQuestion].code}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginBottom: 6 }}>
          <Text style={[GlobalStyle.AppTextMainColor,{ fontSize: 16, marginLeft: 10}]}>{questions[currentQuestion].question}</Text>
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

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#e6ecf6',
        }}
      />
    );
  };
  
  return (
    <SafeAreaView style={[GlobalStyle.AppContainer, GlobalStyle.AppScreenViewBackgroundColor,{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      alignItems: 'center', padding: 10
    }]}>
      <ScrollView>

        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '25%'}}>
                <Text style={{ fontSize: 14}}>Kategoria</Text>
            </View>
            <View style={{ width: '75%'}}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' , textAlign: 'left'}}>{quizCategoryName}</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '25%'}}>
                <Text style={{ fontSize: 14}}>Czas</Text>
            </View>
            <View style={{ width: '75%'}}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' , textAlign: 'left'}}>{countDownTime}({quizTimeLimit})min.</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '25%'}}>
                <Text style={{ fontSize: 14}}>Pytań</Text>
            </View>
            <View style={{ width: '75%'}}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' , textAlign: 'left'}}>{currentQuestion + 1} z {questions.length}</Text>
            </View>
        </View>
        {showScore ? (
          <View style={{ flexDirection: 'row',padding:5 }}>
            <View style={{ width: '25%'}}>
                  <Text style={{ fontSize: 16}}>Wynik</Text>
              </View>
              <View style={{ width: '75%'}}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'left'}}>{score} {scorePercentage}% {scorePercentage >=80 ? (<Text>Pozytywny</Text>):(<Text>Negatywny</Text>) }</Text>
              </View>
          </View>
          ) : null}
        {questions && questions.length > 0 ?
        <View >
            <View style={[styles.questionContent,{ flexDirection: 'row' }]}>
            {/* <View style={{ width: '100%', padding:5}}> */}
            <FlatList
                data={questions[currentQuestion].answers}
                renderItem={renderListItems}
                nestedScrollEnabled={true}
                scrollEnabled={false}
                ItemSeparatorComponent={ItemSeparatorView}
                keyExtractor={ (item, index) => `${item.id}-${index}`}
                ListHeaderComponent={renderHeader}
                />
            {/* </View> */}
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%', paddingRight: 4}}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => decrement()}
                    style={[GlobalStyle.AppButton,GlobalStyle.AppPrimaryButton, {marginTop: 24}]}>
                    <Text style={[GlobalStyle.AppPrimaryButtonText]}>Wstecz</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: '50%', paddingLeft: 4}}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => increment()}
                    style={[GlobalStyle.AppButton,GlobalStyle.AppPrimaryButton, {marginTop: 24}]}>
                    <Text style={[GlobalStyle.AppPrimaryButtonText]}>Dalej</Text>
                  </TouchableOpacity>
                </View>
            </View>
              
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '100%' }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => finish()}
                  style={[GlobalStyle.AppButton, GlobalStyle.AppSecoundaryButton, {marginTop: 24}]}>
                  <Text style={[GlobalStyle.AppSecoundaryButtonText]}>Zakończ test</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
        :
        <ActivityIndicator size='large' />
            }
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:40,
  },
  questionContent: {
    marginTop:20,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingTop: 8, 
    paddingBottom: 2,
    
    // justifyContent: 'center'
  },

  radioButton: { 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    // borderRadius: 8, 
    marginVertical: 2, 
    // borderWidth: 1, 
    // borderColor: '#007BFF', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    width: '100%', 
  }, 
  radioButtonText: { 
      fontSize: 12, 
  }, 
});
export default QuizScreen;