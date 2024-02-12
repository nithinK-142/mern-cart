import{config as E}from"dotenv";import N from"express";import b from"cors";import T from"mongoose";import{Router as I}from"express";import O from"jsonwebtoken";import _ from"bcrypt";import{Schema as l,model as U}from"mongoose";var h=new l({username:{type:String,required:!0,unique:!0},password:{type:String,required:!0},availableMoney:{type:Number,default:5e3},purchasedItems:[{type:l.Types.ObjectId,ref:"product",default:[]}]}),n=U("user",h);var i=I();i.post("/register",async(o,e)=>{let{username:s,password:r}=o.body;try{if(await n.findOne({username:s}))return e.status(400).json({type:"username-already-exists"});let a=await _.hash(r,10);await new n({username:s,password:a}).save(),e.json({message:"User Registration Complete!"})}catch(t){e.status(500).json({type:t})}});i.post("/login",async(o,e)=>{let{username:s,password:r}=o.body;try{let t=await n.findOne({username:s});if(!t)return e.status(400).json({type:"no-user-found"});if(!await _.compare(r,t.password))return e.status(400).json({type:"wrong-credentials"});let u=O.sign({id:t._id},"secret");e.json({token:u,userID:t._id})}catch(t){e.status(500).json({type:t})}});var c=(o,e,s)=>{let r=o.headers.authorization;if(r)O.verify(r,"secret",t=>{if(t)return e.sendStatus(403);s()});else return e.sendStatus(401)};i.get("/available-money/:userID",c,async(o,e)=>{let{userID:s}=o.params;try{let r=await n.findById(s);if(!r)return e.status(400).json({type:"no-user-found"});e.json({availableMoney:r.availableMoney})}catch(r){e.status(500).json({type:r})}});import{Router as j}from"express";import{Schema as g,model as w}from"mongoose";var D=new g({productName:{type:String,required:!0},price:{type:Number,required:!0,min:[1,"Prce should be more than 1"]},description:{type:String,required:!0},imageURL:{type:String,required:!0},stockQuantity:{type:Number,required:!0,min:[0,"Stock can't be lower than 0"]}}),p=w("product",D);var d=j();d.get("/",c,async(o,e)=>{try{let s=await p.find({});e.json({products:s})}catch(s){e.status(400).json({err:s})}});d.post("/checkout",c,async(o,e)=>{let{customerID:s,cartItems:r}=o.body;try{let t=await n.findById(s),a=Object.keys(r),u=await p.find({_id:{$in:a}});if(!t)return e.status(400).json({type:"no-users-found"});if(u.length!==a.length)return e.status(400).json({type:"no-product-found"});let y=0;for(let R in r){let f=u.find(S=>String(S._id)===R);if(!f)return e.status(400).json({type:"no-product-found"});if(f.stockQuantity<r[R])return e.status(400).json({type:"not-enough-stock"});y+=f.price*r[R]}return t.availableMoney<y?e.status(400).json({type:"no-available-money"}):(t.availableMoney-=y,t.purchasedItems.push(...a),await t.save(),await p.updateMany({_id:{$in:a}},{$inc:{stockQuantity:-1}}),e.json({purchasedItems:t.purchasedItems}))}catch(t){return console.error("Server Error:",t),e.status(500).json({error:"Internal Server Error"})}});d.get("/purchased-items/:customerID",c,async(o,e)=>{let{customerID:s}=o.params;try{let r=await n.findById(s);if(!r)return e.status(400).json({type:"no-users-found"});let t=await p.find({_id:{$in:r.purchasedItems}});e.json({purchasedItems:t})}catch(r){e.status(500).json({type:r})}});E();var m=N(),v=process.env.PORT||3001;m.use(N.json());m.use(b({origin:[`${process.env.URL}`],methods:["POST","GET"],credentials:!0}));m.use("/user",i);m.use("/product",d);var M=async()=>{try{await T.connect(`${process.env.MONGODB_URL}`),console.log("MongoDB connected")}catch(o){console.error(`ERROR: ${o}`)}};M();m.listen(v,()=>console.log("SERVER STARTED"));
