import header from "./header.js"
import footer from "./footer.js"

function $ (elem) {
    return document.querySelector(elem)
}

window.addEventListener('load', function () {
    
    const $email = $("[data-email]")
    const $errorEmail = $("[data-errorEmail]")
    const $pass = $("[data-pass]")
    const $errorPass = $("[data-errorPass]")
    const $form = $("[data-form]")
    const $errorSubmit = $("[data-errorForm]")

    let validationErrors = false;

    $email.addEventListener('blur', function(){
        switch (true) {
            case !$email.value.trim():
                $errorEmail.innerText = "Debe ingresar un email"
                validationErrors = true
                break;
            case !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test($email.value):
                $errorEmail.innerText = "No es un email valido - max 40"
                validationErrors = true
                break;
            default:
                $errorEmail.innerText = ""
                validationErrors = false
                break;
        }
    })
    
    $pass.addEventListener('blur', function(){
        switch (true) {
            case !$pass.value.trim():
                $errorPass.innerText = "Debe ingresar una contraseña"
                validationErrors = true
                break;
            case !/[\w+\W+]{0,41}$/i.test($pass.value):
                $errorPass.innerText = "No es una contraseña valida"
                validationErrors = true
                break;
            default:
                $errorPass.innerText = ""
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

        if(!error) {
            try {
                error = true
                let users = await axios('http://localhost:3000/users')
                users = users.data
                users.forEach(user => {
                    if(user.email === $email.value && user.pass === $pass.value) {
                        error = false;
                    }
                });
                if(error) {
                    $errorSubmit.innerHTML = 'Credenciales Invalidas'
                }
                if(!error && !validationErrors) {
                    window.location.href = "http://127.0.0.1:5500/allProducts.html"
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
})