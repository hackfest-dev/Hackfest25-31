import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import './DeliveryStyles.css'
import DeliveryMap from "./DeliveryMap";

const DeliveryTracker = () => {
  const [orderData, setOrderData] = useState(null);
  const [orderId, setOrderId] = useState("");

  const fetchOrder = async () => {
    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setOrderData(docSnap.data());
    } else {
      alert("No such order!");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={fetchOrder}>Track</button>

      {orderData && orderData.status === "accepted" && (
        <DeliveryMap lat={12.9716} lng={77.5946} />
      )}
    </div>
  );
};

export default DeliveryTracker;
