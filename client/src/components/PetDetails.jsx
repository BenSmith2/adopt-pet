import React, { useEffect, useState } from 'react'
import axios from "axios";
import {useParams} from 'react-router'
import {useNavigate, Link} from 'react-router-dom'
import { ButtonGroup, FormControl, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { color } from "@mui/system";

const PetDetails = () => {
    const {id} = useParams();
    const [showPet, setPet] = useState([]);

    const Navigate = useNavigate();

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/pet/${id}`)
        .then(response =>{
            console.log(response.data.results)
            setPet(response.data.results)
        })
        .catch(err => console.log("Error:", err))
    }, [])

    const adoptPetFunc = (e, id) => {
        console.log("Adopting Pet", id);
        axios.delete(`http://localhost:8000/api/pet/adopt/${id}`)
        .then((response)=>{
            console.log("Adoption was successful", response)
            Navigate("/")
        })
        .catch(err => console.log("Something went wrong deleting", err))
    }

  return (
    <div>
        <Typography variant="h3" component="h1" color="primary">Pet Shelter</Typography>
        
        <Typography variant="h5" component = "h1">About {showPet.name}</Typography>
        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 150}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Skills</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell>{showPet.type}</TableCell>
                                <TableCell>{showPet.description}</TableCell>
                                    <TableCell align="left">
                                        <ul>    
                                            <li>
                                                {showPet.skills1}
                                            </li>
                                            <li>
                                                {showPet.skills2}
                                            </li>
                                            <li>
                                                {showPet.skills3}
                                            </li>
                                        </ul>
                                    </TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
        <ButtonGroup variant="text" size="large">
            <Button color='secondary' onClick={(e)=>{adoptPetFunc(e, showPet._id)}}>Adopt Pet</Button>
            <Button href="/">back to all pets</Button>
        </ButtonGroup>
    </div>
  )
}

export default PetDetails