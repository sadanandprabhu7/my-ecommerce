const open = document.getElementById("open");
const close = document.getElementById("close");

const container = document.getElementById("conatiner");

open.addEventListener("click", () => {
  container.classList.add("active");
});

close.addEventListener("click", () => {
  container.classList.remove("active");
});

// LOADING ALL THE PRODUCT ON SITE FROM DATABASE WHENEVR SITE IS VISITED
const parentDiv = document.getElementsByClassName("shop-items")[0];
window.addEventListener("load", () => {
  axios.get("http://localhost:3000/products").then((products) => {
    products.data.productDetails.forEach((product) => {
      const itemsDiv = `<div class="shop-item">
                    <span class="shop-item-title">${product.title}</span>
                    <img class="shop-item-image" src="${product.image}">
                    <div class="shop-item-details">
                        <span class="shop-item-price">$${product.price}</span>
                        <button class="btn btn-primary shop-item-button" onclick="addToCart(${product.id})" type="button">ADD TO CART</button>  
                    </div>`;
      parentDiv.innerHTML += itemsDiv;
    });
  });
});

///  ADD TO CART FUNCTION
function addToCart(product) {
  axios
    .post("http://localhost:3000/cart", { productId: product })
    .then((res) => {
      if (res.status == 200) {
        CreateNotification(res.data.message);
        console.log(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function CreateNotification(message) {
  const notif = document.createElement("div");
  notif.classList.add("toast");
  notif.innerText = message;
  notificationContainer.appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 3000);
}

// SHOWING DETAILS OF CART

const showCart = document.getElementById("open");

showCart.addEventListener("click", () => {
  const parentOl = document.getElementsByClassName("cart-items")[0];
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      res.data.data.forEach((product) => {
        const li = `<div class="cart-row">
          <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${product.image}"
              width="100"
              height="100"
            />
            <span class="cart-item-title">${product.title}</span>
          </div>
          <span class="cart-price cart-column">${product.price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>
        </div>`;
        parentOl.innerHTML += li;
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
