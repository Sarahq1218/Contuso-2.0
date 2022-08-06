import React from "react";
import { CssBaseline, Grid } from '@material-ui/core';
import Product from "./Product/Product";
import useStyles from './styles'

//JS is standard javascript, JSX is an HTML-like syntax 
//that you can use with React to(theoretically) make it easier 
//and more intuitive to create React components



const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <CssBaseline />

            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.map((product) => ( //we put this in curly braces bc we are referencing JS in a JSX file
                    //whenever we are passing a function in js we need a key to reference
                    //the xs refers to size during mobile, sm, md, lg  refers to the sizing for devices
                    //this loops over our products in our products function

                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} >
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}


            </Grid>
        </main>


    );
}


export default Products;