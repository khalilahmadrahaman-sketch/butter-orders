import React, { useState } from 'react';

export default function ButterOrderForm() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    pickupDate: '',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Menu structure
  const menu = {
    Monday: {
      category: 'Sourdough Loaves',
      tagline: 'Made with premium unbleached flour',
      products: [
        {
          id: 'loaf-original',
          name: 'Original Sourdough Loaf',
          price: 13,
          description: 'Classic, crusty exterior with perfect tang',
          sliceable: true,
        },
        {
          id: 'loaf-cheesy',
          name: 'Cheesy Garlic Sourdough',
          price: 15.5,
          description: 'Sharp cheddar & roasted garlic blend',
          sliceable: true,
        },
        {
          id: 'loaf-butter',
          name: 'Butter Sourdough Loaf',
          price: 15,
          description: 'Rich, buttery crumb with subtle sweetness',
          sliceable: true,
        },
      ],
    },
    Thursday: {
      category: 'Sourdough Loaves',
      tagline: 'Made with premium unbleached flour',
      products: [
        {
          id: 'loaf-original',
          name: 'Original Sourdough Loaf',
          price: 13,
          description: 'Classic, crusty exterior with perfect tang',
          sliceable: true,
        },
        {
          id: 'loaf-cheesy',
          name: 'Cheesy Garlic Sourdough',
          price: 15.5,
          description: 'Sharp cheddar & roasted garlic blend',
          sliceable: true,
        },
        {
          id: 'loaf-butter',
          name: 'Butter Sourdough Loaf',
          price: 15,
          description: 'Rich, buttery crumb with subtle sweetness',
          sliceable: true,
        },
      ],
    },
    Tuesday: {
      category: 'Bagels & English Muffins',
      tagline: 'Mix & match your favorites',
      products: [],
    },
    Wednesday: {
      category: 'Focaccia Pan',
      tagline: '8"×8" pan of pure indulgence',
      products: [
        {
          id: 'focaccia-garlic',
          name: 'Garlic Butter Focaccia',
          price: 12,
          description: 'Topped with roasted garlic & finishing salt',
        },
        {
          id: 'focaccia-honey',
          name: 'Hot Honey Focaccia',
          price: 13,
          description: 'Crispy exterior with spicy-sweet finish',
        },
        {
          id: 'focaccia-olive',
          name: 'Classic Olive Oil Focaccia',
          price: 11,
          description: 'Simple elegance with premium EVOO',
        },
      ],
    },
    Friday: {
      category: 'Cheat Day Sweet Treat',
      tagline: 'This week\'s indulgence',
      products: [
        {
          id: 
