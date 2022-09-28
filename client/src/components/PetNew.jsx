import axios from "axios";
import React, {useState} from 'react';
import Link from '@mui/material/Link';
import {useNavigate} from 'react-router-dom'
import { ButtonGroup, FormControl, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ".//styles/PetNew.css";


const PetNew = () => {
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [name, setName] = useState("")
    const [skills1, setSkills1] = useState("");
    const [skills2, setSkills2] = useState("");
    const [skills3, setSkills3] = useState("");
    const [errors, setErrors] = useState([]); 
    const Navigate = useNavigate();
    const [numOfSkills, setNumOfSkills] = useState(0);

    const submitHandler =(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/pet/new", {name, type, description, skills1, skills2, skills3})
        .then(response => {
            console.log(response);
            Navigate("/");
        })
        .catch(err=>{
            const errorResponse = err.response.data.err.errors;
            console.log("this is the erre: ", err.response.data.err.errors)
            const errorArr = [];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr)
        });
    }

    const skillsInput = () => {
        if(numOfSkills==1){
            return(
                <div>
                    <input type="text" value={skills1} placeholder="fetching" onChange={(e)=>{setSkills1(e.target.value)}}/>
                </div>
            )
        }
        if(numOfSkills == 2){
            return(
                <div>
                    <input type="text" value={skills1} placeholder="fetching" onChange={(e)=>{setSkills1(e.target.value)}}/>
                    <input type="text" value={skills2} placeholder="cuddling" onChange={(e)=>{setSkills2(e.target.value)}}/>
                </div>
            )
        }
        if(numOfSkills === 3 || numOfSkills>3){
            return(
                <div>
                    <input type="text" value={skills1} placeholder="fetching" onChange={(e)=>{setSkills1(e.target.value)}}/>
                    <input type="text" value={skills2} placeholder="cuddling" onChange={(e)=>{setSkills2(e.target.value)}}/>
                    <input type="text" value={skills3} placeholder="napping" onChange={(e)=>{setSkills3(e.target.value)}}/>
                </div>
            )
        }
    }

    const addSkill = (e) => {
        e.preventDefault();
        if(numOfSkills<3){
            setNumOfSkills(numOfSkills + 1);
        }
    }
    const removeSkill = (e) => {
        e.preventDefault();
        setNumOfSkills(numOfSkills - 1);
    }

    return (
        <div style={{maxWidth:860}}>
            <Typography variant="h3" component="h1" color="primary">Pet Shelter</Typography>
            <div className="formWrapper">
                {
                    errors.map((err, i)=> <Typography variant="subtitle1" component="p" color="red" key={i}>{err}</Typography>)
                }
                <form onSubmit={submitHandler}>
                    <label>Pets Name:</label>
                    <input type="text" value={name} placeholder="ex. Fido" onChange={(e)=>{setName(e.target.value)}}/>
                    <label>Type:</label>
                    <input type="text" value={type} placeholder="ex. dog" onChange={(e)=>{setType(e.target.value)}}/>
                    <label>Description:</label>
                    <textarea maxlength="50" value={description} placeholder="ex. a medium sized shelty whos great with kids" onChange={(e)=>{setDescription(e.target.value)}}/>
                    <label>skills:</label>
                    <ButtonGroup variant="text" size="large">
                        <Button onClick={addSkill}>+</Button>
                        <Button onClick={removeSkill}>-</Button>
                    </ButtonGroup>
                    {
                        skillsInput()
                    }
                    <input type="submit"/>
                </form>
            </div>
            <div>
                <Link href="/">cancel</Link>
            </div>

        </div>
    )
}

export default PetNew