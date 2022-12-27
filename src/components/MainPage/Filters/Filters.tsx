import { useEffect, useState } from 'react';

import s from './Filters.module.css';
import { Button } from './Button/Button';
import { FilterBlock } from './FilterBlock/FilterBlock';
import { RangeBlock } from './RangeBlock/RangeBlock';

import { ProductsState } from '../../../redux/products/productsSlice';

interface IFiltersInterface {
  store: ProductsState;
  selectedCategories: string[];
  onChangeCategory: (category: string) => void;
  onChangeBrands: (category: string, reset?: boolean) => void;
  onChangePrice: (number: number[]) => void;
  onChangeStock: (number: number[]) => void;
  resetFilter: () => void;
}

export const Filters = ({
  store,
  selectedCategories,
  onChangeCategory,
  onChangeBrands,
  onChangePrice,
  onChangeStock,
  resetFilter,
}: IFiltersInterface) => {
  const [categories, setCategories] = useState<Set<string>>(new Set());
  const [brands, setBrands] = useState<Set<string>>(new Set());

  useEffect(() => {
    const tmpSet = new Set<string>();
    store.products.forEach((product) => {
      setCategories((set) => set.add(product.category));
      if (selectedCategories.length !== 0) {
        selectedCategories.forEach((category) => {
          if (product.category.toLowerCase().includes(category.toLowerCase())) {
            tmpSet.add(product.brand);
          }
        });
        setBrands(tmpSet);
      } else {
        setBrands((set) => set.add(product.brand));
      }
    });
  }, [store, selectedCategories]);

  return (
    <div className={s.filterContent}>
      <div className={s.buttonsWrapper}>
        <Button name='Reset Filters' callback={resetFilter} />
        <Button name='Copy Link' />
      </div>
      <div className={s.filtersWrapper}>
        <FilterBlock title='Category' data={Array.from(categories)} onChangeFn={onChangeCategory} />
        <FilterBlock title='Brand' data={Array.from(brands)} onChangeFn={onChangeBrands} />
        <RangeBlock
          title='Price'
          from={store.minPrice}
          to={store.maxPrice}
          onChange={onChangePrice}
          initMax={store.initMaxPrice}
        />
        <RangeBlock
          title='Stock'
          from={store.minStock}
          to={store.maxStock}
          onChange={onChangeStock}
          initMax={store.initMaxStock}
        />
      </div>
    </div>
  );
};
