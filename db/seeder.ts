import Products, { Product } from '@/models/Product';
import Users, { User } from '@/models/User';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


dotenv.config({ path: `.env.local`, override: true });
const MONGODB_URI = process.env.MONGODB_URI;

const products: Product[] = [
  {
    name: 'Shelby Mustang 2020 ',
    price: 120000,
    img: 'https://cdn.topgear.es/sites/navi.axelspringer.es/public/media/image/2022/08/shelby-ford-mustang-code-red-2791485.jpg',
    description: "By definition, the GT500 isn't an exotic car, but really, it is. How else could you describe a car that has a supercharged 5.2-liter V8 making 760 hp and 625 lb-ft of torque, all channeled through a seven-speed dual-clutch transmission and on to the rear wheels? A top speed of 180 mph. A 0-60-mph time of 3.3 seconds.",
  },
  {
    name: 'Porche 911',
    price: 300000,
    img: 'https://img.remediosdigitales.com/812496/s22_3365_fine/1366_2000.jpeg',
    description: "The Porsche 911 (pronounced Nine Eleven or in German: Neunelf) is a two-door 2+2 high performance rear-engined sports car introduced in September 1964 by Porsche AG of Stuttgart, Germany. It has a rear-mounted flat-six engine and originally a torsion bar suspension.",
  },
  {
  name: 'Ferrari sf90',
  price: 1500000,
  img: 'https://hips.hearstapps.com/hmg-prod/images/ferrari-sf90-stradale-by-novitec-2022-1-1657022038.jpg',
  description: '',
  },
{
  name: 'Maserati Alfieri',
  price: 150000,
  img: 'https://robbreport.mx/wp-content/uploads/2019/04/maserati-1024x768-1.jpg',
  description: 'Without a doubt, an extraordinary sports car. It has a power of 3.0 liter twin-turbo V6 base tune and around 410 horsepower. The price ranges from $70,000 to $150,000.',
  },
{
  name: 'Ferrari 458 Speciale',
  price: 150000,
  img: 'https://d1gl66oyi6i593.cloudfront.net/wp-content/uploads/2020/12/ferrari-458-speciale-blindado-2.jpg',
  description: 'Without a doubt, an extraordinary sports car. It has a power of 3.0 liter twin-turbo V6 base tune and around 410 horsepower. The price ranges from $70,000 to $150,000.',
  },
{
  name: 'McLaren 720s',
  price: 720000,
  img: 'https://64.media.tumblr.com/5c6d8b3822a18bee398a368d412e753c/2075793921f169ca-a8/s1280x1920/4f3775a768751e8d0b483da2cfaac941ff3212fd.jpg',
  description: 'The McLaren 720S is bold and radical, with responses like a super predator. Accelerate from 0 to 96 km/h in an incredible 2.8 seconds if you provoke it. And it can travel 400 meters in 10.4 seconds from a static start.',
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
  //Lo mismo que lo anterior
  // await Users.createCollection();
  // await Products.createCollection();
  
  const insertedProducts = await Products.insertMany(products);    //this returns that array of created documents
  //Now we start the Users creation. 

  const user: User = {
    email: 'Carlos.Alcantud@example.com',
    password: await bcrypt.hash('1234', 10),
    name: 'Carlos',
    surname: 'Alcantud',
    address: '150 Central Park S New York, 10019 United States',
    birthdate: new Date('1998-08-10'),
    cartItems: [
      {
        product: insertedProducts[0]._id,
        qty: 2,
      },
    ],
    orders: []
  };

  const user2: User = {
    email: 'Simina.Ciui@example.com',
    password: await bcrypt.hash('0000', 10),
    name: 'Simina',
    surname: 'Ciui',
    address: '123 Main St, 12345 New York, United States',
    birthdate: new Date('1970-01-01'),
    cartItems: [
      {
        product: insertedProducts[1]._id,
        qty: 1,
      },
    ],
    orders: []
  };

   //This line inserts the user.  

  await Users.create(user);
  await Users.create(user2);

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
    .findOne({ email: 'Carlos.Alcantud@example.com' }, userProjection)
    .populate('cartItems.product', productProjection);
  console.log(JSON.stringify(retrievedUser, null, 2));

  await conn.disconnect();
}

seed().catch(console.error);