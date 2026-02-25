
import {Route, Routes} from 'react-router';

import AppProvider from '../store/AppProvider.js';
import Layout from "../screens/Layout.js";
import NoPageScreen from "../screens/NoPageScreen.js";
import HomeScreen from "../screens/quiz/HomeScreen.js";

import KnowlageScreen from "../screens/knowladge/KnowlageScreen.js";
import KnowlageCategoriesScreen from "../screens/knowladge/KnowlageCategoriesScreen.js";
import CategoriesScreen from "../screens/quiz/CategoriesScreen.js";
import KnowlageQuestionScreen from "../screens/knowladge/KnowlageQuestionScreen.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import QuizScreen from "../screens/QuizScreen.js";
import HealthScreen from "../screens/HealthScreen.js";

const RootNavigator = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index="true" element={<HomeScreen />} />
          <Route path="category/:departmentId" element={<CategoriesScreen />} />
          <Route path="quiz" element={<QuizScreen />} />
          <Route path="knowlage" element={<KnowlageScreen />} />
          <Route path="knowlage/category/:departmentId" element={<KnowlageCategoriesScreen />} />
          <Route path="knowlage/question/:categoryId" element={<KnowlageQuestionScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
          <Route path="health" element={<HealthScreen />} />
          <Route path="*" element={<NoPageScreen />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default RootNavigator;