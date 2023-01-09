import s from './ProductPage.module.css';
import { useEffect, useState } from 'react';
import { IProduct } from '../../redux/products/ProductInterface';
import {createSearchParams, NavLink, useNavigate, useParams} from 'react-router-dom';
import {getBasketState, addToBasket, removeFromBasket} from '../../redux/basket/basketSlice';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import arrow from '../../assets/image/arrow.png';
import { getProductsState, parseProducts } from '../../redux/products/productsSlice';


export const ProductPage = () => {
  const basket = useAppSelector(getBasketState);
  const products = useAppSelector(getProductsState);
  const dispatch = useAppDispatch();
  const parameter = useParams();
  const path = parameter.id ?? 0;
  const [inBasket, setInBasket] = useState<boolean>(false);

  const defaultProduct: IProduct = {
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
  }

  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [image, setImage] = useState<string>();

  const navigate = useNavigate();
  const params = { page: 'modal'};

  const goToBasket = () => {
    if (!inBasket) {
      dispatch(addToBasket(product))
    }
    navigate({
      pathname: '../BasketPage',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      search: `?${createSearchParams(params)}`,
    });
  }

  const addProductInBasket = () => {
    if (inBasket) {
      dispatch(removeFromBasket({product: product}));
      setInBasket(false)
    } else {
      dispatch(addToBasket(product));
      setInBasket(true)
    }
  }

  useEffect(() => {
    if (products.products.length !== 0) {
      const currentProduct = products.products.filter((item: IProduct) => item.id === +path);
      setProduct(currentProduct[0]);
    }
    setInBasket(!!basket.products.find(item => item.key.id === +path));
  }, [products.products])

  useEffect(() => {
    dispatch(parseProducts());
  }, []);

  useEffect(() => {
    if (products.products.length !== 0) {
      setImage(products.products[+path - 1].images[0]);
    }
  }, [products.products])

  return (
    <div className={s.wrapper}>
      <div className={s.breadCrumbs}>
        <NavLink to='/' className={s.breadCrumbsItem}>Store</NavLink>
        <img className={s.arrow} src={arrow} />
        <p className={s.breadCrumbsItem}>{product.category}</p>
        <img className={s.arrow} src={arrow} />
        <p className={s.breadCrumbsItem}>{product.brand}</p>
        <img className={s.arrow} src={arrow} />
        <p className={s.breadCrumbsItem}>{product.title}</p>
      </div>
      <div className={s.productName}>{product.title}</div>
      <div className={s.content}>
        <div className={s.photo}>
          <div className={s.miniPhoto}>
            {product.images.map((item, index) => <img onClick={() => setImage(item)} key={index} className={s.miniPhotoItem} src={item}></img>)}
          </div>
          <div className={s.bigPhoto}>
            <img className={s.bigPhotoItem} src={image}></img>
          </div>
        </div>
        <div className={s.description}>
          <p className={s.descriptionAbout}>Description: <span className={s.desctiptionItem}>{product.description}</span></p>
          <p className={s.descriptionAbout}>Discount Percentage: <span className={s.desctiptionItem}>{product.discountPercentage}</span></p>
          <p className={s.descriptionAbout}>Rating: <span className={s.desctiptionItem}>{product.rating}</span></p>
          <p className={s.descriptionAbout}>Stock: <span className={s.desctiptionItem}>{product.stock}</span></p>
          <p className={s.descriptionAbout}>Brand: <span className={s.desctiptionItem}>{product.brand}</span></p>
          <p className={s.descriptionAbout}>Category: <span className={s.desctiptionItem}>{product.category}</span></p>
        </div>
        <div className={s.buttons}>
          <h3 className={s.sum}>{product.price} <span>$</span></h3>
          <button
          onClick={addProductInBasket}
           className={s.button}
           >{inBasket ? 'Drop from card' : 'Add to card' }
           </button>
            <button
            onClick={goToBasket}
             className={s.button}>Buy now</button>
        </div>
      </div>
    </div>
  )
}