import Products, { Product } from '@/models/Product';
import connect from '@/lib/mongoose';
import Users, { User } from '@/models/User';
import { Types } from 'mongoose';
//import User from '@/models/User';



/////    /////////////////   FOR THE USER ////  //////   //////      ///////   


/////  //////       //////   GET USER BY ID  ////// /////   ////   ////   //// 
/////  //////       REST APPI endpoint for the GET of user by his ID   ////// /////   ////
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //


export interface UserResponse {
    email: string;
    name: string;
    surname: string;
    address: string;
    birthdate: Date;
  }
  
  export async function getUser(userId: string):  Promise<UserResponse | null> {
    await connect();
  
    const userProjection = {
      email: true,
      name: true,
      surname: true,
      address: true,
      birthdate: true,
    };
    const user = await Users.findById(userId, userProjection);
  
    if (user === null) {
      return null;
    }
  
    return user;
  }

////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
/////  //////       ////// POST  USER ////// /////   ////   ////   //// 
/////  //////       REST APPI endpoint for the POST of the users   ////// /////   ////
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //

export interface CreateUserResponse {
    _id: Types.ObjectId | string;
  }
  
  export async function createUser(user: {
    email: string;
    password: string;
    name: string;
    surname: string;
    address: string;
    birthdate: Date;
  }): Promise <CreateUserResponse | null > {
    await connect();
  
    const prevUser = await Users.find({ email: user.email });
  
    if (prevUser.length !== 0) {
      return null;
    }
  
    const doc: User = {
      ...user,
      birthdate: new Date(user.birthdate),
      cartItems: [],
      orders: [],
    };
  
    const newUser = await Users.create(doc);
  
    return {
      _id: newUser._id,
    };
  }

////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
  /////  //////       //////   CART ITEMS  ////// /////   ////   ////   //// 
/////  //////   REST APPI endpoint for the GET of cart items by the ID of an User  ////// /////   ////   ////   ////  
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //


export interface CartItemsResponse {
  cartItems: {
    product: {
      _id: Types.ObjectId | string;
      name: string;
      price: number;
    };
    qty: number;
  }[];
}

export async function getCartItems(userId: string): Promise<CartItemsResponse | null> {
  await connect();
  
  const userProjection = {
    _id:false, 
    cartItems: {
      product: true,
      qty: true,
    }
  }
  const productProjection = { 
    name: true, 
    price: true, 
  }; 

  const cartItems = await Users
  .findOne({ _id: userId }, userProjection)
  .populate('cartItems.product', productProjection)

  return cartItems;
}


////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
/////  //////       ////// PUT  PRODUCT ID  ////// /////   ////   ////   //// 
//  REST APPI endpoint for the PUT of the PRODUCT( Modify the cartItem to modify the cuantity of a product)   ////// /////   ////
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //

export interface UpdateCartResponse {
  cartItems: Types.ObjectId[];
  createdOrUpdated : boolean;
}

export async function UpdateCartItem(
  userId: string,
  productId: string,
  qty: number
): Promise<UpdateCartResponse | null> {
  await connect();

  
  var createdOrUpdated = false;
  const user = await Users.findById(userId);
  
  //To manage the user if doesn't exist.
  if (user === null) {
    return null;
  }


  const cartItem = user.cartItems.find((cartItem: any) =>
    cartItem.product._id.equals(productId)
  );


  if (cartItem) {
    cartItem.qty = qty;
  } else {
    createdOrUpdated = true;
    const newCartItem = {
      product: new Types.ObjectId(productId),
      qty: qty,
    };
    user.cartItems.push(newCartItem);
  }
  await user.save();


  

  //With this I return to the method PUT in route.ts also the variable CreatedorUpdated.
  const updateResponse: UpdateCartResponse = {
    cartItems: user.cartItems.map((item: any) => item.product),
    createdOrUpdated, // Include the CreatedorUpdated variable in the response.
  };


  
  return updateResponse;


  //return (updateUser);
}


////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
/////  //////       ////// DELETE PRODUCT ////// /////   ////   ////   //// 

//  REST APPI endpoint for the DELETE of the PRODUCT   ////// /////   ////
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //

export interface deleteProductResponse{
  cartItems: {
    product: {
      _id: Types.ObjectId | string;
      name: string;
      price: number;
    };
    qty: number;
  }[];
}


export async function deleteProduct(userId: string, productId: string): Promise<deleteProductResponse | null> {
  await connect();

    
    const updatedCart = await Users.findByIdAndUpdate(
      userId,
      {
        $pull: { cartItems: { product: productId } }, //WITH pull we extract the product from the cartItems 
      }
    );

    if(updatedCart=== null){

      return null;
    }

  

  return updatedCart;
    
}



  

////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
/////  //////       //////   PRODUCTS ////// /////   ////   ////   //// 


/////  //////       //////   GET PRODUCT BY ID  ////// /////   ////   ////   //// 
/////  //////       REST APPI endpoint for the GET of product by his ID   ////// /////   ////
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //

export interface productResponse {
  name: string;
  price: number;
  img : string;
  description : string;
}

export async function getProduct(productId: string):  Promise<productResponse | null> {
  await connect();

  const productProjection = {
    name: true,
    price: true,  
    img : true,
    description : true,
  };

  const product = await Products.findById(productId, productProjection);

  if (product === null) {
    return null;
  }

  return product;
}



////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
/////  //////       REST APPI endpoint for the GET products  ////// /////   ////
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //

export interface ProductsResponse {
  products: Product[];
}

export async function getProducts():  Promise<ProductsResponse> {
  await connect();

  const productProjection = {
    name: true,
    price: true,
    img: true,
  };

  const products = await Products.find({}, productProjection);
  
  return {
    products: products,
  };


}

////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
/////  //////       REST APPI endpoint for the GET USERS  ////// /////   ////
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //
////  //////  ///// //////     /////    ////  ///// /////   ///// ////  //////  ///// //////     //

export interface UsersResponse {
  users: User[];
}

export async function getUsers():  Promise<UsersResponse> {
  await connect();

  const userProjection = {
    email: true,
    name: true,
    surname: true,
    address: true,
    birthdate: true,
  };

  const users = await Users.find({}, userProjection);
  
  return {
    users: users,
  };


}