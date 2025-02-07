import React from 'react'
import '../Styles/heading.scss'

const Heading = ({ title, subtitle }) => {
    return (
        <div>
            {title && <h1> {title}</h1>}
            {subtitle && <h3> {subtitle}</h3>}
        </div>
    )
}

export default Heading