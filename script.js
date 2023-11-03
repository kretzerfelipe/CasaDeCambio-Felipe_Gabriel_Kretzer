//Pegar moedas
const endPoint = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json"


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
    })
}
// Chamar função automaticamente
prencherOptions()

var apertou = false
var vender = document.querySelector("#idVender")
vender.addEventListener("click", function () {
    document.querySelector("#idMoedaUsuário").value = ""
    document.querySelector("#idMoedaCâmbio").value = "BRL"
    document.querySelector("#idMoedaCâmbio").disabled = true
    document.querySelector("#idMoedaUsuário").placeholder = "Moeda que você tem."
    document.querySelector("#idMoedaUsuário").disabled = false
    document.querySelector("#idValorCâmbio").placeholder = "Valor a receber"
    document.querySelector("#idValorCâmbio").disabled = true
    document.querySelector("#idValorCâmbio").value = ""
    document.querySelector("#idValorUsuário").placeholder = "Valor que você tem."
    document.querySelector("#idValorUsuário").disabled = false
    document.querySelector("#idValorUsuário").value = "false"
    apertou = true
})

var comprar = document.querySelector("#idComprar")
comprar.addEventListener("click", function () {
    document.querySelector("#idMoedaCâmbio").value = ""
    document.querySelector("#idMoedaUsuário").value = "BRL"
    document.querySelector("#idMoedaUsuário").disabled = true
    document.querySelector("#idMoedaCâmbio").placeholder = "Moeda que você quer."
    document.querySelector("#idMoedaCâmbio").disabled = false
    document.querySelector("#idValorUsuário").placeholder = "Valor a pagar"
    document.querySelector("#idValorUsuário").disabled = true
    document.querySelector("#idValorUsuário").value = ""
    document.querySelector("#idValorCâmbio").placeholder = "Valor que você quer"
    document.querySelector("#idValorCâmbio").disabled = false
    document.querySelector("#idValorCâmbio").value = "false"
    apertou = true
})

var venderE = document.querySelector("#idVenderE")
venderE.addEventListener("click", function () {
    document.querySelector("#idMoedaCâmbio").value = ""
    document.querySelector("#idMoedaUsuário").value = ""
    document.querySelector("#idMoedaUsuário").placeholder = "Moeda que você tem."
    document.querySelector("#idMoedaUsuário").disabled = false
    document.querySelector("#idMoedaCâmbio").placeholder = "Moeda que você quer."
    document.querySelector("#idMoedaCâmbio").disabled = false
    document.querySelector("#idValorUsuário").placeholder = "Valor que você tem."
    document.querySelector("#idValorUsuário").disabled = false
    document.querySelector("#idValorUsuário").value = ""
    document.querySelector("#idValorCâmbio").placeholder = "Valor que você receberá"
    document.querySelector("#idValorCâmbio").disabled = true
    document.querySelector("#idValorCâmbio").value = "false"
    apertou = true
})

var trocarE = document.querySelector("#idComprarE")
trocarE.addEventListener("click", function () {
    document.querySelector("#idMoedaCâmbio").value = ""
    document.querySelector("#idMoedaUsuário").value = ""
    document.querySelector("#idMoedaUsuário").placeholder = "Moeda que você tem."
    document.querySelector("#idMoedaUsuário").disabled = false
    document.querySelector("#idMoedaCâmbio").placeholder = "Moeda que você quer."
    document.querySelector("#idMoedaCâmbio").disabled = false
    document.querySelector("#idValorUsuário").placeholder = "Valor que você pagará."
    document.querySelector("#idValorUsuário").disabled = true
    document.querySelector("#idValorUsuário").value = ""
    document.querySelector("#idValorCâmbio").placeholder = "Valor que você quer."
    document.querySelector("#idValorCâmbio").disabled = false
    document.querySelector("#idValorCâmbio").value = "false"
    apertou = true
})

// Data de hoje
var hoje = new Date()

var atual = new Date(hoje.getTime())
atual.setDate(hoje.getDate())

var dd = atual.getDate()
var mm = atual.getMonth() + 1
var yyyy = atual.getFullYear()

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

var dataAtual = mm + '-' + dd + '-' + yyyy

console.log(dataAtual)

var buscarCotação = document.querySelector("#idBuscarCotação")
buscarCotação.addEventListener("click", async function calcularCotação() {
    if (!apertou) {
        alert("Escolha uma opção")
    } else {
        let moedaEscolhida = ""
        let moedaDeTroca = ""
        let moedaVálida = false
        let moeda2Válida = false
        const respostaEndPoint = await fetch(endPoint)
        const moedas = await respostaEndPoint.json()
    
        if (document.querySelector("#idVender").checked) {
            moedaEscolhida = document.querySelector("#idMoedaUsuário").value
            moedas.value.forEach((moeda) => {
                if (moedaEscolhida == moeda.simbolo) {
                    moedaVálida = true
                    moeda2Válida = true
                }
            })
        } else if (document.querySelector("#idComprar").checked) {
            moedaEscolhida = document.querySelector("#idMoedaCâmbio").value
    
            moedas.value.forEach((moeda) => {
                if (moedaEscolhida == moeda.simbolo) {
                    moedaVálida = true
                    moeda2Válida = true
                }
            })
        } else {
            moedaEscolhida = document.querySelector("#idMoedaUsuário").value
            moedaDeTroca = document.querySelector("#idMoedaCâmbio").value
    
            moedas.value.forEach((moeda) => {
                if (moedaEscolhida == moeda.simbolo && moedaEscolhida != "BRL") {
                    moedaVálida = true
                } 
                if (moedaDeTroca == moeda.simbolo && moedaDeTroca != moedaEscolhida && moedaDeTroca != "BRL") {
                    moeda2Válida = true
                }
            })
        }
    
        if (!moedaVálida || !moeda2Válida) {
            alert("Insira uma moeda válida")
            throw new Error("Moeda inválida. Insira uma moeda válida.")
        }
    
        var respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaEscolhida + "'&@dataInicial='" + dataAtual + "'&@dataFinalCotacao='" + dataAtual + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
        var cotação = await respostaCotaçãoEndPoint.json()
    
        var dias = 0
        if (cotação.value.length == 0) {
            while (cotação.value.length == 0) {
                dias += 1
    
                // Última data disponível
    
                var disponível = new Date(hoje.getTime())
                disponível.setDate(hoje.getDate() - dias)
    
                dd = disponível.getDate()
                mm = disponível.getMonth() + 1
                yyyy = disponível.getFullYear()
    
                if (dd < 10) {
                    dd = '0' + dd
                }
    
                if (mm < 10) {
                    mm = '0' + mm
                }
    
                var dataDisponível = mm + '-' + dd + '-' + yyyy
    
                console.log(dataDisponível)
    
                respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaEscolhida + "'&@dataInicial='" + dataDisponível + "'&@dataFinalCotacao='" + dataDisponível + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
                cotação = await respostaCotaçãoEndPoint.json()
    
                respostaCotação2EndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaDeTroca + "'&@dataInicial='" + dataDisponível + "'&@dataFinalCotacao='" + dataDisponível + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
                cotação2 = await respostaCotação2EndPoint.json()
    
                console.log(cotação)
    
            }
        }
        let valorMoedaEstrangeira = ""
        let valorReais = ""
        let valorMoedaEstrangeira2 = ""
    
        if (document.querySelector("#idVender").checked) {
            valorMoedaEstrangeira = document.querySelector("#idValorUsuário").value
            valorReais = valorMoedaEstrangeira * cotação.value[cotação.value.length - 1].cotacaoCompra
            document.querySelector("#idValorCâmbio").value = valorReais
        }
    
        else if (document.querySelector("#idComprar").checked) {
            valorReais = document.querySelector("#idValorCâmbio").value
            valorMoedaEstrangeira = valorReais * cotação.value[cotação.value.length - 1].cotacaoVenda
            document.querySelector("#idValorUsuário").value = valorMoedaEstrangeira
        }

        
        else if (document.querySelector("#idVenderE").checked) {
            valorMoedaEstrangeira = document.querySelector("#idValorUsuário").value
            valorReais = valorMoedaEstrangeira * cotação.value[cotação.value.length - 1].cotacaoCompra
            valorMoedaEstrangeira2 = valorReais / cotação2.value[cotação2.value.length - 1].cotacaoVenda
            document.querySelector("#idValorCâmbio").value = valorMoedaEstrangeira2
        }
        
        else if (document.querySelector("#idComprarE").checked) {
            valorMoedaEstrangeira = document.querySelector("#idValorCâmbio").value
            valorReais = valorMoedaEstrangeira / cotação.value[cotação.value.length - 1].cotacaoVenda
            valorMoedaEstrangeira2 = valorReais * cotação2.value[cotação2.value.length - 1].cotacaoCompra
            document.querySelector("#idValorUsuário").value = valorMoedaEstrangeira2
        }
    }
})



