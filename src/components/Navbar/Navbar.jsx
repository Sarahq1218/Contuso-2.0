import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles'
import { Link, useLocation } from 'react-router-dom';

import logo from '../../Assets/chryler.png';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const location = useLocation();



    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant='h4' className={classes.title} color='inherits'>
                        <img src={logo} alt="Contuso 2.0" height="80px" className={classes.image} />
                        Contuso 2.0
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button}>

                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color='inherit'>
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>)}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar