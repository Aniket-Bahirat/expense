import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
//import {  SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider>
    <div className="App">
      <Home/>
    </div>
     </SnackbarProvider>
  );
}

export default App;
