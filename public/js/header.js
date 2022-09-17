function $ (elem) {
    return document.querySelector(elem)
}

const footer = window.addEventListener('load', async function () {
    
    const $search = $("[data-search]")
    const $formSearch = $("[data-formSearch]")

    let validationErrors = false;

    $search.addEventListener('blur', function(){
        switch (true) {
            case !$search.value.trim():
                validationErrors = true
                break;
            case !/[\w+\W+]{0,41}$/i.test($search.value):
                validationErrors = true
                break;
            default:
                validationErrors = false
                break;
        }
    })

    $formSearch.addEventListener('submit', async function(e){
        let error = false;

        e.preventDefault();

        let elementsForm = this.elements;

        for (let index = 0; index < elementsForm.length - 1; index++){
            if(elementsForm[index].value == ""){
                error = true;
            }
        }

        if(!error && !validationErrors) {
            try {
                window.location.href = `http://127.0.0.1:5500/search.html?title=${$search.value}`
            } catch (error) {
                console.log(error)
            }
        }
    })
})

export default footer