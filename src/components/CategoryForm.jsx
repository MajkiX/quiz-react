import React from 'react';
import bemCssModules from 'bem-css-modules'

import { default as CategoryFormStyle } from './styleModules/CategoryForm.module.scss'

const style = bemCssModules(CategoryFormStyle)

const CategoryForm = (props) => {
    const { categoryArray, handleSetCategory } = props

    const categoryForm = categoryArray.map(category => (
        <label key={category.id} htmlFor={category.id}>
            <input
                onChange={(e) => handleSetCategory(e.target.value)}
                type="radio"
                name='categoryForm'
                value={category.id}
                id={category.id}
            />
            {category.name}
        </label>
    ))

    return (
        <div>
            <form className={style()}>
                <label htmlFor="any">
                    <input
                        onChange={(e) => handleSetCategory(e.target.value)}
                        type="radio"
                        name="categoryForm"
                        value={''}
                        id="any"
                    />
                    Any
                </label>
                {categoryForm}
            </form>
        </div>
    );
}

export default CategoryForm;