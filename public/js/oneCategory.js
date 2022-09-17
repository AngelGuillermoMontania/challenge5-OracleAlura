import header from "./header.js"
import footer from "./footer.js"

function $ (elem) {
    return document.querySelector(elem)
}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

window.addEventListener('load', async function () {
    const $containCards = $("[data-contain-cards]")
    const $title = $("[data-title]")

    const url = new URLSearchParams(window.location.search);
    const type = url.get('type');

    let responseDB
    try {
        const { data } = await axios("http://localhost:3000/products")
        responseDB = data
    } catch (error) {
        console.log(error)
    }

    const articles = responseDB.filter(product => product.category === type)

    articles.forEach(product => {
        let card = document.createElement("div")
        card.classList.add("card")
        if(product.image.length > 25) {
            card.innerHTML = `<img src="${product.image}" alt="not found">
                <p class="name">${product.title}</p>
                <p class="price">${product.price}</p>
            <p>#1111111</p>`
        } else {
            card.innerHTML = `<img src="./public/images/${product.image}" alt="not found">
                <p class="name">${product.title}</p>
                <p class="price">${product.price}</p>
            <p>#1111111</p>`
        }
        $containCards.appendChild(card)
    });

    $title.innerText = type
    
})