import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import StaticProfile from "../components/Profile/StaticProfile";
import Screams from "../components/Screams/Screams";

// Redux
import { connect } from "react-redux";
import {
    getUserPublic
} from "../actions/user";

// MUI
import Grid from "@material-ui/core/Grid";

const User = ({ user: { userSelected, loading }, getUserPublic })=>{
    const params = useParams();
    useEffect(()=>{
        console.log("get")
        const getData= async ()=>{
            await getUserPublic(params.handle);
        }
        getData()
    }, []);

    
    return !loading ? (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                { userSelected && userSelected.screams && userSelected.screams.length > 0 ? (<Screams screams={ userSelected.screams}/>): (<p>No screams until now.</p>)}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {userSelected && <StaticProfile user={userSelected.user} />}
                </Grid>
            </Grid>
        ): (<p>loading data...</p>)
    
}

const mapStateToProps = state =>({
    user : state.user
})

export default connect(mapStateToProps, {
    getUserPublic
})(User);