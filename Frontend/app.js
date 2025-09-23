// Active state
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        button.classList.add("active");
    });
});


// Fetching and displaying products

const productsContainer = document.getElementById("products-container");
let allProducts = [];

// Fetch products from API
async function fetchProducts() {
  try {
    let productUrl = "https://fakestoreapi.com/products";
    const response = await fetch(productUrl);
    const data = await response.json();
    allProducts = data;
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error Occured while fetching products:", error);
  }
}

// Display products
function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    const shortTitle = product.title.length > 15 ? product.title.substring(0, 15) + "..." : product.title;
    const shortDesc = product.description.length > 60 ? product.description.substring(0, 60) + "..." : product.description;

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${shortTitle}</h3>
      <p>${shortDesc}</p>
      <div class="price">$ ${product.price.toFixed(2)}</div>
      <div class="card-buttons">
        <button>Details</button>
        <button>Add to Cart</button>
      </div>
    `;

    productsContainer.appendChild(card);
  });
}


// filter products by category
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");  
        if (category === "all") {
            displayProducts(allProducts);
        }
        else {
            const filteredProducts = allProducts.filter(product => product.category === category);
            displayProducts(filteredProducts);
        }   
    });
});

fetchProducts();



