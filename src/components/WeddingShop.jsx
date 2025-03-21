import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import QRCode from 'qrcode';

import './WeddingShop.css';  // Import plain CSS file

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
import amazonImage from '../assets/amazon.png';
import myntraImage from '../assets/myntra.png';

const products = [
    { id: 1, name: 'Balrampur', price: 530, image: balrampurImage },
    { id: 2, name: 'Chambal', price: 600, image: chambalImage },
    { id: 3, name: 'ICICI', price: 1340, image: iciciImage },
    { id: 4, name: 'IHC', price: 820, image: IHCImage },
    { id: 5, name: 'MAHINDRA', price: 2800, image: mahindraImage },
    { id: 6, name: 'RELIANCE', price: 1270, image: relianceImage },
    { id: 7, name: 'WABAG', price: 1490, image: wabagImage },
    { id: 8, name: 'ZINC', price: 440, image: zincImage },
    { id: 9, name: 'REC', price: 430, image: RECImage },
    { id: 10, name: 'HDFC', price: 1760, image: hdfcImage },
    { id: 10, name: 'AMAZON', price: 1000, image: amazonImage },
    { id: 10, name: 'MYNTRA', price: 1001, image: myntraImage },
];

export default function WeddingShop() {
    const [cart, setCart] = useState([]);
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const [name, setName] = useState('');
    const [relation, setRelation] = useState('');
    const [paymentMade, setPaymentMade] = useState(false);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const generateQRCode = async () => {
        const totalAmount = getTotal();
        if (totalAmount > 0) {
            const upiLink = `upi://pay?pa=rockshaban786-1@okicici&pn=Shaban and Farhin&am=${totalAmount}&cu=INR`;
            try {
                const url = await QRCode.toDataURL(upiLink);
                setQrCodeUrl(url);
                setShowQRCode(true);
                setPaymentMade(false);
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        } else {
            setQrCodeUrl('');
            setShowQRCode(false);
        }
    };

    const confirmPayment = () => {
        setPaymentMade(true);
        alert('Payment confirmed successfully!');
    };

    const sendWhatsAppMessage = () => {
        if (!name || !relation) {
            alert('Please enter your name and relation.');
            return;
        }

        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        if (!paymentMade) {
            alert('Please confirm the payment before sending the message.');
            return;
        }

        const cartDetails = cart
            .map((item) => `${item.name} - ₹${item.price}`)
            .join('\n');

        const message = `
        Hello! ${name} (your ${relation}) has gifted you the following items:  
        Cart: 
        ${cartDetails}
        Total: ₹${getTotal()}
        `;

        const phoneNumber = '919644898606';  // Replace with the recipient's WhatsApp number
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappLink, '_blank');
    };




    return (
        <div className="container">
            <div className="welcome-note">
                <h2>Welcome to our wedding registry!</h2>
                <p>Shaban and Farhin are thrilled to share this special moment with you. We're grateful for your love and support as we begin our new journey together.</p>
                <p>We've curated this registry to include items that will help us build our new life. Your gift will not only bring us joy but also help us create cherished memories.</p>
                <p>Thank you for celebrating with us!</p>
                <p><strong>Love, Shaban & Farhin</strong></p>
            </div>


            <h1 className="title">Please select a gift from below!</h1>

            <div className="product-grid">
                {products.map((product) => (
                    <Card key={product.id} className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                        </div>
                        <CardContent>
                            <h2>{product.name}</h2>
                            <p>₹{product.price}</p>
                            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="form-container">
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Enter your relation"
                        value={relation}
                        onChange={(e) => setRelation(e.target.value)}
                        className="input-field"
                    />
                </div>
                <Button className="submit-button" onClick={sendWhatsAppMessage}>
                    Send WhatsApp
                </Button>
            </div>

            <div className="cart-section">
                <h2>Cart</h2>
                {cart.length === 0 ? (
                    <p>No items in cart</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <p>{item.name} - ₹{item.price}</p>
                        </div>
                    ))
                )}
                <p className="total-price">
                    <strong>Total: ₹{getTotal()}</strong>
                </p>

                {showQRCode && (
                    <div className="qr-code-container">
                        <img src={qrCodeUrl} alt="QR Code" className="qr-code" />
                        <Button className="payment-button" onClick={confirmPayment}>
                            Confirm Payment
                        </Button>
                    </div>
                )}
                <Button className="generate-qr-button" onClick={generateQRCode}>
                    Generate QR Code
                </Button>
            </div>

            <div className="welcome-note">
                <h3>Thank you!</h3>
                <p>We're overwhelmed with gratitude!</p>
                <p>Thank you for choosing to celebrate our special day with a gift from our registry. Your generosity and thoughtfulness mean the world to us.</p>
                <p>Your gift will be a constant reminder of your love and support as we start our new life together. We can't wait to create unforgettable memories with the gifts you've given us!</p>
                <p>Thank you again for your kindness and for being part of our journey.</p>
                <p>With love and appreciation,</p>
                <p><strong>Shaban & Farhin</strong></p>
            </div>

        </div>
    );
}
