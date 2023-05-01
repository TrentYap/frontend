$(document).ready(()=> {

    //Submit function
    $('#login_form').submit(function(e) {

        e.preventDefault();

        var formData = {
            username: $('#username').val(),
            password: $('#password').val()
        };

        try {
            // Username: kminchelle
            // Password: 0lelplR
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(function (res) {
                if (res.ok === false) {
                    alert('Credential error, please try again');
                    $('#login_form')[0].reset();
                }
                else {
                    // Login Success
                    alert('Login succes');
                    localStorage.setItem('authToken', res.token);
                    window.location.href = "product.html"; // redirect to product page
                }
            })
        }
        catch(err) {
            console.log(err);
        }
        
    });
    
});


