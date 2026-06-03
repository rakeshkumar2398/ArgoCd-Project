import { useEffect, useState } from "react";
import api from "../services/api";
import "./Menu.css";

function Menu({ cart, setCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/api/menu-items")
      .then((response) => {
        setItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      });
  }, []);

  const getImage = (name) => {
    const images = {
      "Masala Chai": "masala-chai.png",
      "Ginger Tea": "chai.png",
      "Green Tea": "chai.png",
      "Badam Tea": "chai.png",
      "Honey Tea": "chai.png",
      "Samosa": "samosa.png",
      "Veg Sandwich": "sand.png",
      "Cheese Sandwich": "sand.png",
      "Paneer Sandwich": "sand.png",
      "Veg Puff": "chai-samosa.png"
    };

    return images[name] || "chai.png";
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  if (loading) {
    return <p className="menu-message">Loading menu items...</p>;
  }

  if (!loading && items.length === 0) {
    return <p className="menu-message">No menu items available.</p>;
  }

  return (
    <div className="menu-wrapper">
      <div className="menu-topbar">
        <input
          type="text"
          placeholder="Search chai or snacks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="menu-message">No items matched your search.</p>
      ) : (
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div className="menu-card" key={item.id}>
              <img
                src={`/images/${getImage(item.name)}`}
                alt={item.name}
                className="menu-image"
              />

              <h3>{item.name}</h3>

              <p className="menu-description">{item.description}</p>

              <div className="menu-meta">
                <span className="price">₹{item.price}</span>
                <span className={item.isAvailable ? "available" : "unavailable"}>
                  {item.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>

              <button
                className={item.isAvailable ? "add-btn" : "disabled-btn"}
                onClick={() => addToCart(item)}
                disabled={!item.isAvailable}
              >
                {item.isAvailable ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
