fetch('https://dummyjson.com/products/1')
.then(res => res.json())
.then(function(res) {
    console.log(res);
});
            