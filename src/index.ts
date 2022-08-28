import express from "express"
import path from "path"
import { getAllCharacters, getCharacter } from "./models/characters.model"

const app = express()
const PORT = process.env.PORT || 3000

const staticPath = app.use(express.static(path.join(__dirname, "../public")))

app.get("/", (_, res) => {
  return res.sendFile("/index.html", { root: staticPath })
})

app.get("/api/characters", async (_, res) => {
  const characters = await getAllCharacters()

  return res.json(characters)
})

app.get("/api/character/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
