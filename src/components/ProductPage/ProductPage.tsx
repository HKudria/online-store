import s from './ProductPage.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getProductsState, parseProducts } from '../../redux/products/productsSlice';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { IProduct } from '../../redux/products/ProductInterface';
import { NavLink } from 'react-router-dom';


export const ProductPage = () => {
  const {products} = useAppSelector(getProductsState);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const defaultProduct: IProduct[] = [{
    id: 0,
    title: '',
    description: '',
    discountPercentage: 0,
    price: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: [],
  }]


  const [product, setProduct] = useState(defaultProduct);
  
  useEffect(() => {
    dispatch(parseProducts());
  }, []);


  useEffect(() => {
    const routeList = location.pathname.split('/');
    const path = routeList[routeList.length - 1];
    const currentProduct = products.filter((item: IProduct) => item.id === +path);
    setProduct(currentProduct);
  })

  return (
    <div className={s.wrapper}>
      <div className={s.breadCrumbs}>
        <NavLink to='/'>Store</NavLink>
        <p>--</p>
        <p>{product[0].category}</p>
        <p>--</p>
        <p>{product[0].brand}</p>
        <p>--</p>
        <p>{product[0].title}</p>
      </div>
      <div className={s.content}>
        <div className={s.productName}>{product[0].title}</div>
        <div className={s.photo}>
          <div className={s.miniPhoto}>
            {product[0].images.map((item, index) => <img key={index} className={s.miniPhotoItem} src={item}></img>)}
          </div>
          <div className={s.bigPhoto}>
            <img className={s.bigPhotoItem} src={product[0].images[0]}></img>
          </div>
        </div>
        <div className={s.description}>
          <p>Description: <span className={s.desctiptionItem}>{product[0].description}</span></p>
          <p>Discount Percentage: <span className={s.desctiptionItem}>{product[0].discountPercentage}</span></p>
          <p>Rating: <span className={s.desctiptionItem}>{product[0].rating}</span></p>
          <p>Stock: <span className={s.desctiptionItem}>{product[0].stock}</span></p>
          <p>Brand: <span className={s.desctiptionItem}>{product[0].brand}</span></p>
          <p>Category: <span className={s.desctiptionItem}>{product[0].category}</span></p>
        </div>
        <div className={s.buttons}>
          <h3>$549</h3>
          <button>ADD TO CARD</button>
          <button>BUY NOW</button>
        </div>
      </div>

    </div>
  )
}