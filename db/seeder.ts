import Products, { Product } from '@/models/Product';
import Users, { User } from '@/models/User';
import Orders, { Order } from '@/models/Order';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: `.env.local`, override: true });
const MONGODB_URI = process.env.MONGODB_URI;

const products: Product[] = [
  {
    name: 'Shelby Mustang 2020 ',
    price: 120000,
    img: '',
    description: '',
  },
  {
    name: 'Porche 911',
    price: 300000,
    img: '',
    description: '',
  },
];

// const orders: Order[] = [
//   {
//     address: 'Albacetee',
//     date: 10,
//     cardHolder: '83294709238',
//     cardNumber: '2374982374',
//   }



// ];

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

  //Practica 1 
  //  // ////  // // //  // //We create the empty collections if they don´t exist  //  // ////  // ////  // ////  // //
//  // ////  // ////  // //   for the users and the products.                     //  // ////  // ////  // ////  // //


  await Users.createCollection();
  await Products.createCollection();



  //Fin Practica 

  //We clear the data base. 

  await conn.connection.db.dropDatabase();

  //This inserts into the data base the products
  const insertedProducts = await Products.insertMany(products);
  //const insertedOrders = await Orders.insertMany(orders);

  //Now we start the Users creation. 

  const user: User = {

    email: 'johnDoe@example.com',
    password: '1234',
    name: 'John',
    surname: 'Doe',
    address: '123 Main St, 12345 New York, United States',
    birthdate: new Date('1970-01-01'),
    cartItems: [
      {
        product: insertedProducts[0]._id,
        qty: 1,
      },
      {
        product: insertedProducts[1]._id,
        qty: 1,
      },
    ],
    // orders: [
      
    //      insertedOrders[0]._id,
      
      
      
    // ],
  };

   //This line inserts the user.  

  await Users.create(user);

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
    .findOne({ email: 'johnDoe@example.com' }, userProjection)
    .populate('cartItems.product', productProjection);
  console.log(JSON.stringify(retrievedUser, null, 2));





  await conn.disconnect();
}

seed().catch(console.error);