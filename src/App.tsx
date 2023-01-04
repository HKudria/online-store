import { Header } from './components/Header/Header';
import { MainPage } from './components/MainPage/MainPage';
import { Footer } from './components/Footer/Footer';
import { BasketPage } from './components/BasketPage/BasketPage';
import { ProductPage } from './components/ProductPage/ProductPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/BasketPage" element={<BasketPage itemsPerPage={6}/>}/>
          <Route path="/ProductPage/:id" element={<ProductPage />}/>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
    
  );
};

export default App;
