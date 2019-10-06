const express = require('express')
var exphbs  = require('express-handlebars');
const path = require("path")




const app = express(); 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home' , {
        title : "Members App" , 
        members 
    });
});



// our static data 
const members = 
[
    {
        id : 1 , 
        name : "mohamed" , 
        mobile : 123456789 , 
        email : "mohamed@gmail.com" , 
        committe : "technical"
    },
    {
        id : 2 , 
        name : "kahled" , 
        mobile : 123456789 , 
        email : "kahled@gmail.com" , 
        committe : "technical"
    },
    {
        id : 3 , 
        name : "karim" , 
        mobile : 123456789 , 
        email : "karim@gmail.com" , 
        committe : "technical"
    },
    {
        id :4 , 
        name : "3baas" , 
        mobile : 123456789 , 
        email : "mohamed@gmail.com" , 
        committe : "technical"
    }
]


// middleware 
app.use(express.json()); 
app.use(express.urlencoded({extended : false}))

// get all members 
app.get("/api/members" , (req , res) => {
    res.json(members)
})

// get single member 
app.get("/api/members/:id" , (req , res) => {

    const found = members.some(member => member.id == parseInt(req.params.id))
    if (found)
    {
        res.json(members.filter(member => member.id == parseInt(req.params.id) ))

    }
    else 
    {
        res.status(400).json({massge : `no memeber with id ${req.params.id}`})
    }

})


// Create a Member
app.post("/api/members" , (req , res) =>
{
   const member = {
       id : Math.ceil(Math.random()*100)  , 
       name : req.body.name , 
       email : req.body.email , 
       mobile : req.body.mobile  , 
       committe : req.body.committe 
   }
   if (!member.name || !member.email || !member.mobile || !member.committe)
   {
       return res.status(400).json({msg : "please fill all data ^_^"}) 
   }
   members.push(member)
//    res.json(members)
res.redirect('/')
})

// update member 
app.put("/api/members/:id" , (req , res) => {

    const found = members.some(member => member.id == parseInt(req.params.id))
    if (found)
    {
        const updates = req.body 
       members.forEach(member => 
        {
             if (member.id === parseInt(req.params.id))
             {
                member.name = updates.name ? updates.name : member.name 

                member.email = updates.email ? updates.email : member.email

                member.mobile = updates.mobile ? updates.mobile : member.mobile

                member.committe = updates.committe ? updates.committe : member.committe

                 res.json({msg : "the member up to date" ,  member  }); 
             }
             
        })

    }
    else 
    {
        res.status(400).json({massge : `no memeber with id ${req.params.id}`})
    }

})


// delete member 

app.delete("/api/members/:id" , (req , res) => {

    const found = members.some(member => member.id == parseInt(req.params.id))
    if (found)
    {
        res.json({msg : "member deleted" , members: members.filter(member => member.id !== parseInt(req.params.id) )})

    }
    else 
    {
        res.status(400).json({massge : `no memeber with id ${req.params.id}`})
    }

})




// static folder 
app.use(express.static(path.join(__dirname , "htmls" )))


const port = process.env.port || 5000; 

app.listen(port , () => console.log(` our port is ${port}`))