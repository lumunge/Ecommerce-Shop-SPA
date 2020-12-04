import React, { Component } from 'react';
import Menu from '../Components/Menu';
import Products from '../Components/Products';
import Cart from '../Components/Cart';
import '../App.css';
import Footer from '../Components/Footer';
import store from '../store';
import { Provider } from 'react-redux';

export default class CakesAndConfectionaries extends Component {
    constructor(){
        super();
        this.state = {
            cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
    }
    }


    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        this.setState({
            cartItems: cartItems.filter((x) => x._id !== product._id),
        });
    };

    decreaseCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
          if(item._id === product._id){
            item.count--;
            alreadyInCart = true;
          }
        });
        if(!alreadyInCart){
          cartItems.pop({...product, count: 0});
          this.removeFromCart(product);
        }
        this.setState({cartItems});
      }; 

    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
          if(item._id === product._id){
            item.count++;
            alreadyInCart = true;
          }
        });
        if(!alreadyInCart){
          cartItems.push({...product, count: 1});
        }
        this.setState({cartItems});
      };      

    render() {
        return (
          <Provider store={store}>
            <div>
            <Menu 
              cartItems = {this.state.cartItems}
            />
            <div className="hero">
                <div className="banner">
                    <h1 className="bannerTitle">Some of our Best Sellers</h1>
                    <button className="bannerBtn">Shop Now </button>
                </div>
            </div>
            <Products
                addToCart = {this.addToCart}
            />
            <Cart
                decreaseCart = {this.decreaseCart}
            />
                <Footer />
            </div>
            </Provider>
        )
    }
}
