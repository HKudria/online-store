import s from './ProductPage.module.css';
import iPhone from '../../assets/image/iphone.png';

export const ProductPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.breadCrumbs}>
        <p>Store</p>
        <p>--</p>
        <p>Smartfones</p>
        <p>--</p>
        <p>Apple</p>
        <p>--</p>
        <p>Iphone</p>
      </div>
      <div className={s.content}>
        <div className={s.productName}>IPhone 9</div>
        <div className={s.photo}>
          <div className={s.miniPhoto}>
            <img className={s.miniPhotoItem} src={iPhone}></img>
            <img className={s.miniPhotoItem} src={iPhone}></img>
            <img className={s.miniPhotoItem} src={iPhone}></img>
          </div>
          <div className={s.bigPhoto}>
            <img className={s.bigPhotoItem} src={iPhone}></img>
          </div>
        </div>
        <div className={s.description}>
          <p>Description: <span className={s.desctiptionItem}>test1</span></p>
          <p>Discount Percentage: <span className={s.desctiptionItem}>test2</span></p>
          <p>Rating: <span className={s.desctiptionItem}>test3</span></p>
          <p>Stock: <span className={s.desctiptionItem}>test4</span></p>
          <p>Brand: <span className={s.desctiptionItem}>test5</span></p>
          <p>Category: <span className={s.desctiptionItem}>test6</span></p>
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