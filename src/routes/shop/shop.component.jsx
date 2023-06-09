import { useContext } from 'react';
import './shop.styles.scss';
import { ProductsContext } from '../../context/products.context';
import ProductCard from '../../components/product-card/product-card.component';


const Shop = () => {

    const {products} = useContext(ProductsContext)
     console.log(products);
    return(
        <div className='shop-container'>
            {
                products.map(product=>(
                    <ProductCard key={product.id} product={product}/>
                ))
            }
        </div>
    )
}

export default Shop;