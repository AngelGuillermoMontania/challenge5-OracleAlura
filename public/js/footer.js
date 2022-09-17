function $ (elem) {
    return document.querySelector(elem)
}

const footer = window.addEventListener('load', async function () {
    
    const $name = $("[data-nameFooter]")
    const $errorName = $("[data-errorNameFooter]")
    const $message = $("[data-messageFooter]")
    const $errorMessage = $("[data-errorMessageFooter]")
    const $buttonSubmit = $("[data-buttonSubmitFooter]")
    const $errorSubmit = $("[data-errorSubmitFooter]")
    const $form = $("[data-formFooter]")

    let validationErrors = false;

    $name.addEventListener('blur', function(){
        switch (true) {
            case !$name.value.trim():
                $errorName.innerText = "Debe ingresar un nombre"
                validationErrors = true
                break;
            case !/[\w+\W+]{0,41}$/i.test($name.value):
                $errorName.innerText = "No es un nombre valido - max 40"
                validationErrors = true
                break;
            default:
                $errorName.innerText = ""
                validationErrors = false
                break;
        }
    })
    
    $message.addEventListener('blur', function(){
        switch (true) {
            case !$message.value.trim():
                $errorMessage.innerText = "Debe ingresar un mensaje"
                validationErrors = true
                break;
            case !/[\w+\W+]{0,141}$/i.test($message.value):
                $errorMessage.innerText = "No es un mensaje valido - max 140"
                validationErrors = true
                break;
            default:
                $errorMessage.innerText = ""
                validationErrors = false
                break;
        }
    })


    $form.addEventListener('submit', function(e){
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
            $form.submit()
        }
    })
})

export default footer