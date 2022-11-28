window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/orderDetails")
    .then((res) => {
      console.log(res.data);
      res.data.data.forEach((order) => {
        console.log(order.id);
        order.products.forEach((product) => {
          console.log(product);
          const parent = document.getElementById("mytable");
          const newItem = `<tr>
            <td>
              <img
                class="cart-item-image"
                src="${product.image}"
                width="100"
                height="100"
              />
              <span>${product.title}</span>
            </td>
            <td><span>$${product.price}</span></td>
            <td>
              <label>${product.orderItem.quantity}</label>
            
            </td>
          </tr>`;
          parent.innerHTML += newItem;
        });
      });
    })
    .catch((err) => console.log(err));
});
