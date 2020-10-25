import React, {useEffect, useState } from 'react'

function Field ({ handleChange }) {

    function change(event) {
        console.log(event.target.value)
        handleChange(event.target.value)
    }

    return (
        <label>
        Enter your offset from current vancouver time: 
        <input type='int' onChange={change}>
        </input>
        </label>
    )

}

export default Field