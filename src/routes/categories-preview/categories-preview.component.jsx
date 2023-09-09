import React from 'react'
import { useContext } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';


const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext)
    //  console.log(products);
    return(
        <div className='categories-preview-container'>
        {
            Object.keys(categoriesMap).map(title =>{
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products = {products}/>
                )
            })
        }
        
        </div>
        
    )
}

export default CategoriesPreview;
