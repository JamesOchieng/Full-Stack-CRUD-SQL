import { useState, useEffect} from "react";
import {useNavigate, useParams,Link} from "react-router-dom"
import React from "react";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    name:"",
    email:"",
    contact:""
}


const AddEdit = () =>{
    
    const [state, setState] = useState(initialState);
    const {name, email,contact} = state;
    const history = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((resp)=>setState({...resp.data[0]}))
        
    },[id])

    const handleSubmit =(e) =>{
        console.log('handle sub');
        e.preventDefault();
        if(!name || !email || !contact){
            
            toast.error("Please provide value into each input field");
        }else{
            if(!id){
                axios.post("http://localhost:5000/api/post",{
                    name,email, contact
                }).then(()=>{
                    setState({name:"", email:"",contact:""});
    
                }).catch((err) => toast.error(err));
                toast.success("New user successfuly added");
                setTimeout(()=> history("/") , 500)
            }
            else{
                axios.put(`http://localhost:5000/api/update/${id}`,{
                name,email, contact
            }).then(()=>{
                setState({name:"", email:"",contact:""});

            }).catch((err) => toast.error(err));
            toast.success("Contact Updated");
            setTimeout(()=> history("/") , 500)
            }
            
        }
    }

    const handleInputChange =(e)=>{
        const {name ,value} = e.target;
        setState({ ...state, [name]: value});
    };

    return(
        // console.log('we are ruturning')
        <div style={{marginTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
            >
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                id="name"
                name="name"
                placeholder="Your Name ..."
                value={name || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
                <input 
                type="text" 
                id="email"
                name="email"
                placeholder="Your Email Address"
                value={email || ""}
                onChange={handleInputChange}
                />
                <label htmlFor="contact">Contact</label>
                <input 
                type="text" 
                id="contact"
                name="contact"
                placeholder="Your Contact Number"
                value={contact || ""}
                onChange={handleInputChange}
                />
                <input type="submit" value={id ? "update": "save"}/>
                <Link to="/">
                    <input type="button" value="Go Back"/>
                </Link>

            </form>
        </div>
    )
}


export default AddEdit;