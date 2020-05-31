import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Redux
import { connect } from "react-redux";
import {
    markNotificationRead
} from "../../actions/user";

// MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";
import NotificationIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";


const Notifications = ({ notifications, markNotificationRead})=>{
    dayjs.extend(relativeTime);
    const [ openMenu , setOpenMenu ] = useState(null);
    const handleOpen = (e)=>{
        setOpenMenu(e.target)
    };
    const handleClose = ()=>{
        setOpenMenu(null)
    };
    const onMenuOpen = async ()=>{
        try{
            const not = notifications.filter(n => !n.read).map(n => n.notificationId)
            await markNotificationRead(not);
        }catch(err){}
    }

    return(
        <Fragment>
            <Tooltip placement="top" title="Notification">
                <IconButton aria-owns={ openMenu ? 'simple-menu': undefined } aria-haspopup="true" onClick={handleOpen} >
                    {
                        !notifications ? ( <NotificationIcon />) : (notifications.length > 0 ? (
                            <Badge badgeContent={notifications.filter(n => !n.read).length } color="secondary">
                                <NotificationIcon />
                            </Badge>
                        ):(
                            <NotificationIcon />
                        ))
                    }
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={openMenu}
                open={Boolean(openMenu)}
                onClose={handleClose}
                onEntered={onMenuOpen}
            >
                    {
                        notifications && notifications.length > 0 ? (
                            notifications.map(n =>{
                                const verb = n.type === 'like' ? 'liked' : 'commented on';
                                const time = dayjs(n.createdAt).fromNow()
                                const iconColor = n.read ? 'primary' : 'secondary';
                                const icon = n.type === 'like' ? (
                                    <FavoriteIcon color={iconColor} style={{ marginRight: 10}} />
                                ):(
                                    <ChatIcon color={iconColor} style={{ marginRight: 10}} />
                                )

                                return <MenuItem
                                    key={n.createdAt}
                                    onClick={handleClose}
                                >
                                    <Typography component={Link} variant="body1" color="default" to={`/users/${n.recipient}/scream/${n.screamId}`}>
                                        {icon} {n.sender} {verb} your scream {time}
                                    </Typography>
                                </MenuItem>
                            })
                        ) : (
                            <MenuItem onClick={handleClose}>
                                You have no notifications yet
                            </MenuItem>
                        )
                    }
            </Menu>
        </Fragment>
    ) 
}

const mapStateToProps = state => ({
    notifications: state.user.user.notifications
})

export default connect(mapStateToProps, {
    markNotificationRead
})(Notifications);