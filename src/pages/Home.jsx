import React, { useEffect } from "react";

//redux
import { connect } from "react-redux";
import {
    getScreams
} from "../actions/scream";

import Grid from "@material-ui/core/Grid";

import Screams from "../components/Screams/Screams";
import Profile from "../components/Profile/Profile"

const Home = ({ getScreams, screams, loadingUser })=>{
    useEffect(()=>{
        const getData = async ()=>{
            try{
                await getScreams()
            }catch(err){}
        }
       getData();
    }, []);

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {screams && !loadingUser ? (screams.length > 0 ? (<Screams screams={screams}/>): (<p>No screams until now.</p>)) : (<p>Loading..</p>)}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    )
}

const mapStateToProps = state =>({
    screams: state.scream.screams,
    loadingUser: state.user.loading
})

export default connect(mapStateToProps, {
    getScreams
})(Home);