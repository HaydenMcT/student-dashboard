import React, { useState, useEffect } from 'react'
import Heatmap from './Heatmap'
import Dropdown from './Dropdown'
import Field from './Field'

function Discussion () {
  const [selected, setSelected] = useState(null)
  const [timeZone, setTimeZone] = useState(0)
  const [discussion, setDiscussion] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [loaded, setLoaded] = useState(false)

  // add useEffect here for discussion
  useEffect(() => {
    if (selected) {
      setLoaded(false)
      fetch(`http://localhost:4001/getDiscussions/${selected}`)
      .then(res => res.json())
      .then((data) => {
        setDiscussion(data)
        setLoaded(true)
      })
  }
  }, [selected])

  useEffect(() => {
    if (discussion.length > 0) {
      setLoaded(false)
      const discussionTimestamps = discussion
        .map(discussion => discussion.timestamp)

      setTimestamps(discussionTimestamps)
      setLoaded(true)
    }
  }, [discussion, timeZone])

  return (
    <div>
    < Dropdown handleSelect={setSelected}/>
    <br />
    < Field handleChange={setTimeZone} />
    {loaded ? <Heatmap timestamps={timestamps} timeOffset={timeZone}/> : <div>Loading ...</div>}
    </div>
  )
}

export default Discussion
