import '../CSS/profile.css';
const Profile = () => {
  return (
    <div className='profile'>
      <div className="welcomeHeaderRight">
        <p>Welcome! <span> Hope Horizon </span> </p>
      </div>
      <div className="drawer">
        <div className="ManageMyAccount">
          <h2>Manage My Account</h2>
        </div>
        <div className="MyOrders">
          <h2>My Orders</h2>
        </div>
        <div className="MyWishlist">
          <h2>My Wishllist</h2>
        </div>
      </div>
    </div>
  )
}

export default Profile
