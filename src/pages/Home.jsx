import React, { useEffect, useState } from "react";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import Screams from "../components/Screams/Screams";

const Home = ()=>{
    const [screams , setScreams ] = useState(null)
    useEffect(()=>{
        const getData = async ()=>{
            try{
                const res =  await axios.get(`${process.env.REACT_APP_FUNCTION_URI}/screams`);
                setScreams(res.data);
            }catch(err){
                console.log(err)
                err.response && err.response.status === 404 && setScreams([]);
            }
        }
       getData();
    }, []);

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {screams ? (screams.length > 0 ? (<Screams screams={screams}/>): (<p>No screams until now.</p>)) : (<p>Loading..</p>)}
            </Grid>
            <Grid item sm={4} xs={12}>
                <p>Profile...</p>
            </Grid>
        </Grid>
    )
}

export default Home;