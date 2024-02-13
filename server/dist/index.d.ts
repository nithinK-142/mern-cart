declare module 'server/common/errors' {
  export enum ProductErrors {
      NO_USERS_FOUND = "no-users-found",
      NO_PRODUCT_FOUND = "no-product-found",
      NO_AVAILABLE_MONEY = "no-available-money",
      NOT_ENOUGH_STOCK = "not-enough-stock"
  }
  export enum UserErrors {
      NO_USER_FOUND = "no-user-found",
      WRONG_CREDENTIALS = "wrong-credentials",
      USERNAME_ALREADY_EXISTS = "username-already-exists"
  }

}
declare module 'server/index' {
  export {};

}
declare module 'server/models/product' {
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/aggregate" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/callback" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/collection" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/connection" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/cursor" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/document" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/error" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/expressions" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/helpers" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/middlewares" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/indexes" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/models" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/mongooseoptions" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/pipelinestage" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/populate" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/query" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/schemaoptions" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/schematypes" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/session" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/types" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/utility" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/validation" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/virtuals" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/inferschematype" />
  export interface IProduct {
      productName: string;
      price: number;
      description: string;
      imageURL: string;
      stockQuantity: number;
  }
  export const ProductModel: import("mongoose").Model<IProduct, {}, {}, {}, import("mongoose").Document<unknown, {}, IProduct> & IProduct & {
      _id: import("mongoose").Types.ObjectId;
  }, any>;

}
declare module 'server/models/user' {
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/aggregate" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/callback" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/collection" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/connection" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/cursor" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/document" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/error" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/expressions" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/helpers" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/middlewares" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/indexes" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/models" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/mongooseoptions" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/pipelinestage" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/populate" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/query" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/schemaoptions" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/schematypes" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/session" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/types" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/utility" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/validation" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/virtuals" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types" />
  /// <reference types="f:/repo/mern-cart/server/node_modules/mongoose/types/inferschematype" />
  export interface IUser {
      _id?: string;
      username: string;
      password: string;
      availableMoney: number;
      purchasedItems: string[];
  }
  export const UserModel: import("mongoose").Model<IUser, {}, {}, {}, import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
      _id: string;
  }>, any>;

}
declare module 'server/routes/product' {
  const router: import("express-serve-static-core").Router;
  export { router as productRouter };

}
declare module 'server/routes/user' {
  import { Request, Response } from "express";
  const router: import("express-serve-static-core").Router;
  export const verifyToken: (req: Request, res: Response, next: any) => Response<any, Record<string, any>>;
  export { router as userRouter };

}
declare module 'server' {
  import main = require('server/src/index');
  export = main;
}