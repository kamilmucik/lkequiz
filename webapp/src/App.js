import logo from './logo.svg';
import {Route,Routes, Redirect} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import AppProvider from './store/AppProvider';
import Layout from "./screens/Layout";
import NoPageScreen from "./screens/NoPageScreen";
import HomeScreen from "./screens/HomeScreen";
import KnowlageScreen from "./screens/KnowlageScreen";
import KnowlageCategoriesScreen from "./screens/KnowlageCategoriesScreen";
import KnowlageQuestionScreen from "./screens/KnowlageQuestionScreen";
import SettingsScreen from "./screens/SettingsScreen";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path="knowlage" element={<KnowlageScreen />} />
          <Route path="knowlage/category/:departmentId" element={<KnowlageCategoriesScreen />} />
          <Route path="knowlage/question/:categoryId" element={<KnowlageQuestionScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
          <Route path="*" element={<NoPageScreen />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
