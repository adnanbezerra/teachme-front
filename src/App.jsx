import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './assets/styles/GlobalStyle';
import UserContext from './components/contexts/UserContext';
import { Suspense, lazy, useState } from "react";
import RegisterPage from './components/pages/RegisterPage/RegisterPage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Loading = () => (
  <div>Loading...</div>
);

const LazyWrapper = (Component) => (props) => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
)

const Template = LazyWrapper(lazy(() => import("./components/templates/PageTemplate/PageTemplate")));
const MainPage = LazyWrapper(lazy(() => import("./components/pages/MainPage/MainPage")));
const SearchPage = LazyWrapper(lazy(() => import("./components/pages/SearchPage/SearchPage")));
const Logout = LazyWrapper(lazy(() => import("./components/pages/LoginPage/Logout")));
const UserPage = LazyWrapper(lazy(() => import("./components/pages/UserPage/UserPage")));
const EditUser = LazyWrapper(lazy(() => import("./components/pages/EditUserPage/EditUserPage")));
const NewPost = LazyWrapper(lazy(() => import("./components/pages/NewPostPage/NewPostPage")));

function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GlobalStyle />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <BrowserRouter>
        <Routes>
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/'} element={<Template />}>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/search'} element={<SearchPage />} />
            <Route path={'/logout'} element={<Logout />} />
            <Route path={'/user/me'} element={<UserPage />} />
            <Route path={'/edit-user'} element={<EditUser />} />
            <Route path={'/new-post'} element={<NewPost />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </UserContext.Provider>
  )
}

export default App;