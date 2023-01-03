import s from './ProductPage.module.css';
import { useEffect, useState } from 'react';
import { IProduct } from '../../redux/products/ProductInterface';
import { createSearchParams, NavLink, useNavigate } from 'react-router-dom';
import products from '../../data.json';


export const ProductPage = () => {
  const routeList = location.pathname.split('/');
  const path = routeList[routeList.length - 1];
  
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
  const [image, setImage] = useState(products.products[+path - 1].thumbnail);

  const navigate = useNavigate();
  const params = { page: 'modal'};

  const goToBasket = () =>
    navigate({
      pathname: '../BasketPage',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      search: `?${createSearchParams(params)}`,
    });


  
  useEffect(() => {
    const currentProduct = products.products.filter((item: IProduct) => item.id === +path);
     setProduct(currentProduct);
  }, [])

  return (
    <div className={s.wrapper}>
      <div className={s.breadCrumbs}>
        <NavLink to='/' className={s.breadCrumbsItem}>Store</NavLink>
        <p className={s.breadCrumbsItem}>---</p>
        <p className={s.breadCrumbsItem}>{product[0].category}</p>
        <p className={s.breadCrumbsItem}>---</p>
        <p className={s.breadCrumbsItem}>{product[0].brand}</p>
        <p className={s.breadCrumbsItem}>---</p>
        <p className={s.breadCrumbsItem}>{product[0].title}</p>
      </div>
      <div className={s.productName}>{product[0].title}</div>
      <div className={s.content}>
        <div className={s.photo}>
          <div className={s.miniPhoto}>
            {product[0].images.map((item, index) => <img onClick={() => setImage(item)} key={index} className={s.miniPhotoItem} src={item}></img>)}
          </div>
          <div className={s.bigPhoto}>
            <img className={s.bigPhotoItem} src={image}></img>
          </div>
        </div>
        <div className={s.description}>
          <p className={s.descriptionAbout}>Description: <span className={s.desctiptionItem}>{product[0].description}</span></p>
          <p className={s.descriptionAbout}>Discount Percentage: <span className={s.desctiptionItem}>{product[0].discountPercentage}</span></p>
          <p className={s.descriptionAbout}>Rating: <span className={s.desctiptionItem}>{product[0].rating}</span></p>
          <p className={s.descriptionAbout}>Stock: <span className={s.desctiptionItem}>{product[0].stock}</span></p>
          <p className={s.descriptionAbout}>Brand: <span className={s.desctiptionItem}>{product[0].brand}</span></p>
          <p className={s.descriptionAbout}>Category: <span className={s.desctiptionItem}>{product[0].category}</span></p>
        </div>
        <div className={s.buttons}>
          <h3 className={s.sum}>{product[0].price} <span>$</span></h3>
          <button className={s.button}>ADD TO CARD</button>
            <button
            onClick={goToBasket}
             className={s.button}>BUY NOW</button>
        </div>
      </div>

    </div>
  )
}