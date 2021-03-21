let name_product = document.getElementById("name_product");
let price_product = document.getElementById("price_product");
let description_product = document.getElementById("description_product");
let image_product = document.getElementById("image_product");
let products;
let categories;
let id_product;
let product;
async function load() {
    let fetchProducts = await fetch('http://localhost:8080/api/products?size=100');
    let fetchCategories = await fetch('http://localhost:8080/api/categories');


    products = await fetchProducts.json()
    categories = await fetchCategories.json();

    if (sessionStorage.getItem("id_product") != null) {
        id_product = sessionStorage.getItem("id_product");
        for (x of products) {
            if (x.id == id_product) {

                name_product.innerHTML = x.name;
                price_product.innerHTML = x.price;
                description_product.innerHTML = x.description;
                image_product.src = "data:image/png;base64," + x.imageBase64;
                break;
            }
        }

    }
}
load();