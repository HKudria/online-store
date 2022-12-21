import './App.css';
import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage';
import { Footer } from './components/Footer/Footer';
import { Form } from './components/FormForPurchase/Form';

const App = () => {
  return (
    <div>
      <Header />
      <MainPage />
      <Footer />
      <Form />
    </div>
    
  )
}

export default App;
