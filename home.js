<script async src="https://www.googletagmanager.com/gtag/js?id=G-PH27ZLC27L"></script>

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'id=G-PH27ZLC27L');

    var didAddToCart = false;
    setTimeout(function () {
        if (!didAddToCart) {
            gtag('event', 'fake_click', {
                'event_category': 'engagement',
                'event_label': 'User did not add anything to the cart'
            });
        }
    }, 10000);

    function trackAddToCart(event) {
        gtag('event', 'add_to_cart', {
            'event_category': 'engagement',
            'event_label': event.target.previousElementSibling.textContent
        });
        didAddToCart = true;
    }

    window.addEventListener('load', function () {
        var addToCartButtons = document.querySelectorAll('.product button');
        addToCartButtons.forEach(function (button) {
            button.addEventListener('click', trackAddToCart);
        });

        // Load the JSON file containing user activity
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var user_activity = JSON.parse(xhr.responseText);

                // Find users who used the cart
                var cart_users = [];
                var no_cart_users = [];
                for (var i = 0; i < user_activity.length; i++) {
                    if (user_activity[i].cart.length > 0) {
                        cart_users.push(user_activity[i].name);
                    } else {
                        no_cart_users.push(user_activity[i].name);
                    }
                }

                // Display the number of users who used the cart 
                var cartUserCount = document.getElementById('cart-user-count');
                cartUserCount.textContent = cart_users.length;

                // Display the number of users who did not use the cart
                var noCartUserCount = document.getElementById('no-cart-users');
                noCartUserCount.textContent = no_cart_users.length;

                // Display the user activity data
                var user_activity_div = document.getElementById('user-activity');
                var user_activity_list = document.createElement('ul');
                for (var i = 0; i < user_activity.length; i++) {
                    var user = user_activity[i];
                    var user_item = document.createElement('li');
                    user_item.textContent = user.name + ' (' + user.cart.length + ' items in cart)';
                    user_activity_list.appendChild(user_item);
                }
                user_activity_div.appendChild(user_activity_list);
            }
        });
        xhr.open('GET', 'user_activity.json');
        xhr.send();
    });
