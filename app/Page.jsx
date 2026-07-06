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
          id: 'treat-rotating',
          name: 'Weekly Sweet Treat',
          price: 7,
          isSweetTreat: true,
        },
      ],
    },
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const addToCart = (product, day, options = {}) => {
    const cartItem = {
      id: `${product.id}-${Date.now()}`,
      day,
      product,
      quantity: options.quantity || 1,
      sliced: options.sliced || false,
      ...options,
    };
    setCart([...cart, cartItem]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      let itemPrice = item.product.price;
      if (item.sliced) itemPrice += 0.75;
      if (item.boxSize) {
        const sizeOption = item.product.boxSizes?.find(
          (s) => s.size === item.boxSize
        );
        itemPrice = sizeOption?.price || itemPrice;
      }
      return sum + itemPrice * item.quantity;
    }, 0);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Please add items to your order');
      return;
    }
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number');
      return;
    }
    setOrderSubmitted(true);
    setTimeout(() => {
      alert(`Order received, ${customerInfo.name}! We'll have your order ready for pickup.`);
      setCart([]);
      setCustomerInfo({ name: '', email: '', phone: '', pickupDate: '' });
      setSelectedDay(null);
      setOrderSubmitted(false);
    }, 500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F1ED' }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        borderBottom: '2px solid #1F4BA8',
        backgroundColor: '#F5F1ED',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1F4BA8', margin: 0 }}>
                butter.
              </h1>
              <p style={{ fontSize: '12px', fontWeight: 500, color: '#8B6F47', margin: '8px 0 0 0' }}>
                Sourdough craft. Weekly rotation.
              </p>
            </div>
            {cart.length > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: 'white',
                border: '2px solid #1F4BA8',
              }}>
                <span style={{ fontSize: '20px' }}>🛒</span>
                <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#1F4BA8' }}>
                  {cart.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {/* Main Form */}
          <div>
            {/* Day Selection */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px', color: '#1F4BA8' }}>
                What day are you ordering?
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '12px' }}>
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDay(selectedDay === day ? null : day);
                    }}
                    style={{
                      padding: '16px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      textAlign: 'center',
                      border: '2px solid #1F4BA8',
                      backgroundColor: selectedDay === day ? '#1F4BA8' : 'white',
                      color: selectedDay === day ? 'white' : '#1F4BA8',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Products for Selected Day */}
            {selectedDay === 'Tuesday' && (
              <TuesdayMenu addToCart={addToCart} />
            )}

            {selectedDay && selectedDay !== 'Tuesday' && menu[selectedDay] && (
              <div>
                <div style={{
                  borderLeft: '4px solid #8B6F47',
                  paddingLeft: '16px',
                  marginBottom: '24px',
                }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                    {selectedDay}
                  </p>
                  <h3 style={{ fontSize: '28px', fontWeight: 900, marginTop: '8px', color: '#1F4BA8' }}>
                    {menu[selectedDay].category}
                  </h3>
                  <p style={{ fontSize: '14px', marginTop: '8px', color: '#8B6F47' }}>
                    {menu[selectedDay].tagline}
                  </p>
                </div>

                {/* Products List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {menu[selectedDay].products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      day={selectedDay}
                      onAddToCart={addToCart}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Customer Info Form */}
            {cart.length > 0 && (
              <div style={{
                marginTop: '48px',
                paddingTop: '32px',
                borderTop: '2px solid #1F4BA8',
              }}>
                <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px', color: '#1F4BA8' }}>
                  Your Details
                </h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                    style={{
                      padding: '12px',
                      border: '2px solid #1F4BA8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, email: e.target.value })
                    }
                    style={{
                      padding: '12px',
                      border: '2px solid #1F4BA8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo({ ...customerInfo, phone: e.target.value })
                    }
                    style={{
                      padding: '12px',
                      border: '2px solid #1F4BA8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                    }}
                  />
                  <input
                    type="date"
                    value={customerInfo.pickupDate}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        pickupDate: e.target.value,
                      })
                    }
                    style={{
                      padding: '12px',
                      border: '2px solid #1F4BA8',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                    }}
                  />
                  <button
                    onClick={handleSubmitOrder}
                    disabled={orderSubmitted}
                    style={{
                      padding: '16px',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#1F4BA8',
                      cursor: orderSubmitted ? 'not-allowed' : 'pointer',
                      opacity: orderSubmitted ? 0.7 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {orderSubmitted ? 'Processing...' : 'Place Order'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          {cart.length > 0 && (
            <div style={{
              position: 'sticky',
              top: '120px',
              height: 'fit-content',
            }}>
              <div style={{
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #1F4BA8',
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}>
                <h4 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '16px', color: '#1F4BA8' }}>
                  Your Order
                </h4>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '24px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}>
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={removeFromCart}
                      onUpdateQuantity={updateQuantity}
                    />
                  ))}
                </div>

                <div style={{
                  borderTop: '2px solid #1F4BA8',
                  paddingTop: '16px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 'bold' }}>Subtotal:</span>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: '#1F4BA8' }}>
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => setCart([])}
                    style={{
                      width: '100%',
                      padding: '8px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#DC2626',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      borderRadius: '4px',
                    }}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, day, onAddToCart }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  if (product.isSweetTreat) {
    return (
      <SweetTreatCard
        product={product}
        day={day}
        onAddToCart={onAddToCart}
      />
    );
  }

  return (
    <div style={{
      padding: '24px',
      borderRadius: '8px',
      border: '2px solid #E5E1DB',
      backgroundColor: 'white',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#1F4BA8', margin: 0 }}>
            {product.name}
          </h4>
          <p style={{ fontSize: '14px', color: '#555', marginTop: '8px' }}>{product.description}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '24px', fontWeight: 900, color: '#1F4BA8', margin: 0 }}>
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>

      {product.sliceable && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
          padding: '12px',
          borderRadius: '6px',
          backgroundColor: '#FEF3C7',
        }}>
          <input
            type="checkbox"
            id={`slice-${product.id}`}
            onChange={(e) =>
              setSelectedOptions({
                ...selectedOptions,
                sliced: e.target.checked,
              })
            }
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
          <label
            htmlFor={`slice-${product.id}`}
            style={{ fontSize: '14px', fontWeight: 500, cursor: 'pointer', flex: 1, margin: 0 }}
          >
            Add slicing (+$0.75)
          </label>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #1F4BA8', borderRadius: '8px' }}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            −
          </button>
          <span style={{ padding: '0 16px', fontWeight: 'bold', width: '48px', textAlign: 'center' }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            onAddToCart(product, day, {
              quantity,
              sliced: selectedOptions.sliced || false,
            });
            setQuantity(1);
            setSelectedOptions({});
          }}
          style={{
            flex: 1,
            padding: '12px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#1F4BA8',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'opacity 0.2s',
          }}
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}

function SweetTreatCard({ product, day, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState('Sourdough Choc Chunk Cookie');
  const [quantity, setQuantity] = useState(1);

  return (
    <div style={{
      padding: '24px',
      borderRadius: '8px',
      border: '2px solid #E5E1DB',
      backgroundColor: 'white',
      backgroundImage: 'linear-gradient(135deg, rgba(31, 75, 168, 0.05), rgba(139, 111, 71, 0.05))',
    }}>
      <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '8px', color: '#1F4BA8' }}>
        🍪 {product.name}
      </h4>
      <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
        Menu rotates weekly. Choose your treat—all made with sourdough love.
      </p>

      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Choose this week's treat:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Sourdough Choc Chunk Cookie', 'Sourdough Cinnamon Roll', 'Sourdough Brownie'].map(
            (variant) => (
              <button
                key={variant}
                onClick={() => setSelectedVariant(variant)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  textAlign: 'left',
                  fontWeight: 600,
                  border: '2px solid #1F4BA8',
                  backgroundColor: selectedVariant === variant ? '#1F4BA8' : 'white',
                  color: selectedVariant === variant ? 'white' : '#1F4BA8',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px',
                }}
              >
                {variant}
              </button>
            )
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #1F4BA8', borderRadius: '8px' }}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            −
          </button>
          <span style={{ padding: '0 16px', fontWeight: 'bold', width: '48px', textAlign: 'center' }}>
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            onAddToCart(product, day, {
              quantity,
              variant: selectedVariant,
            });
            setQuantity(1);
          }}
          style={{
            flex: 1,
            padding: '12px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#1F4BA8',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'opacity 0.2s',
          }}
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}

function TuesdayMenu({ addToCart }) {
  const [bagelBox, setBagelBox] = useState(4);
  const [bagelFlavors, setBagelFlavors] = useState(['Plain']);
  const [bagelQty, setBagelQty] = useState(1);
  const [muffinBox, setMuffinBox] = useState(6);
  const [muffinQty, setMuffinQty] = useState(1);

  const bagelPrices = { 4: 10, 8: 18 };
  const muffinPrices = { 6: 9, 12: 16 };
  const bagelFlavorsOptions = ['Plain', 'Sesame', 'Everything', 'Cinnamon Raisin'];

  return (
    <div>
      <div style={{
        borderLeft: '4px solid #8B6F47',
        paddingLeft: '16px',
        marginBottom: '24px',
      }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
          Tuesday
        </p>
        <h3 style={{ fontSize: '28px', fontWeight: 900, marginTop: '8px', color: '#1F4BA8' }}>
          Bagels & English Muffins
        </h3>
        <p style={{ fontSize: '14px', marginTop: '8px', color: '#8B6F47' }}>
          Mix & match your favorites
        </p>
      </div>

      {/* BAGELS CARD */}
      <div style={{
        padding: '24px',
        borderRadius: '8px',
        border: '2px solid #E5E1DB',
        backgroundColor: 'white',
        marginBottom: '16px',
      }}>
        <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '8px', color: '#1F4BA8' }}>
          Sourdough Bagels
        </h4>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
          Chewy, tangy perfection. Choose flavors for your box.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Box Size:</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[4, 8].map((size) => (
              <button
                key={size}
                onClick={() => setBagelBox(size)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  border: '2px solid #1F4BA8',
                  backgroundColor: bagelBox === size ? '#1F4BA8' : 'white',
                  color: bagelBox === size ? 'white' : '#1F4BA8',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {size} Pack (${bagelPrices[size]})
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
            Mix & Match Flavors ({bagelBox}x):
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {bagelFlavorsOptions.map((flavor) => (
              <button
                key={flavor}
                onClick={() => {
                  if (bagelFlavors.includes(flavor)) {
                    setBagelFlavors(bagelFlavors.filter((f) => f !== flavor));
                  } else if (bagelFlavors.length < bagelBox) {
                    setBagelFlavors([...bagelFlavors, flavor]);
                  }
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: '2px solid #1F4BA8',
                  backgroundColor: bagelFlavors.includes(flavor) ? '#1F4BA8' : 'white',
                  color: bagelFlavors.includes(flavor) ? 'white' : '#1F4BA8',
                  cursor: bagelFlavors.length === bagelBox && !bagelFlavors.includes(flavor) ? 'not-allowed' : 'pointer',
                  opacity: bagelFlavors.length === bagelBox && !bagelFlavors.includes(flavor) ? 0.5 : 1,
                }}
                disabled={bagelFlavors.length === bagelBox && !bagelFlavors.includes(flavor)}
              >
                {flavor}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #1F4BA8', borderRadius: '8px' }}>
            <button
              onClick={() => setBagelQty(Math.max(1, bagelQty - 1))}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              −
            </button>
            <span style={{ padding: '0 16px', fontWeight: 'bold', width: '48px', textAlign: 'center' }}>
              {bagelQty}
            </span>
            <button
              onClick={() => setBagelQty(bagelQty + 1)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              +
            </button>
          </div>
          <button
            onClick={() => {
              addToCart(
                { id: 'bagels', name: 'Sourdough Bagels', price: bagelPrices[bagelBox] },
                'Tuesday',
                { quantity: bagelQty, boxSize: bagelBox, flavors: bagelFlavors }
              );
              setBagelQty(1);
              setBagelFlavors(['Plain']);
            }}
            style={{
              flex: 1,
              padding: '12px',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#1F4BA8',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Add Bagels to Order
          </button>
        </div>
      </div>

      {/* MUFFINS CARD */}
      <div style={{
        padding: '24px',
        borderRadius: '8px',
        border: '2px solid #E5E1DB',
        backgroundColor: 'white',
      }}>
        <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '8px', color: '#1F4BA8' }}>
          English Muffins
        </h4>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
          Crispy exterior, tender crumb. Perfect for breakfast.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Box Size:</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[6, 12].map((size) => (
              <button
                key={size}
                onClick={() => setMuffinBox(size)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  border: '2px solid #1F4BA8',
                  backgroundColor: muffinBox === size ? '#1F4BA8' : 'white',
                  color: muffinBox === size ? 'white' : '#1F4BA8',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {size} Pack (${muffinPrices[size]})
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #1F4BA8', borderRadius: '8px' }}>
            <button
              onClick={() => setMuffinQty(Math.max(1, muffinQty - 1))}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              −
            </button>
            <span style={{ padding: '0 16px', fontWeight: 'bold', width: '48px', textAlign: 'center' }}>
              {muffinQty}
            </span>
            <button
              onClick={() => setMuffinQty(muffinQty + 1)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              +
            </button>
          </div>
          <button
            onClick={() => {
              addToCart(
                { id: 'muffins', name: 'English Muffins', price: muffinPrices[muffinBox] },
                'Tuesday',
                { quantity: muffinQty, boxSize: muffinBox }
              );
              setMuffinQty(1);
            }}
            style={{
              flex: 1,
              padding: '12px',
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#1F4BA8',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Add Muffins to Order
          </button>
        </div>
      </div>
    </div>
  );
}

function CartItem({ item, onRemove, onUpdateQuantity }) {
  let displayName = item.product.name;
  let extraDetails = [];

  if (item.sliced) extraDetails.push('Sliced');
  if (item.boxSize) extraDetails.push(`Box of ${item.boxSize}`);
  if (item.flavors) extraDetails.push(`Flavors: ${item.flavors.join(', ')}`);
  if (item.variant) extraDetails.push(item.variant);

  let itemPrice = item.product.price;
  if (item.sliced) itemPrice += 0.75;

  return (
    <div style={{
      padding: '12px',
      borderRadius: '8px',
      backgroundColor: '#F9F5F0',
      border: '1px solid #E5E1DB',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#1F4BA8', margin: 0 }}>
            {displayName}
          </p>
          {extraDetails.length > 0 && (
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', margin: 0 }}>
              {extraDetails.join(' • ')}
            </p>
          )}
        </div>
        <button
          onClick={() => onRemove(item.id)}
          style={{
            color: '#DC2626',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '4px',
          }}
        >
          ✕
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            style={{
              padding: '4px 8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            −
          </button>
          <span style={{ fontWeight: 'bold', fontSize: '13px', width: '24px', textAlign: 'center' }}>
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            style={{
              padding: '4px 8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            +
          </button>
        </div>
        <p style={{ fontWeight: 'bold', color: '#1F4BA8', margin: 0, fontSize: '14px' }}>
          ${(itemPrice * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
