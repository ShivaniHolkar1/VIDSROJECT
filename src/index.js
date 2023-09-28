import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import DashboardMain from "./Admin/DashboardMain";
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import './index.css';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './AuthGuard/Login'
// import Auth from './AuthGuard/Auth';
// import App from './App';
// import ProtectedRoute from './AuthGuard/ProtectedRoute';
// import  History from './Admin/History';



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
// 	<React.StrictMode>
// 		<BrowserRouter basename={'/'}>
// 			<Routes>
// 			{/* <Route path='/auth' element={<Auth />}>	 */}
// 					<Route path='login' element={<Login />} />
// 				{/* </Route> */}
// 				<Route path="/" element={<App />}>
// 					<Route path='' element={
// 						<ProtectedRoute>
//             <Route path="history" element={<History />} />
// 						</ProtectedRoute>
// 					} />
// 				</Route>
// 			</Routes>
// 		</BrowserRouter>
// 	</React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
