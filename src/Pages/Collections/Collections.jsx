import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import './Collections.css';

const Collections = () => {
    const [cartItems, setCartItems] = useState([]);
    const [wishlistItems,setWishlistItems] = useState([]);
    const addTocart = (itemId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 })); 
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/Addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId , user:user})
 
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding to cart:', error));
                toast.success("Product added to cart successfully")
            
        } else {
            console.error('User is not authenticated');
            toast.error("Please login first")
        }
    };
    const addToWishlist = (itemId) => {
        const user = JSON.parse(localStorage.getItem('user'));
        setWishlistItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 })); 
        const token = localStorage.getItem('auth-token');
        if (token) {
            fetch('http://localhost:4000/Addtowishlist', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId , user:user})
 
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error adding to wishlist:', error));
                toast.success("Product added to the wishlist successfully")
            
        } else {
            console.error('User is not authenticated');
        }
    };
    const [allproducts,setAllproducts] = useState([])
    const fethInfo = async () => {
        try {
            const res =await fetch('http://localhost:4000/allProducts');
            const data = await res.json();
            setAllproducts(data);
        } catch (error) {
            console.error('Error fetching products : ' , error)
            
        }
    };
    useEffect(() =>{
        fethInfo();
    } , [])
    
  return (
    <div className='NewCollections container'>
        <ToastContainer/>
        <h1 className='collections_title'>New Collections</h1>
        <div className="collection">
        {
                  allproducts.map((product,index) =>(
                      <div key={index} className='product-card'>
                          <Link to={`/Product/${product.id}`}>
                            <img src={product.image} alt="" className='prod_img' />
                          </Link>
                          <p className='prod_name'>{product.name}</p>
                          <div className="price">
                          <p className='product_new_price'> $ {product.newPrice} </p> 
                          <p className='product_old_price'> $ {product.oldprice} </p>
                          
                          </div>
                         <div className="add_cart_favorite">
                            <div className="add_cart">
                                <button className="Add_to_cart"  onClick={() => addTocart(product.id)}>Add to cart 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="favorite" onClick={()=>addToWishlist(product.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg>
                            </div>
                         </div>
                      </div>
                  ))
              }
        </div>
      
     
    </div>
  )
}

export default Collections
