import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import Post from '../Components/Post';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} exact={true} />
        <Route path="/:handle" element={<Post />} exact={true} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default AppRouter;