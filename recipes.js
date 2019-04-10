const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



const catSchema = new Schema({
  title:  { type: String, required: true, unique:true },
  level:  { type: String, enum: ["Easy Peasy", "Amateur Chef",  "UltraPro Chef"] },
  ingredients:  {type: Array},
  cuisine:  { type: String, required: true},
  dishType:  { type: String, enum: [ "Breakfast" , "Dish" , "Snack" , "Drink" , "Dessert" , "Other"] },
  image:  { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator:  {type: String},
  created: {type: Date, default: Date.now},
  });

  const Cat = mongoose.model('data', catSchema);
module.exports = Cat;


// Crear un item
// Cat.create({ title: 'Carrot Cake', level:"Easy Peasy", cuisine: 'Italian' })
//   .then(Cat => { console.log('The user is saved and its value is: ', Cat) })
//   .catch(err => { console.log('An error happened:', err) });


// Crear varios items
  const cats = Array(10)
    .fill(0)
    .map((x, idx) => ({
      title: "gato numero " + idx,
      duration: Math.round((Math.random() * 4)+1),
      cuisine: "Spanish"
    }))
// Cat.insertMany(cats)
// .then((success) => {
//     console.log(success);
// })
// .catch((err) => {
//     console.log(err);
// })


//update 1
// Cat.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
// .then((success) => {
//   console.log(success);
// })
// .catch((err) => {
//   console.log(err);
// });

//Remove 1
// Cat.deleteOne({ title: "Carrot Cake"})
// .then(Cat => { console.log('Borrado ', Cat) })
//   .catch(err => { console.log('An error happened:', err) });

//Todo concatenado y cerrado

let promise1 = Cat.create({ title: 'Carrot Cake', level:"Easy Peasy", cuisine: 'Italian' });
let promise2 = Cat.insertMany(cats);
let promise3 = Cat.updateOne({ title: "Carrot Cake"}, { duration: 100 });
let promise4 =  Cat.deleteOne({ title: "Carrot Cake"});


Promise.all([promise1, promise2,promise3,promise4])
  .then(values => { 
    console.log("all has been changed");
    console.log(values);
    mongoose.connection.close();
  })
  .catch(err => console.error(err));