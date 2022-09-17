import header from "./header.js"
import footer from "./footer.js"

function $ (elem) {
    return document.querySelector(elem)
}

window.addEventListener('load', async function () {
    
    const $containCardsStarWars = $("[data-containCardsStarWars]")
    const $containCardsConsoles = $("[data-containCardsConsoles]")
    const $containCardsDiverse = $("[data-containCardsDiverse]")

    let responseDB
    try {
        const { data } = await axios("http://localhost:3000/products")
        responseDB = data
    } catch (error) {
        console.log(error)
    }

    const articlesStarWars = responseDB.filter(product => product.category === "Star Wars")
    const articlesConsoles = responseDB.filter(product => product.category === "Consolas")
    const articlesDiverse = responseDB.filter(product => product.category === "Diversos")

    let countStarWars = 0
    articlesStarWars.forEach(product => {
        if(countStarWars < 6) {
            let card = document.createElement("div")
            card.classList.add("card")
            if(countStarWars > 3) {
                card.classList.add("card-desktop")
            }
            if(product.image.length > 18) {
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
            $containCardsStarWars.appendChild(card)
        }
        countStarWars++
    });

    let countConsoles = 0
    articlesConsoles.forEach(product => {
        if(countConsoles < 6) {
            let card = document.createElement("div")
            card.classList.add("card")
            if(countConsoles > 3) {
                card.classList.add("card-desktop")
            }
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
            $containCardsConsoles.appendChild(card)
        }
        countConsoles++
    });

    let countDiverse = 0
    articlesDiverse.forEach(product => {
        if(countDiverse < 6) {
            let card = document.createElement("div")
            card.classList.add("card")
            if(countDiverse > 3) {
                card.classList.add("card-desktop")
            }
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
            $containCardsDiverse.appendChild(card)
        }
        countDiverse++
    });
    
})