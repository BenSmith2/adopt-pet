import axios from "axios"
import {useParams} from 'react-router'
import React, { useEffect, useState } from "react"
import Link from '@mui/material/Link';
import {useNavigate} from 'react-router-dom'
import { ButtonGroup, FormControl, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ".//styles/PetNew.css"

const PetEdit = () => {
    const {id} = useParams();
    const [formInfo, setFormInfo] = useState({
        name: "",
        type: "",
        description: "",
        skills1: "",
        skills2: "",
        skills3: ""
    });
    const [errors, setErrors] = useState([]); 
    const Navigate = useNavigate();
    const [numOfSkills, setNumOfSkills] = useState(0);

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/pet/${id}`)
        .then(response =>{
            console.log(response.data.results)
            setFormInfo(response.data.results)
        })
        .catch(err => console.log("Error:", err))
    }, [])

    const submitHandler = (e) =>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/pet/update/${id}`, formInfo)
        .then(response => {
            console.log("edit put request:", response)
            Navigate("/")
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

    const onChangeHandler = (e) =>{
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const skillsInput = () => {
        if(numOfSkills === 1){
            return(
                <div>
                    <input type="text" name="skills1" value={formInfo.skills1} onChange={onChangeHandler}/>
                </div>
            )
        }
        if(numOfSkills === 2){
            return(
                <div>
                    <input type="text" name="skills1" value={formInfo.skills1} onChange={onChangeHandler}/>
                    <input type="text" name="skills2" value={formInfo.skills2} onChange={onChangeHandler}/>
                </div>
            )
        }
        if(numOfSkills === 3 || numOfSkills>3){
            return(
                <div>
                    <input type="text" name="skills1" value={formInfo.skills1} onChange={onChangeHandler}/>
                    <input type="text" name="skills2" value={formInfo.skills2} onChange={onChangeHandler}/>
                    <input type="text" name="skills3" value={formInfo.skills3} onChange={onChangeHandler}/>
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
    <div>
        <Typography variant="h3" component="h1" color="primary">Pet Shelter</Typography>
        <h3>Edit {formInfo.name}'s information</h3>
        <div className="formWrapper">
            {
                errors.map((err, i)=> <Typography variant="subtitle1" component="p" color="red" key={i}>{err}</Typography>)
                
            }
            <form onSubmit={submitHandler}>
                <label>Name:</label>
                <input type="text" name="name" value={formInfo.name} onChange={onChangeHandler}/>
                <label>Type:</label>
                <input type="text" name="type" value={formInfo.type} onChange={onChangeHandler}/>
                <label>Desciption:</label>
                <input type="text" name="description" value={formInfo.description} onChange={onChangeHandler}/>
                <label>Skills:</label>
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
        <Link href="/">back to all pets</Link>
        </div>
    </div>
  )
}

export default PetEdit