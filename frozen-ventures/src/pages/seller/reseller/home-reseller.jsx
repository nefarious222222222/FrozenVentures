import React, { useContext, useState, useEffect } from 'react';
import '../../../assets/styles/reseller.css';
import { UserContext } from '../../../context/user-context';
import { useAuth } from '../../../context/auth-context';
import { Navigate } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import { ShopPerformance } from './components/shop-performance';
import { Shop } from './components/shop';
import { Cart } from './components/cart';
import { History } from './components/history';
import { ManageOrder } from './components/manage-order';
import { ManageProducts } from './components/manage-products';
import { ManageInventory } from './components/manage-inventory';
import { Inbox } from './components/inbox';
import { fetchUserStatus } from '../../../firebase/firebase-reseller';
import { ActiveItemContext } from '../../../context/notification-context';

export const HomeSeller = () => {
  const { user } = useContext(UserContext);
  const { userSignedIn } = useAuth();
  const { activeItem, setActiveItem } = useContext(ActiveItemContext);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user && user.userId) {
        try {
          const status = await fetchUserStatus(user.userId);
          setIsOverlayVisible(status === 'pending');
        } catch (error) {
          console.error('Error fetching user status:', error);
        }
      }
    };

    checkUserStatus();
  }, [user]);

  const handleSidebarToggle = (expanded) => {
    setIsSidebarExpanded(expanded);
  };

  if (!userSignedIn || !['Retailer', 'Distributor', 'Manufacturer'].includes(user.userRole)) {
    return <Navigate to={'/'} replace={true} />;
  }

  return (
    <div className="container home-retailer">
      {isOverlayVisible && (
        <div className="overlay">
          <div className="message-container">
            <h1>Warning</h1>
            <p>
              Your account is not yet verified. Please wait for the
              administrator to verify your account.
            </p>
          </div>
        </div>
      )}
      <Sidebar
        activeItem={activeItem}
        onActiveItemChange={setActiveItem}
        onToggle={handleSidebarToggle}
      />
      <div className="sidebar-content" style={{ marginLeft: isSidebarExpanded ? '15vw' : '5vw' }}>
        {activeItem === 'performance' && <ShopPerformance />}
        {activeItem === 'shop' && <Shop />}
        {activeItem === 'cart' && <Cart />}
        {activeItem === 'history' && <History />}
        {activeItem === 'manage-order' && <ManageOrder />}
        {activeItem === 'manage-products' && <ManageProducts />}
        {activeItem === 'manage-inventory' && <ManageInventory />}
        {activeItem === 'inbox' && <Inbox />}
      </div>
    </div>
  );
};