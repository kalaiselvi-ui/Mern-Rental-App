import React from 'react'
// import categories from '../data'
import { Link } from 'react-router-dom'
import '../Styles/categories.scss'
import { categories } from '../data'
import Heading from './Heading'

const Categories = () => {
    return (
        <div className='categories'>
            <Heading title='Explore Top Categories' />
            <p>Explore our wide range of vacation rentals that cater to all types of travelers. Immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination.</p>

            <div className='categories_list'>
                {
                    categories?.slice(1, 7).map((category, index) => (
                        <Link to={`/properties/category/${category.label}`} key={index} >
                            <div className='category'>
                                <img src={category.img} alt="" />
                                <div className='overlay'></div>
                                <div className='category_text'>
                                    <div className='category_text_icon'>
                                        {category.icon}
                                    </div>
                                    <p>{category.label}</p>
                                </div>
                            </div>
                        </Link>

                    ))
                }

            </div>

        </div>
    )
}

export default Categories