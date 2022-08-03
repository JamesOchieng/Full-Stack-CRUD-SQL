const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Patri$ia1994",
    database: "crud_contact"
})

app.get("/api/get",(req,res)=>{
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (err,result)=>{
        console.log(err);
        
        
        res.send(result);
        
    })
})

app.post("/api/post", (req,res)=>{
    const {name,email,contact}  = req.body;
    const sqlInsert = 
    "INSERT INTO contact_db(fullName,email,contact) VALUES (?,?,?)";
    db.query(sqlInsert , [name,email,contact] , (err,result)=>{
        console.log(err);
        console.log(result);
        
    })
})

app.delete("/api/remove/:id", (req,res)=>{
    const {id}  = req.params;
    const sqlDelete = 
    "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlDelete , id , (err,result)=>{
        console.log(err);
        console.log(result);
        
    })
})

app.get("/api/get/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = `SELECT * FROM contact_db WHERE id =?`;
    db.query(sqlGet, id ,(err,result)=>{
        console.log(err);
        
        
        res.send(result);
        
    })
})

app.put("/api/update/:id", (req,res)=>{
    const {id}  = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = 
    "UPDATE contact_db SET fullName = ?, email=?, contact=? WHERE id = ? ";
    db.query(sqlUpdate , [name,email,contact,id] , (err,result)=>{
        console.log(err);
        console.log(result);
        
    })
})

app.get("/", (req,res) =>{
    // const sqlInsert = "INSERT INTO contact_db(fullName, email,contact) VALUES('james','james@gmail.com',12345)";

    // db.query(sqlInsert, (err,result)=>{

    //     console.log("error", err);
    //     console.log("result", result);
    //     res.send("hello world")
    // })

});

app.listen(5000,()=>{
    console.log('server is listining to port 5000')
})