import axios from "axios";
import React, { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import { ButtonGroup, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { color } from "@mui/system";


const PetShelter = () => {
    const [allPets, setAllPets] = useState([]);
    
    useEffect(() =>{
        axios.get("http://localhost:8000/api/pets")
        .then(response =>{
            console.log(response.data.results)
            setAllPets(response.data.results)
        })
        .catch(err => console.log("Error:", err))
    },[])

    const petsLookingForHomes=(() =>{
        if(allPets.length>0){
            return(
                <div style={{maxWidth:860}}>
                    <h3>These pets are looking for a good home</h3>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 150}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Type</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    allPets.map((p, i)=>{
                                        return(
                                            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell component="th" scope="row">
                                                    {p.name}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {p.type}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <ButtonGroup  variant="text" >
                                                        <Button href={`/pet/${p._id}`}>details</Button><Button href={`/pet/edit/${p._id}`}>edit</Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )
        }else{
            return(
                <div>
                    <h3>There are currently no pets looking for new homes!</h3>
                    <p> If you know a pet that needs a family hit <b>"ADD A PET"</b>.</p>
                </div>
            )
        }
    })

  return (
    <div>

        <Typography variant="h3" component="h1" color="primary">Pet Shelter</Typography>
        <Button variant="contained" href="/pet/new">add a pet</Button>
        {
            petsLookingForHomes()
        }
        
        
    </div>
  )
}

export default PetShelter