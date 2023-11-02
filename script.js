
// Preencher as opções do datalist
async function prencherOptions() {
    const respostaEndPoint = await fetch(endPoint)
    const moedas = await respostaEndPoint.json()
    console.log(moedas)
    
    const moedaUsuário = document.querySelector("#idListaMoedaUsuário")
    const moedaCâmbio = document.querySelector("#idListaMoedaCâmbio")

    moedas.value.forEach((moeda) => {
        moedaUsuário.innerHTML += `<option value="${moeda.simbolo}">${moeda.nomeFormatado}</option>`
        moedaCâmbio.innerHTML += `<option value="${moeda.simbolo}">${moeda.nomeFormatado}</option>`
    });
}
// Chamar função automaticamente
prencherOptions()


var vender = document.querySelector("#idVender")
vender.addEventListener("click", function () {
    document.querySelector("#idMoedaUsuário").value = ""
    document.querySelector("#idMoedaCâmbio").value = "BRL"
    document.querySelector("#idMoedaCâmbio").disabled  = true
    document.querySelector("#idMoedaUsuário").placeholder = "Moeda que você tem."
    document.querySelector("#idMoedaUsuário").disabled  = false
    document.querySelector("#idValorCâmbio").placeholder = "Valor a receber"
    document.querySelector("#idValorCâmbio").disabled  = true
    document.querySelector("#idValorUsuário").placeholder = "Valor que você tem."
    document.querySelector("#idValorUsuário").disable = false
});

var comprar = document.querySelector("#idComprar")
comprar.addEventListener("click", function () {
    document.querySelector("#idMoedaCâmbio").value = ""
    document.querySelector("#idMoedaUsuário").value = "BRL"
    document.querySelector("#idMoedaUsuário").disabled  = true
    document.querySelector("#idMoedaCâmbio").placeholder = "Moeda que você quer."
    document.querySelector("#idMoedaCâmbio").disabled  = false
    document.querySelector("#idValorUsuário").placeholder = "Valor a pagar"
    document.querySelector("#idValorUsuário").disabled  = true
    document.querySelector("#idValorCâmbio").placeholder = "Valor que você quer"
    document.querySelector("#idValorCâmbio").disabled  = false
});





