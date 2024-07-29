
import {Route, Routes} from 'react-router';

import AppProvider from '../store/AppProvider.js';
import Layout from "../screens/Layout.js";
import NoPageScreen from "../screens/NoPageScreen.tsx";
import HomeScreen from "../screens/quiz/HomeScreen.tsx";

import KnowlageScreen from "../screens/knowladge/KnowlageScreen.tsx";
import KnowlageCategoriesScreen from "../screens/knowladge/KnowlageCategoriesScreen.tsx";
import CategoriesScreen from "../screens/quiz/CategoriesScreen.tsx";
import KnowlageQuestionScreen from "../screens/knowladge/KnowlageQuestionScreen.tsx";
import SettingsScreen from "../screens/SettingsScreen.tsx";
import QuizScreen from "../screens/QuizScreen.tsx";

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
          <Route path="*" element={<NoPageScreen />} />
        </Route>
      </Routes>
    </AppProvider>
  );
};

export default RootNavigator;