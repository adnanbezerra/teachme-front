import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../assets/styles/GlobalStyle';
import UserContext from './contexts/UserContext';
import { Suspense, lazy, useState } from "react";
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';

const Loading = () => (
  <div>Loading...</div>
);

const LazyWrapper = (Component) => (props) => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
)

const Template = LazyWrapper(lazy(() => import("./templates/PageTemplate/PageTemplate")));
const MainPage = LazyWrapper(lazy(() => import("./pages/MainPage/MainPage")));

function App() {
  const { user, setUser } = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/'} element={<Template />}>
            <Route path={'/'} element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App;
