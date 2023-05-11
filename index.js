const express = require('express');
const app = express();
const path = require('path');

app.set('views', './views');
app.use(express.urlencoded({ extended: true }));

app.use('/product', express.static('public/images'));

// Available services 
const services = [
    'web development', 'App development', 'Game development',
    'Cloud computing', 'Termux' , 'Metasploit framework'
];


// routes
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/home.html'));
})
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/contact.html'));
})
app.get('/product',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/product.html'))
})
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/about.html'))
})
app.get('/user',(req,res)=>{
    res.sendFile(path.join(__dirname + '/public/user.html'))
})
// middleware function for dynamic file
app.get('/service/:id', (req, res, next) => {
    const number = req.params.id;
    serviceName=services[number-1]
    const data = {
        title: 'Service Name',
        serviceName: serviceName,
        seviceNum:number
    };
    // data transfering....
    res.render('index', {data});
    next()
});
app.get("/new", (req,res)=>{
    res.send (`
    <html>
        <head>
            <title>
                sign-up page
            </title>
            <style>
        body{
            display: block;
            margin-top: 50px;
            heigth : 50px;
        }
        .container{
            display: flex;
            justify-content: center;
            margin-left : 450px;
            margin-top : 150px;
            width : 400px;
            border: 2px solid black;
            border-radius: 10px;
            padding: 10px ;
            box-shadow: 7px 10px 5px gray;
        }
        form{
            border: 2px solid black;
            border-radius: 10px;
            padding : 20px;
        }
        input{
            margin-bottom : 10px;
        }
        button{
            margin-left : 80px;
        }
        h1{
            text-align: center;
        }
    </style>
        </head>
        <body>
        <div class = 'container'>
            <div class='content'>
            <h1> user details </h1>
                <form method='post' action='/answer'>
                    name:<input type='text',placeholder='enter your name' name='user' /><br>
                    age:<input type='number',placeholder='enter your age' name='age' /><br>
                    <button>submit</button>
                </form>
            </div> 
            </div>  
        </body>
    </html>
    `)
})// port listening.....

app.post("/answer", (req,res)=>{
    const name = req.body.user
    const age = req.body.age
    const data1 = [
        Name = name,
        Age = age
    ]
    res.render('form',{data1})
})// port listening.....
app.listen(3000, () => {
  console.log('App gets started to running on the port 3000');
});



