import React from 'react'

export default (props) => {
    return (
        <button type="button" onClick={props.function} className={props.class}>{props.text}</button>
    )
}