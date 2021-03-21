let stringHTML = {
    string: ""
};
let stringHTMLCate = "";
let listCate = [];
let cate = document.getElementById("cate");
let menu = document.getElementById("menu");
let id;
async function load() {

    let fetchProducts = await fetch('http://localhost:8080/api/products?size=100');
    let fetchCategories = await fetch('http://localhost:8080/api/categories');


    products = await fetchProducts.json()
    categories = await fetchCategories.json();



    for (x of categories) {
        let ob = {
            id: 0,
            sum: 0
        };

        ob.id = x.id;
        listCate.push(ob);
    }
    for (let i = 0; i < products.length; i++) {
        for (x of products[i].categories) {
            for (j of listCate) {
                if (x.id == j.id) {
                    j.sum++;
                    break;
                }
            }
        }
    }
    for (x in categories) {
        if (listCate[x].sum != 0) {
            create_cate(categories[x]);
        }
    }
    cate.innerHTML = "";
    cate.innerHTML = stringHTMLCate;


    for (let i = 0; i < products.length; i++) {
        for (x of products[i].categories) { //product thieu [i]
            if (x.id == 9) { //thieu dau = 
                create_item(products[i], stringHTML); //truyen vao doi tuong stringHTML
            }
        }
    }
    menu.innerHTML = "";
    menu.innerHTML = stringHTML.string;

}

function show(id) {

    sessionStorage.setItem('id', id);
}

function create_cate(category) {
    let stringItem = "";

    stringItem += "<div class=\"col-lg-2 col-md-4 col-6 welcome-image\" onclick=\"show(" + category.id + ")\">";
    stringItem += "<div class=\"boxhny13\">";
    stringItem += "<a href=\"ecommerce.html\">";
    stringItem += "<img src=\"" + category.imageUrl + "\" class=\"img-fluid\" alt=\"\" />";
    stringItem += "<div class=\"boxhny-content\">";
    stringItem += "<h3 class=\"title\">" + category.name + "</h3>";
    stringItem += "</div>";
    stringItem += "</a>";
    stringItem += "</div>";
    stringItem += "<h4><a href=\"ecommerce.html\">" + category.name + "</a></h4>";
    stringItem += "</div>";
    stringHTMLCate += stringItem;
    console.log(stringHTMLCate);
}

function create_item(products, ob) {
    let stringItem = "";
    stringItem += "<div class=\"col-lg-3 col-6 product-incfhny mt-4\">";
    stringItem += "<div class=\"product-grid2 transmitv\">";
    stringItem += "<div class=\"product-image2\">";
    stringItem += "<a href=\"single.html\">";
    stringItem += "<img class=\"pic-1 img-fluid\"onclick=\"show_product(" + products.id + ")\" src=\"data:image/png;base64," + products.imageBase64 + "\">";
    stringItem += "<img class=\"pic-2 img-fluid\"onclick=\"show_product(" + products.id + ")\" src=\"data:image/png;base64," + products.imageBase64 + "\">";
    stringItem += "</a>";
    stringItem += "<ul class=\"social\">";
    stringItem += "<li><a href=\"#\" data-tip=\"Quick View\"><span class=\"fa fa-eye\"></span></a></li>";

    stringItem += "<li><a href=\"#\" data-tip=\"Add to Cart\"><span class=\"fa fa-shopping-bag\"></span></a>";
    stringItem += "</li>";
    stringItem += "</ul>";
    stringItem += "<div class=\"transmitv single-item\">";
    stringItem += "<form action=\"#\" method=\"post\">";
    stringItem += "<input type=\"hidden\" name=\"cmd\" value=\"_cart\">";
    stringItem += "<input type=\"hidden\" name=\"add\" value=\"1\">";
    stringItem += "<input type=\"hidden\" name=\"transmitv_item\" value=\"Women Maroon Top\">";
    stringItem += "<input type=\"hidden\" name=\"amount\" value=\"899.99\">";
    stringItem += "<button type=\"submit\" class=\"transmitv-cart ptransmitv-cart add-to-cart\">";
    stringItem += "Add to Cart";
    stringItem += "</button>";
    stringItem += "</form>";
    stringItem += "</div>";
    stringItem += "</div>";
    stringItem += "<div class=\"product-content\">";
    stringItem += "<h3 class=\"title\"><a href=\"#\">" + products.name + "</a></h3>";
    stringItem += "<span class=\"price\">" + products.price + "</span>";
    stringItem += "</div>";
    stringItem += "</div>";
    stringItem += "</div>";
    ob.string += stringItem;
}

function show_product(id) {
    sessionStorage.setItem("id_product", id);
}
load();