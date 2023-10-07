import Products, { Product } from '@/models/Product';
import Users, { User } from '@/models/User';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: `.env.local`, override: true });
const MONGODB_URI = process.env.MONGODB_URI;

const products: Product[] = [
  {
    name: 'Earthen Bottle',
    price: 39.95,
    img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    description: 'What a bottle!',
  },
  {
    name: 'Nomad Tumbler',
    price: 39.95,
    img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    description: 'Yet another item',
  },
];

async function seed() {
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  const opts = {
    bufferCommands: false,
  };
  const conn = await mongoose.connect(MONGODB_URI, opts);

  await conn.connection.db.dropDatabase();

  const insertedProducts = await Products.insertMany(products);
  const user: User = {
    email: 'johndoe@example.com',
    password: '1234',
    name: 'John',
    surname: 'Doe',
    address: '123 Main St, 12345 New York, United States',
    birthdate: new Date('1970-01-01'),
    cartItems: [
      {
        product: insertedProducts[0]._id,
        qty: 2,
      },
      {
        product: insertedProducts[1]._id,
        qty: 5,
      },
    ],
    orders: [],
  };
  await Users.create(user); //This line allows to the user to be created. 
//   const res = await Users.create(user); If I want to show the user just created I need to put the const res, that way I can call res on the console.log 
//console.log(JSON.stringify(res, null, 2)); //THIS LINE WHAT DOES IS TO SHOW THE USER THATS BEEN CREATED. 


//  //  //  //  The code below shows all the information inside the user and populates to show all the information about product. // // //  //  /// 7//
/// ///     ///     ////    /// /// / /////// 
/// ///     ///     ////    /// /// / /////// 
/// ///     ///     ////    /// /// / /////// 
/// ///     ///     ////    /// /// / /////// 

// const retrievedUser = await Users
// .findOne({ email: 'johndoe@example.com' })
// .populate('cartItems.product'); // The populate extracts the informacion about the products inside the cartItems of the user. 

// console.log(JSON.stringify(retrievedUser, null, 2)); //This line shows us the users with the expresion in retrievedUser.



/// ///     ///     ////    /// /// / /////// /// ///     ///     ////    /// /// / /////// /// ///     ///     ////    /// /// / /////// 

//IF WE WANT TO SHOW SPECIFIC INFORMATION WE CREATE A PROJECTION OF THE OBJECT

const userProjection = { //THIS WAY WE GET FROM THE USER ONLY THE NAME AND THE SURNAME, ALSO THE ID BY DEFAULT. 
    name: true,
    surname: true,
  };

  const productProjection = { //THIS WAY WE GET FROM THE PRODUCT ONLY THE NAME AND THE PRICE, ALSO THE ID BY DEFAULT. 
    name: true,
    price: true,
  };

  const retrievedUser = await Users
    .findOne({ email: 'johndoe@example.com' }, userProjection)
    .populate('cartItems.product', productProjection);
  console.log(JSON.stringify(retrievedUser, null, 2));





  await conn.disconnect();
}

seed().catch(console.error);