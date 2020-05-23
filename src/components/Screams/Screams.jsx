import React from "react";

// Component
import ScreamsItem from "./ScreamsItem";

const Screams = ({screams})=>{
    return screams.map((scream, key) => <ScreamsItem key={key} scream={scream} />)
}

export default Screams;