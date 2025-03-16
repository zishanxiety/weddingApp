import React, {useState} from 'react';
import {Card, CardContent} from '../components/ui/card';
import {Button} from '../components/ui/button';
import balrampurImage from '../assets/balrampur.png';
import chambalImage from '../assets/chambal.png';
import iciciImage from '../assets/icici.png';
import IHCImage from '../assets/IHC.png';
import mahindraImage from '../assets/mahindra.png';
import relianceImage from '../assets/reliance.png';
import wabagImage from '../assets/wabag.png';
import zincImage from '../assets/zinc.png';
import RECImage from '../assets/REC.png';
import hdfcImage from '../assets/hdfc.png';

const products = [
    {id: 1, name: 'Balrampur', price: 2000, image: balrampurImage},
    {id: 2, name: 'Chambal', price: 1500, image: chambalImage},
    {id: 3, name: 'ICICI', price: 5000, image: iciciImage},
    {id: 4, name: 'IHC', price: 5000, image: IHCImage},
    {id: 5, name: 'MAHINDRA', price: 5000, image: mahindraImage},
    {id: 6, name: 'RELIANCE', price: 5000, image: relianceImage},
    {id: 7, name: 'WABAG', price: 5000, image: wabagImage},
    {id: 8, name: 'ZINC', price: 5000, image: zincImage},
    {id: 9, name: 'REC', price: 5000, image: RECImage},
    {id: 10, name: 'HDFC', price: 5000, image: hdfcImage},
];

export default function WeddingShop() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const handlePayment = () => {
        const totalAmount = getTotal();
        const upiLink = `upi://pay?pa=anasyaseen1022-1@okhdfcbank&pn=Anas Yaseen&am=${totalAmount}&cu=INR`;
        window.location.href = upiLink;
    };

    return (
        <div style={{padding: '1rem'}}>
            <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', color: 'black'}}>Stocks</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                {products.map((product) => (
                    <Card key={product.id} style={{padding: '1rem', textAlign: 'center'}}>
                        <div
                            style={{
                                width: '100%',
                                height: '192px', // Fixed height for the image container
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                backgroundColor: 'white',
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain', // Ensures the image fits within the container
                                }}
                            />
                        </div>
                        <CardContent>
                            <h2 style={{fontSize: '1.125rem', fontWeight: 'semibold', color: 'black'}}>{product.name}</h2>
                            <p style={{color: 'black'}}>₹{product.price}</p>
                            <Button onClick={() => addToCart(product)} style={{marginTop: '0.5rem'}}>
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div style={{marginTop: '1.5rem', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
                <h2 style={{fontSize: '1.125rem', fontWeight: 'semibold', color: 'black'}}>Cart</h2>
                {cart.length === 0 ? (
                    <p style={{color: 'black'}}>No items in cart</p>
                ) : (
                    cart.map((item, index) => (
                        <p key={index} style={{color: 'black'}}>
                            {item.name} - ₹{item.price}
                        </p>
                    ))
                )}
                <p style={{fontWeight: 'bold', marginTop: '0.5rem', color: 'black'}}>Total: ₹{getTotal()}</p>
                <Button onClick={handlePayment} style={{marginTop: '0.5rem'}}>
                    Pay with UPI
                </Button>
            </div>
        </div>
    );
}
