import React from 'react'

const Button = ({active, children, handleClick}) => {
    return (
        <button
            className={active ? 'flex-1 border-b-2 border-mint' : 'flex-1'}
            disabled={active}
            onClick={handleClick}>
            {children}
        </button>
    )
}

export default Button