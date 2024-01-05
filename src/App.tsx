import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

import Board from './components/Board/Board';
import BoardHome from './components/Home/BoardHome';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/board'  element={<BoardHome/>} />
      <Route path='/board/:board_id' element={<Board/>}/>
    </Routes>
  </BrowserRouter>
  );

}

export default App;
