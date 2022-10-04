import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from '../assets/styles/GlobalStyle';
import UserContext from './contexts/UserContext';
import { Suspense, lazy, useState } from "react";

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
    <UserContext.Provider values={{ user, setUser }}>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Template />}>
            <Route path={'/'} element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App;
