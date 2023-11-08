const mongoose = require('mongoose')
require('dotenv').config()

if (!process.env.MONGO_USERNAME || !process.env.MONGO_PASSWORD) {
  console.log('set username and password in .env file')
  process.exit(1)
}

const url =
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@homebrew.gbcyj2u.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'TEST',
//   important: false,
// })

// note.save().then(result => {
//   console.log('note saved!', result)
//   mongoose.connection.close()
// })


Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})