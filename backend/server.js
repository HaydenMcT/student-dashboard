const express = require('express')
const app = express()
const cors = require('cors')
const port = 4001
const canvasAPI = require('node-canvas-api')
const { getDiscussions, flattenTopicAndReplies } = require('./canvasDiscussions')
const readCSV = require('./readCSV')
const getCoursesByUser = require('node-canvas-api/src/getCoursesByUser')

app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

// Make API call to Canvas API here
canvasAPI.getSelf()
  .then(self => console.log(self))

// Make endpoint for getSelf here
app.get('/getSelf', async (req, res) => {
    res.json(await canvasAPI.getSelf())
})

// Make endpoint for getDiscussions here
app.get('/getDiscussions', async (req, res) => {
    const discussions = await getDiscussions(69306)
    flatDiscussions = flattenTopicAndReplies(discussions)
    res.json(flatDiscussions)
})

app.get('/getDiscussions/:id', async (req, res) => {
    const courseID = req.params.id
    const discussions = await getDiscussions(courseID)
    const flatDiscussions = flattenTopicAndReplies(discussions)
    res.json(flatDiscussions)
})

app.get('/getCourses', async (req,res) => {
    const self = await canvasAPI.getSelf()
    const id = self["id"]
    res.json(await canvasAPI.getCoursesByUser(id))
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
