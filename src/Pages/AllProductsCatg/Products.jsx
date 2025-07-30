import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../CSS/productCat.css';
const Products = () => {

    const {category} = useParams();
    const [products,setProducts] = useState([]);
     const [cartItems, setCartItems] = useState([]);
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
                    toast.success("Product added to card successfully")
                
            } else {
                 toast.error("Please login first")
            }
        };
    useEffect(()=>{
        fetch(`http://localhost:4000/Category/${category}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('failed to fetched product by  category:',error))
    }, [category]);

  return (
    <>
    <ToastContainer/>
    <div className="banner-catg">
      <div className="banner-content">
        <h1 className="category-title">{category}</h1>
        <p className="category-subtitle">Be the first to explore it now!</p>
        <button className="explore-btn">Explore Now</button>
      </div>
    </div>

    <div className='products-category'>
        
      {
        products.map((products)=>(
            <div className="product_card" key={products.id}>
                <Link to={`/Product/${products.id}`}>
                            <img src={products.image} alt="" className='prod_img' />
                        </Link>
                <p className='prod_name'> {products.name} </p>
                <div className="prices">
                    <p className='new_price'> ${products.newPrice} </p>
                    <p className="old_price"> ${products.oldprice} </p>
                </div>
                <button className='addToCart' onClick={() => addTocart(products.id)}>Add to cart 
                    <i className="bi-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    </i>
                </button>
            </div>
        ))
      }
    </div>
    </>
  );
};

export default Products;
