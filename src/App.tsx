import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import "./scss/app.scss"

import Header from './components/Header'
import Home from './pages/Home';

export const SearchContext = React.createContext('')

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"  */'./pages/Cart'));
const NotFoundBlock = React.lazy(() => import(/* webpackChunkName: "NotFoundBlock"  */'./components/NotFoundBlock'));
// const Cart = React.lazy(() => import('./pages/Cart'));

function App() {

  return (
    <div className="wrapper">
				<Header  />
				<div className="content">
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/cart' element={<Suspense fallback={<div>Идёт загрузка корзины...</div>}><Cart /></Suspense>} />
							<Route path='*' element={<Suspense fallback={<div>Нет страницы</div>}><NotFoundBlock /></Suspense>} />
						</Routes>
				</div>
     </div>

  );
}

export default App;
