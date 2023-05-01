const authToken = localStorage.getItem('authToken');

$(document).ready(async function() {
    populateCategories(await getCategories());
    populateProducts(await getProducts());

    // Handler of product filter form 
    $('#product_form').submit(async function(e) {
        e.preventDefault();
    
            var formData = {
                search: $('#search').val(),
                category: $('#category').val(),
                sort: $('#sort').val()
            },
            products = [];
    
            try {
                // Username: kminchelle
                // Password: 0lelplR
                await fetch('https://dummyjson.com/products/search?q=' + formData.search)
                .then(res => res.json())
                .then(function (res) {
                    products = res.products;
                })

                products = formData.category !== 'all' ? filterByCategories(products, formData.category) : products;
                products = formData.sort === 'price' ? sortByPrice(products) : products;
                populateProducts(products.slice(0,10));
            }
            catch(err) {
                console.log('Get products list failed, msg: ' + err);
            }
    })
})

// Function to get the list of products
async function getProducts() {
    var products;

    try {
        await fetch('https://dummyjson.com/products?limit=10')
        .then(res => res.json())
        .then(function (res) {
            products = res.products;
        });  

        return products;
    }
    catch(err) {
        console.log('Get products list failed, msg: ' + err);
    }
    
}

// Function to get the list of categories
async function getCategories() {
    var cats_list;

    try {
        await fetch('https://dummyjson.com/products/categories')
        .then(res => res.json())
        .then(function (res) {
            cats_list = res;
        });  

        return cats_list;
    }
    catch(err) {
        console.log('Get categories list failed, msg: ' + err);
    }
    
}

// Function to populate the list of products
function populateProducts(products) {

    // display products in the list
    var productList = $('#product-list').empty();

    for (var i = 0; i < products.length; i++) {

        var product = products[i];
        var li = document.createElement('li');
        var img = document.createElement('img');
        img.src = product.thumbnail;
        img.alt = product.title;
        img.width = 150;
        img.height = 150;

        var prod_name = document.createElement('h2');
        prod_name.innerText = product.title;

        var price = document.createElement('p');
        price.innerText = 'Price: ' + product.price;

        var category = document.createElement('p');
        category.innerText = 'Category: ' + product.category;

        var description = document.createElement('p');
        description.innerText = product.description;

        var link = document.createElement('a');
        link.href ='product_detail.html?id=' + product.id;
        link.appendChild(img);

        li.appendChild(link);
        li.appendChild(prod_name);
        li.appendChild(price);
        li.appendChild(category);
        li.appendChild(description);

        productList.append(li);
    }
}

// Function to populate the list of categories
function populateCategories(categories) {

    // display products in the list
    var categoryList = $('#category');

    for (var i = 0; i < categories.length; i++) {

        var option = $(document.createElement('option'));
        var category = categories[i];

        option.attr('value', category).text(category);
        categoryList.append(option);
    }
}

// Function to filter the list of products by categories
function filterByCategories(products, category) {
    var res = [];

    products.forEach(product => {

        if (product.category === category) {
            res.push(product)
        }
    });

    return res;
}

// Function to sort the list of products by price in asc order
function sortByPrice(products) {
    return products ? products.sort(compare): products;

    function compare( a, b ) {
        if ( a.price > b.price ){
          return 1;
        }
        if (a.price < b.price ){
          return -1;
        }
        return 0;
      }
}