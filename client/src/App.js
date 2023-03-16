import React, { useState } from 'react';
import './App.css';
// import { createBrowserRouter, BrowserRouter as Router, RouterProvider, redirect } from 'react-router-dom';
// This is a React Router v6 app
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./components/Home";
import Login from './components/Login';
import Register from './components/Register';
import Policy from './components/Policy';
import Illustration from './components/Illustration';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from './components/PageNotFound';

import { useAuthState } from "./utils/setUserContext";

function App() {

  const { user } = useAuthState();

  const [policyParameter, setPolicyParameter] = useState({
    sum_assured: 0,
    dob: "",
    gender: "",
    premium: 0,
    premuim_frequency: "",
    pt: 0,
    ppt: 0
  })

  // const router = useRoutes([
  //   {
  //     path: "/", element: <Home />, loader: async () => {
  //       if (!user) {
  //         throw redirect("/login");
  //       }
  //       return user;
  //     }
  //   },
  //   {
  //     path: "/login", element: <Login />, loader: async () => {
  //       if (user) {
  //         throw redirect("/")
  //       }
  //       return 1;
  //     }
  //   },
  //   {
  //     path: "/register", element: <Register />, loader: async () => {
  //       if (user) {
  //         throw redirect("/")
  //       }
  //       return 1;
  //     }
  //   },
  //   {
  //     path: "/policy-calculation", element: <Policy setPolicy={setPolicyParameter} policyValue={policyParameter} />, loader: async () => {
  //       if (!user) {
  //         throw redirect("/login")
  //       }
  //       return 1;
  //     }
  //   },
  //   {
  //     path: "/illustration", element: <Illustration {...policyParameter} />, loader: async () => {
  //       if (!user) {
  //         throw redirect("/login")
  //       }
  //       return 1;
  //     }
  //   },
  // ])

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route exact path="/" element={<ProtectedRoute user={user} element={<Home />} />} />
        <Route exact path='/policy-calculation' element={<ProtectedRoute user={user} element={<Policy setPolicy={setPolicyParameter} policyValue={policyParameter} />} />} />
        <Route exact path='/illustration' element={<ProtectedRoute user={user} element={<Illustration {...policyParameter} />} />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;