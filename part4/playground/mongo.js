require('dotenv').config()
const mongoose = require('mongoose')

if (!process.env.TEST_MONGODB_URI || !process.env.MONGODB_URI) {
  console.error('set mongodb url in .env file')
  process.exit(1)
}

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   date: new Date(),
//   important: false,
// })

const note = new Note({
  content: 'Mongoose makes things easy',
  date: new Date(),
  important: true,
})

note.save().then(() => {
  console.log('note saved!')
  mongoose.connection.close()
})


// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })