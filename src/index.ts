import express from "express"
import path from "path"
import { getAllCharacters, getAllStudents, getAllTeachers, getCharacter } from "./models/characters.model"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

const staticPath = app.use(express.static(path.join(__dirname, "../public")))

app.get("/", (_, res) => {
  return res.sendFile("/index.html", { root: staticPath })
})

// GET
app.get("/api/v1/characters", async (_, res) => {
  const characters = await getAllCharacters()

  return res.json(characters)
})

app.get("/api/v1/character/:id", async (req, res) => {
  const { id } = req.params

  const character = await getCharacter(parseInt(id))

  if (!character) {
    return res.status(404).json({
      status: res.statusCode,
      message: "character not found",
    })
  }

  return res.json(character)
})

app.get("/api/v1/students", async (_, res) => {
  const students = await getAllStudents()

  return res.json(students)
})

app.get("/api/v1/teachers", async (_, res) => {
  const students = await getAllTeachers()

  return res.json(students)
})

// 404
app.get("*", (_, res) => {
  return res.status(404).json({
    status: res.statusCode,
    message: "page not found",
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
