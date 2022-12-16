import s from './ProductCard.module.css';
import {Button} from '../../Filters/Button/Button'
import iPhone from '../../../../assets/image/iphone.png'
import {IProduct} from '../../../../redux/products/ProductInterface'
import React from 'react';

interface IProductCardInterface {
    product: IProduct
}

export const ProductCard: React.FC<IProductCardInterface> = (props: IProductCardInterface) => {
    const { product } = props
    return (
        <>
            <div className={s.cardWrapper}>
                <h3 className={s.title}>{product.title}</h3>
                <ul className={s.description}>
                    {product.description}
                    <li>Category: {product.category}</li>
                    <li>Brand: {product.brand}</li>
                    <li>Price: €{product.price}</li>
                    <li>Discount: {product.discountPercentage}%</li>
                    <li>Rating: {product.rating}</li>
                    <li>Stock: {product.stock}</li>
                </ul>
                <div className={s.buttonsWrapper}>
                    <Button name='App to card'/>
                    <Button name='Details'/>
                </div>
                <img className={s.cardImg} src={product.thumbnail ?? iPhone} alt='iphone'/>
            </div>
        </>
    )
}