document.addEventListener("DOMContentLoaded", function() {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
  
    // I'm adding this section so I don't have to keep updating this pen every year :-)
    // remove this if you don't need it
    let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "09/30/",
      birthday = dayMonth + yyyy;
  
    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    // end
  
    const countDown = new Date(birthday).getTime(),
      x = setInterval(function() {
        const now = new Date().getTime(),
          distance = countDown - now;
          
          document.getElementById("days").innerText = Math.floor(distance / day),
          document.getElementById("hours").innerText = Math.floor((distance % day) / hour),
          document.getElementById("minutes").innerText = Math.floor((distance % hour) / minute),
          document.getElementById("seconds").innerText = Math.ceil((distance % minute) / second) === 60 ? 0 : Math.ceil((distance % minute) / second);
          
  
        
        if (distance < 0) {
          clearInterval(x);
        }
      }, 0);
  });
  


  let shoppingCart = (function() {

    cart = []
    
    function Item(name, price, count) {
        this.name = name
        this.price = price
        this.count = count
    }
    
    
    function save() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
    
    function load() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    
    
    if (sessionStorage.getItem("shoppingCart") != null) {
        load()
    }
    
    
    let obj = {}
        
    
    obj.addItemCart = function(name, price, count) {
        for(var item in cart) {
            if(cart[item].name === name) {
            cart[item].count ++
            save()
            return
        }
    }
    
    
    var item = new Item(name, price, count)
    cart.push(item)
    save()
    }
    
    
    obj.setCountForItem = function(name, count) {
        for(var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count
                break;
            }
        }
    }
    
    
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart[item].count --
            if(cart[item].count === 0) {
                cart.splice(item, 1)
            }
            break
        }
    }
    save()
    }
      
    obj.removeEverything = function(name) {
        for(var item in cart) {
            if(cart[item].name === name) {
                cart.splice(item, 1)
                break
            }
        }
        save()
    }
    
    
    obj.clear = function() {
        cart = []
        save()
    }
    
    
    obj.totalCount = function() {
        let totalCount = 0
        for(var item in cart) {
            totalCount += cart[item].count
        }
        return totalCount
    }
      
    
    obj.fullCart = function() {
        let fullCart = 0
        for(var item in cart) {
            fullCart += cart[item].price * cart[item].count
        }
        return Number(fullCart.toFixed(2))
    }
    
      
    obj.cartList = function() {
        let cartCopy = []
        for(i in cart) {
            item = cart[i]
            itemCopy = {}
            for(a in item) {
                itemCopy[a] = item[a]
      
            }
            itemCopy.total = Number(item.price * item.count).toFixed(2)
            cartCopy.push(itemCopy)
        }
        return cartCopy
    }
    
    
    
    return obj
    })()
      
      
    
    document.querySelectorAll('.add-btn ').forEach(function(element) {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            var name = this.getAttribute("data-name")
            var price = Number(this.getAttribute("data-price"))
            shoppingCart.addItemCart(name, price, 1)
            displayCart();
        });
    });
    
      
    
    
    document.querySelector('.clear-cart').addEventListener("click", function() {
        shoppingCart.clear()
        displayCart()
    });
    
    
      
    function displayCart() {
        var cartArray = shoppingCart.cartList()
        var output = ""
        for (var i in cartArray) {
            output += "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>(" + cartArray[i].price + ")</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
            "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
            "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
            "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
            " = " +
            "<td>" + cartArray[i].total + "</td>" +
            "</tr>"
            }
            document.querySelector('.show-cart').innerHTML = output
            document.querySelector('.total-cart').innerHTML = shoppingCart.fullCart()
            document.querySelector('.total-count').innerHTML = shoppingCart.totalCount()
    }
      
      
    document.querySelector('.show-cart').addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-item")) {
            var name = event.target.getAttribute("data-name")
            shoppingCart.removeEverything(name)
            displayCart()
        }
    });
    
      
    
    document.querySelector('.show-cart').addEventListener("click", function(event) {
        if (event.target.classList.contains("minus-item")) {
            var name = event.target.getAttribute("data-name");
            shoppingCart.removeItemFromCart(name)
            displayCart()
        }
    });
    
      
    
    document.querySelector('.show-cart').addEventListener("click", function(event) {
        if (event.target.classList.contains("plus-item")) {
            var name = event.target.getAttribute("data-name")
            shoppingCart.addItemCart(name)
            displayCart()
        }
    });
    
    
    document.querySelector('.show-cart').addEventListener("change", function(event) {
        if (event.target.classList.contains("item-count")) {
            var name = event.target.getAttribute("data-name")
            var count = event.target.value
            shoppingCart.setCountForItem(name, count)
            displayCart()
        }
    });
    
    
    displayCart()