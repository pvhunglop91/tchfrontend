let stringHTML = {
    string: ""
};
let stringHTMLCate = "";
let listCate = [];
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

            if (x.id == 1) {
                create_item(products[i], stringHTML);

            }
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
            create_cate(categories[x], listCate[x].sum);
        }
    }
    // menu.innerHTML = stringHTML.string;

    document.getElementById("cate").innerHTML = stringHTMLCate;
    if (sessionStorage.getItem('id') != null) {

        id = sessionStorage.getItem('id');

    }
    show_cate(id);
}

function show_cate(id) {
    stringHTML.string = "";
    for (let i = 0; i < products.length; i++) {
        for (x of products[i].categories) {

            if (x.id == id) {
                create_item(products[i], stringHTML);
                console.log(stringHTML.string);
            }

        }
    }
    menu.innerHTML = "";
    menu.innerHTML = stringHTML.string;
}

function create_cate(category, sum) {
    let stringItem = "";

    stringItem += "<li class=\"list-group-item d-flex justify-content-between align-items-center\" onclick=\"show_cate(" + category.id + ")\">";
    stringItem += category.name;
    stringItem += "<span class=\"badge badge-primary badge-pill\">" + sum + "</span>";
    stringItem += "</li>";
    stringHTMLCate += stringItem;
}

function create_item(products, ob) {
    let stringItem = "";
    stringItem += "<div class=\"col-lg-4 col-6 product-incfhny mb-4\">";
    stringItem += "<div class=\"product-grid2 transmitv\">";
    stringItem += "<div class=\"product-image2\">";
    stringItem += "<a href=\"single.html\">";
    stringItem += "<img class=\"pic-1 \" onclick=\"show_product(" + products.id + ")\" src=\"data:image/png;base64," + products.imageBase64 + "\">";
    stringItem += "<img class=\"pic-2 \" onclick=\"show_product(" + products.id + ")\"src=\"data:image/png;base64," + products.imageBase64 + "\">";
    stringItem += "</a>";
    stringItem += "<ul class=\"social\">"
    stringItem += "<li><a href=\"#\" data-tip=\"Quick View\"><span class=\"fa fa-eye\"></span></a></li>";
    stringItem += "<li><a href=\"ecommerce.html\" data-tip=\"Add to Cart\"><span";
    stringItem += "class=\"fa fa-shopping-bag\"></span></a>";
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
    stringItem += "<h3 class=\"title\"><a href=\"ecommerce-single.html\">" + products.name + "</a>";
    stringItem += "</h3>";
    stringItem += "<span class=\"price\">" + products.price + "</span>";
    stringItem += "</div>";
    stringItem += "</div>";
    stringItem += "</div>";
    // return stringItem;
    ob.string += stringItem;
}



function show_product(id) {
    sessionStorage.setItem("id_product", id);
}

load();