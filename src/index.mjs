import express from "express";

const app = express();
const mockUser = [
    {id:1 , username:"sokleang" , displayname:"sokleang"},
    {id:2 , username:"sokkim" , displayname:"sokkim"},
    {id:3 , username:"soklong" , displayname:"soklong"},
    {id:4 , username:"sokleab" , displayname:"sokleab "},
    {id:5 , username:"soklam" , displayname:"soklam"}
];

const PORT = process.env.PORT || 3004;

app.get("/",(request,response)=>{
    response.status(201).send({msg:`Hello`})
})
app.get("/api/users",(request,response)=>{
    console.log(request.query);
    const {query:{filter , value},} = request;
    
    // filter and value is underfined
    if(!filter &&! value) return response.status(201).send(mockUser);
})
app.get("/api/users/:id",(request,response)=>{
    // response.status(201).send(mockUser);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if(isNaN(parsedId)) return response.status(400).send({msg:`Bad Request. Invalid Id`});

    const findUser = mockUser.find((user)=>user.id === parsedId);
    // if(!findUser) return response.send(`User not found`);
    if(!findUser) return response.sendStatus(404);
    return response.send(findUser);

    
})


app.get('/api/products',(request, response)=>{
    response.status(201).send([
        {id:162532 , name:"iphone16promax", price:1600 },
        {id:162 , name:"iphone16", price:1600 },
        {id:1532 , name:"iphone16pro", price:1600 },
        {id:2532 , name:"iphone16mini", price:1600 },
    ])
})

app.listen(PORT ,()=>{
    console.log(`app is running on port:${PORT}`);
    
})
