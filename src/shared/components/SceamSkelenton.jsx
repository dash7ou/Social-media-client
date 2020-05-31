import React, { Fragment } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const styles ={
    card: {
        display: "flex",
        marginBottom: 20
    },
    cardContent:{
        width: "100%",
        flexDirection: "column",
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: "cover"
    },
    handle:{
        width: 60,
        height: 18,
        backgroundColor: '#ccc',
        marginBottom: 7
    },
    data: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0, 0.6)'
    },
    halfLine: {
        height: 15,
        width: '50%',
        marginBottom: 10,
        backgroundColor: 'rgba(0,0,0, 0.6)'
    }
};

const ScreamSkelenton = ({ classes })=>{
    const content = Array.from({ length: 5 }).map((item, index)=>{
        return <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image="/images/no-image.png" />
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}></div>
                <div className={classes.data}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.halfLine}></div>
            </CardContent>
        </Card>
    })
    return <Fragment>{content}</Fragment>
}

export default withStyles(styles)(ScreamSkelenton);