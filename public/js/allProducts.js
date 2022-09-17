import header from "./header.js"
import footer from "./footer.js"

function $ (elem) {
    return document.querySelector(elem)
}

window.addEventListener('load', async function () {
    
    const $containCards = $("[data-contain-cards]")

    const { data } = await axios("http://localhost:3000/products")

    data.forEach(product => {
        let card = document.createElement("div")
        card.classList.add("card")
        if(product.image.length > 25) {
            card.innerHTML = `<img src="${product.image}" alt="not found">
                <p class="name">${product.title}</p>
                <p class="price">${product.price}</p>
            <p>#1111111</p>
            <button onclick="delete(${product.id})">Delete</button>`
        } else {
            card.innerHTML = `<img src="./public/images/${product.image}" alt="not found">
                <p class="name">${product.title}</p>
                <p class="price">${product.price}</p>
            <p>#1111111</p>`
        }
        $containCards.appendChild(card)
    });
})

function allProducts (id) {
    console.log(id)
}