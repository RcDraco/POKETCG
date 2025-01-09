document.addEventListener("DOMContentLoaded", function () {
    // Función para manejar la adición de productos al carrito
    if (
      window.location.pathname.includes("ETBs.html") ||
      window.location.pathname.includes("index.html") ||
      window.location.pathname.includes("BoosterBoxes.html") ||
      window.location.pathname.includes("accesorios.html")
    ) {
      const addToCartButtons = document.querySelectorAll(".add-to-cart");
  
      addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
          const productElement = button.closest(".item");
  
          // Obtener los datos del producto
          const productId = productElement.getAttribute("data-id");
          const productName = productElement.getAttribute("data-name");
          const productPrice = parseFloat(productElement.getAttribute("data-price"));
  
          const product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
          };
  
          addProductToCart(product);
        });
      });
  
      function addProductToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
        // Verificar si el producto ya existe en el carrito
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push(product);
        }
  
        localStorage.setItem("cart", JSON.stringify(cart));
  
        // Actualiza la UI inmediatamente después de añadir el producto
        updateCartUI();
      }
    }
  
    // Función para mostrar el carrito y manejar su contenido
    if (window.location.pathname.includes("carrito.html")) {
      const cartItemsList = document.querySelector(".cart-items");
      const totalQuantityElement = document.getElementById("total-quantity");
      const subtotalElement = document.getElementById("subtotal");
      const totalPriceElement = document.getElementById("total-price");
  
      function updateCartUI() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsList.innerHTML = "";
        let totalQuantity = 0;
        let subtotal = 0;
  
        cart.forEach(product => {
          const li = document.createElement("li");
          li.classList.add("cart-item");
          li.innerHTML = `
            <div class="item-details">
              <div class="item-info">
                <span class="item-name">${product.name}</span>
                <span class="item-quantity">x${product.quantity}</span>
              </div>
            </div>
            <div class="item-actions">
              <span class="item-price">${(product.price * product.quantity).toFixed(2)}€</span>
              <button class="remove-item" data-id="${product.id}">&times;</button>
            </div>
          `;
          cartItemsList.appendChild(li);
  
          totalQuantity += product.quantity;
          subtotal += product.price * product.quantity;
        });
  
        totalQuantityElement.textContent = totalQuantity;
        subtotalElement.textContent = subtotal.toFixed(2);
        totalPriceElement.textContent = subtotal.toFixed(2);
      }
  
      // Llamar a la función de actualización al cargar la página
      updateCartUI();
  
      // Eliminar productos del carrito
      cartItemsList.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item")) {
          const productId = event.target.getAttribute("data-id");
  
          // Obtener el carrito y eliminar el producto correspondiente
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart = cart.filter(product => product.id !== productId);
  
          // Guardar el carrito actualizado en localStorage
          localStorage.setItem("cart", JSON.stringify(cart));
  
          // Actualizar la UI después de la eliminación
          updateCartUI();
        }
      });
  
      // Vaciar el carrito
      const clearCartButton = document.getElementById("clear-cart");
      clearCartButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        updateCartUI();
      });
  
      // Botón de Checkout
      const checkoutButton = document.getElementById("checkout");
      checkoutButton.addEventListener("click", function () {
        alert("¡Gracias por tu compra!");
      });
    }
  
    // Animación para los botones de "Añadir al carrito"
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", function () {
        // Añadir clase temporal para mostrar la animación
        button.classList.add("added");
  
        // Retirar la clase después de 1 segundo
        setTimeout(() => {
          button.classList.remove("added");
        }, 1000);
      });
    });
  });