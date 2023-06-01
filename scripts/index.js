document.addEventListener("DOMContentLoaded", function() {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
  
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
  
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const basketIcon = document.getElementById("basket-icon");
  const basketModal = document.getElementById("basket-modal");
  const basketItemsContainer = document.getElementById("basket-items");
  const buyButton = document.getElementById("buy-button");
  const closeButton = document.getElementsByClassName("close")[0];
  
  let basketItems = JSON.parse(localStorage.getItem("basketItems")) || [];
  
  const updateBasket = () => {
    basketItemsContainer.innerHTML = "";
  
    basketIcon.innerText = basketItems.length;
  
    basketItems.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.innerText = item;
  
      const removeButton = document.createElement("button");
      removeButton.innerText = "Remove";
      removeButton.addEventListener("click", () => {
        basketItems.splice(index, 1);
        updateBasket();
      });
  
      itemElement.appendChild(removeButton);
      basketItemsContainer.appendChild(itemElement);
    });
  
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  };
  
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const item = event.target.parentNode.previousElementSibling.innerText;
      console.log("Adding item:", item);
      basketItems.push(item);
      updateBasket();
    });
  });
  
  basketIcon.addEventListener("click", () => {
    basketModal.style.display = "block";
    updateBasket();
  });
  
  closeButton.addEventListener("click", () => {
    basketModal.style.display = "none";
  });
  
  window.addEventListener("click", (event) => {
    if (event.target === basketModal) {
      basketModal.style.display = "none";
    }
  });
  
  buyButton.addEventListener("click", () => {
    console.log("Items bought:", basketItems);
    basketItems = [];
    updateBasket();
  });
  
  updateBasket();
  