
const mongoose = require('mongoose')
if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
  }
  
const url = process.env.MONGODB_URI

//const url = 'mongodb://fullstack:sekred1@ds063769.mlab.com:63769/puhelinluettelo'
mongoose.connect(url)
mongoose.Promise = global.Promise

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String
})

personSchema.statics.format = function(person) {
    return {
        name: person.name,
        number: person.number,
        id: person._id
      }
  };

const Person = mongoose.model('Person', personSchema);

module.exports = Person