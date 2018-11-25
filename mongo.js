const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://fullstack:sekred1@ds063769.mlab.com:63769/puhelinluettelo'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

const person = new Person({
  _id:"12421",
  name: "Testi2",
  number: "23425635"
})

person
  .save()
  .then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })

Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
