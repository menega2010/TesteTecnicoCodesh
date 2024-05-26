// import { Request, Response } from "express";

// export class BasicAuth {
//   private auth = require('basic-auth')
//   constructor() {}

//   public async mwBasicAuth(req: Request, res: Response, next: any) {
//     console.log("middleware: basic auth");
//     const user = await this.auth(req)
//     const username: string = 'teste'
//     const pass: string = '123456'
//     if(user && user.name.toLowerCase() ===  username.toLowerCase() && user.password === pass) {
//       console.log('Basic Auth: Sucess')
//       next();

//     } else {
//       console.log('Basic Auth: Failure')
//       res.statusCode = 401
//       console.log('Acess Denied')
//     }
//   }
// }
