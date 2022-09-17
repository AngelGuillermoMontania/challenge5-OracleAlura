import header from "./header.js"
import footer from "./footer.js"

function $ (elem) {
    return document.querySelector(elem)
}

window.addEventListener('load', function () {

    let validationErrors = false
    
    const $file = $("[data-file]")
    const $errorFile = $("[data-errorFile]")
    const $nameProduct = $("[data-nameProduct]")
    const $errorNameProduct = $("[data-errorNameProduct]")
    const $category = $("[data-category]")
    const $errorCategory = $("[data-errorCategory]")
    const $price = $("[data-price]")
    const $errorPrice = $("[data-errorPrice]")
    const $description = $("[data-description]")
    const $errorDescription = $("[data-errorDescription]")
    const $form = $("[data-form]")
    const $errorSubmit = $("[data-errorForm]")

    $file.addEventListener('blur', function(){
        switch (true) {
            case !$file.value.trim():
                $errorFile.innerText = "Debe ingresar una url"
                validationErrors = true
                break;
            case !/^http[s]?:\/\/[\w\W]+([\.]+[\w\W]+)+$/i.test($file.value):
                $errorFile.innerText = "No es un url valido"
                validationErrors = true
                break;
            default:
                $errorFile.innerText = ""
                validationErrors = false
                break;
        }
    })
    
    $category.addEventListener('blur', function(){
        switch (true) {
            case !$category.value.trim():
                $errorCategory.innerText = "Debe ingresar un nombre de producto"
                validationErrors = true
                break;
            case !/^[a-zA-Z0-9-\sñáéíóúü:=%&$·"!¿/[ª!?'¡].{0,20}$/i.test($category.value):
                $errorCategory.innerText = "No es un nombre de producto"
                validationErrors = true
                break;
            default:
                $errorCategory.innerText = ""
                validationErrors = false
                break;
        }
    })

    $nameProduct.addEventListener('blur', function(){
        switch (true) {
            case !$nameProduct.value.trim():
                $errorNameProduct.innerText = "Debe ingresar un nombre de producto"
                validationErrors = true
                break;
            case !/^[a-zA-Z0-9-\sñáéíóúü:=%&$·"!¿/[ª!?'¡].{0,20}$/i.test($nameProduct.value):
                $errorNameProduct.innerText = "No es un nombre de producto"
                validationErrors = true
                break;
            default:
                $errorNameProduct.innerText = ""
                validationErrors = false
                break;
        }
    })

    $price.addEventListener('blur', function(){
        switch (true) {
            case !$price.value.trim():
                $errorPrice.innerText = "Debe ingresar un precio"
                validationErrors = true
                break;
            case !/^[0-9].{0,5}$/i.test($price.value):
                $errorPrice.innerText = "No es un precio valido"
                validationErrors = true
                break;
            default:
                $errorPrice.innerText = ""
                validationErrors = false
                break;
        }
    })

    $description.addEventListener('blur', function(){
        switch (true) {
            case !$description.value.trim():
                $errorDescription.innerText = "Debe ingresar una descripcion"
                validationErrors = true
                break;
            case !/^[a-zA-Z0-9-\sñáéíóúü:=%&$·"!¿/[ª!?'¡].{0,150}$/i.test($description.value):
                $errorDescription.innerText = "No es una descripcion valida"
                validationErrors = true
                break;
            default:
                $errorDescription.innerText = ""
                validationErrors = false
                break;
        }
    })

    $form.addEventListener('submit', async function(e){

        let error = false;
        e.preventDefault();
        
        let elementsForm = this.elements;

        for (let index = 0; index < elementsForm.length - 1; index++){
            if(elementsForm[index].value == ""){
                elementsForm[index].classList.add('text-errors')
                elementsForm[index].style.backgroundColor = 'rgba(255, 0, 0, 0.2)'
                $errorSubmit.style.color = 'red'
                $errorSubmit.innerHTML = 'Los campos señalados son obligatorios'
                error = true;
            }
        }

        if(!error && !validationErrors) {
            const responsePost = await axios.post("http://localhost:3000/products", {
                "id": uuid.v4(),
                "title": $nameProduct.value,
                "price": `$ ${$price.value}`,
                "image": $file.value,
                "description": $description.value,
                "category": $category.value
            })
            $form.submit()
        }
    })
})