import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ActivityIndicator,SafeAreaView, ScrollView,TouchableOpacity,FlatList } from 'react-native';
import AppContext from "../../store/AppContext";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GlobalStyle from "../../utils/GlobalStyle";
import { RadioButton  } from 'react-native-paper';

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

    const [value, setValue] = React.useState('first');


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

  useEffect(() => {
    // loadProperties();
    setCurrentPage(1)
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
            <View style={{ width: '20%'}}>
              <RadioButton value={item.id} />
            </View>
            <View style={{ width: '80%'}}>
              <Text style={{ fontSize: 16, paddingHorizontal: 12, paddingVertical: 4, paddingBottom: 4, marginBottom:4, marginTop:10 }} >
                {item.answer}
              </Text>
            </View>
        </View>
        
    );
  };
  
  return (
    <SafeAreaView style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      backgroundColor: 'white',
      flex: 1,
    }}>
      <ScrollView >
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '30%'}}>
                <Text style={{ fontSize: 16}}>Kategoria</Text>
            </View>
            <View style={{ width: '70%'}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{quizCategoryName}</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '30%'}}>
                <Text style={{ fontSize: 16}}>Czas</Text>
            </View>
            <View style={{ width: '70%'}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{countDownTime}({quizTimeLimit})min.</Text>
            </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '30%'}}>
                <Text style={{ fontSize: 16}}>Pytań</Text>
            </View>
            <View style={{ width: '70%'}}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' , textAlign: 'center'}}>{currentQuestion + 1} z {questions.length}</Text>
            </View>
        </View>


        {questions && questions.length > 0 ?
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '100%'}}>
                  <Text style={{ fontSize: 10}}>{questions[currentQuestion].code}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '100%'}}>
                  <Text style={{ fontSize: 16}}>{questions[currentQuestion].question}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '100%'}}>
              <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                
              <FlatList
                data={questions[currentQuestion].answers}
                renderItem={renderListItems}
                keyExtractor={item => item.id.toString()}
                />

              </RadioButton.Group>
              </View>
            </View>

        </View>
        :
        <ActivityIndicator size='large' />
            // <div>
            //     <h5> {questions[currentQuestion].code}</h5> <h4>{questions[currentQuestion].question}</h4>
            //     <ul>
            //       {questions[currentQuestion].answers && questions[currentQuestion].answers.map( (answer,index) =>
            //           <li key={index} >
            //             <input
            //               disabled={showScore}
            //               type="radio"
            //               name={`question${currentQuestion}`}
            //               id={`answer${answer.id}`}
            //               value={answer.answer}
            //               checked={answers[currentQuestion] === answer.id}
            //               onChange={() =>
            //                 handleAnswerSelection(currentQuestion, answer)
            //               }
            //             />
                        
            //             <label for={`answer${answer.id}`}> {showScore && answer.correct === "1" ? (<>*</>):(<></>)} {answer.answer}</label>
            //           </li>
            //     )}
            //     </ul>
                
            // </div>
            // : <div>loading...</div>
            }
        


        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%'}}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => decrement()}
                style={[GlobalStyle.AppButton, {marginTop: 24}]}>
                <Text style={[GlobalStyle.AppButtonText]}>Wstecz</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '50%'}}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => increment()}
                style={[GlobalStyle.AppButton, {marginTop: 24}]}>
                <Text style={[GlobalStyle.AppButtonText]}>Dalej</Text>
              </TouchableOpacity>
            </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '100%'}}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => finish()}
                style={[GlobalStyle.AppButton, {marginTop: 24}]}>
                <Text style={[GlobalStyle.AppButtonText]}>Zakończ test</Text>
              </TouchableOpacity>
            </View>
        </View>
       </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:40,
  }
});
export default QuizScreen;