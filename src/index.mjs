import express from "express";

const app = express();
app.use(express.json())
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

// this include filter 
app.get("/api/users",(request,response)=>{
    console.log(request.query);
    const {query:{filter , value},} = request;
    if(filter&&value) return response.send(
        mockUser.filter((user)=>user[filter].includes(value))
    );
    return response.send(mockUser);
})

//params users 
app.get("/api/users/:id",(request,response)=>{
    // response.status(201).send(mockUser);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if(isNaN(parsedId)) return response.status(400).send({msg:`Bad Request. Invalid Id`});

    const findUser = mockUser.find((user)=>user.id === parsedId);
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

//method Post 
app.post('/api/users',(request, response)=>{
    console.log(request.body);
    const{body} = request;
    const newUser = {id:mockUser[mockUser.length-1].id+1,...body}
    mockUser.push(newUser);
    return response.status(201).send(newUser);
})

// method patch 
app.put('api/users/:id',(request,response)=>{
    const {body , params:{id}}=request;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUser.findIndex((user)=>user.id === parsedId);

    if(findUserIndex ===-1) return response.sendStatus(404);
    mockUser[findUserIndex] = {id:parsedId , ...body};
    return response.sendStatus(200);
})

//method delete 
app.delete('/api/users/:id',(request, response)=>{
    const { params:{id}}=request;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUser.findIndex((user)=>user.id === parsedId);
    if(findUserIndex ===-1) return response.sendStatus(404);
    mockUser.splice(findUserIndex ,1)
    //1 the number count to delete if no it will start from input to all number 
    return response.sendStatus(200);
})

app.listen(PORT ,()=>{
    console.log(`app is running on port:${PORT}`);
    
})
