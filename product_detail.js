const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

$(document).ready(async function(){

    var product;

    await fetch('https://dummyjson.com/products/' + productId)
    .then(res => res.json())
    .then(function (res) {
        product = res;
    })

    populateDetails(product);
});

function populateDetails(product){
    var div = document.createElement('div');
    div.classList.add('product-info');

    var img = document.createElement('img');
    img.classList.add('product-image');
    img.src = product.thumbnail;
    img.alt = product.title;

    var prod_name = document.createElement('h2');
    prod_name.innerText = product.title;

    var description = document.createElement('p');
    description.classList.add('description');
    description.innerText = 'Description: ' + product.description;

    var price = document.createElement('p');
    price.classList.add('price');
    price.innerText = 'Price: $' + product.price;

    var discount = document.createElement('p');
    discount.classList.add('discount');
    discount.innerText = 'Discount: ' + product.discountPercentage;

    var rating = document.createElement('p');
    rating.classList.add('rating');
    rating.innerText = 'Rating: ' + product.rating + ' stars';

    var stock = document.createElement('p');
    discount.classList.add('stock');
    discount.innerText = 'Stock: ' + product.stock;

    var brand = document.createElement('p');
    brand.classList.add('brand');
    brand.innerText = 'Brand: ' + product.brand;

    var category = document.createElement('p');
    category.classList.add('category');
    category.innerText = 'Category: ' + product.category;

    div.appendChild(prod_name);
    div.appendChild(description);
    div.appendChild(price);
    div.appendChild(discount);
    div.appendChild(rating);
    div.appendChild(stock);
    div.appendChild(brand);
    div.appendChild(category);

    $('.container').append(img).append(div);
}