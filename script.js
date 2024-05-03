let products = JSON.parse(localStorage.getItem('products')) || [];
    let cartItems = [];

    function renderProducts(productsToRender) {
      const productList = document.getElementById('productList');
      productList.innerHTML = '';
      productsToRender.forEach((product, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
          ${product.name} - $${product.price}
          <button type="button" class="btn btn-primary btn-sm float-right" onclick="addToCart(${index})">Add to Cart</button>
          <button type="button" class="btn btn-danger btn-sm float-right mr-2" onclick="deleteProduct(${index})">Delete</button>
          <button type="button" class="btn btn-secondary btn-sm float-right mr-2" onclick="editProduct(${index})">Edit</button>
        `;
        productList.appendChild(listItem);
      });
    }

    function addProduct(name, price) {
      products.push({ name, price });
      localStorage.setItem('products', JSON.stringify(products));
      renderProducts(products);
    }

    function deleteProduct(index) {
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
      renderProducts(products);
    }

    function editProduct(index) {
      const newName = prompt('Enter new product name:');
      const newPrice = prompt('Enter new price:');
      if (newName && newPrice) {
        products[index] = { name: newName, price: parseFloat(newPrice) };
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(products);
      }
    }

    function addToCart(index) {
      cartItems.push(products[index]);
      renderCart();
    }

    function removeFromCart(index) {
      cartItems.splice(index, 1);
      renderCart();
    }

    function renderCart() {
      const cartList = document.getElementById('cartList');
      cartList.innerHTML = '';
      cartItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
          ${item.name} - $${item.price}
          <button type="button" class="btn btn-danger btn-sm float-right" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(listItem);
      });
    }

    document.getElementById('productForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const productName = document.getElementById('productName').value;
      const productPrice = parseFloat(document.getElementById('productPrice').value);
      addProduct(productName, productPrice);
      document.getElementById('productName').value = '';
      document.getElementById('productPrice').value = '';
    });

    function searchProducts() {
      const searchInput = document.getElementById('searchInput').value.toLowerCase();
      const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
      renderProducts(filteredProducts);
    }

    function checkout() {
      if (cartItems.length === 0) {
        alert('Your cart is empty!');
      } else {
        const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        alert(`Checkout successful! Total amount: $${totalPrice.toFixed(2)}`);
        cartItems = [];
        renderCart();
      }
    }

    renderProducts(products);