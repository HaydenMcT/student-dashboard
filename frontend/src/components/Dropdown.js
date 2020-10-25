import React, {useEffect, useState } from 'react'

function Dropdown ({ handleSelect }) {
    const [courses, setCourses] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        fetch('http://localhost:4001/getCourses')
            .then(res => res.json())
            .then(courses => setCourses(courses))
    }, [])

    useEffect(() => {
        if (courses.length > 0){
            const accessibleCourses = courses.filter(course => !course.access_restricted_by_date)
            setOptions(accessibleCourses.map(
                course => {
                    return <option key={course.id} value={course.id}>{course.name}</option>  
                }
            ))
            handleSelect(accessibleCourses[0].id)
        }
    }, [courses])

    function change(event) {
        handleSelect(event.target.value)
    }

    return (
        <label>
        Please select a course: 
        <select id='courses' onChange={change}>    
        {options}
        </select>
        </label>
    )

}

export default Dropdown