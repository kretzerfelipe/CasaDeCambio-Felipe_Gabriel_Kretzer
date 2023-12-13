//Pegar moedas daqui
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

var buscarCotação = document.querySelector("#idBuscarCotação")
buscarCotação.addEventListener("click", async function calcularCotação() {

    let moedaUsuário = ""
    let moedaCâmbio = ""
    let moedasIguais = false
    let moedaUsuárioVálida = false
    let moedaCâmbioVálida = false
    const respostaEndPoint = await fetch(endPoint)
    const moedas = await respostaEndPoint.json()

    moedaUsuário = document.querySelector("#idMoedaUsuário").value
    moedaCâmbio = document.querySelector("#idMoedaCâmbio").value
    moedas.value.forEach((moeda) => {
        if (moedaUsuário == moeda.simbolo || moedaUsuário === "BRL") {
            moedaUsuárioVálida = true          
        } 
        if (moedaCâmbio == moeda.simbolo || moedaCâmbio === "BRL") {
            moedaCâmbioVálida = true
        }
    })
    if (moedaUsuário == moedaCâmbio) {
        moedasIguais = true
    }
    console.log(moedaUsuárioVálida)
    console.log(moedaCâmbioVálida)

    if (!moedaUsuárioVálida || !moedaCâmbioVálida) {
        alert("Insira uma moeda válida")
    } else if (moedasIguais) {
        alert("Insira moedas diferentes.")
    } else if (moedaCâmbio === "BRL") {
        var respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaUsuário + "'&@dataInicial='" + dataAtual + "'&@dataFinalCotacao='" + dataAtual + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
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


                respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaUsuário + "'&@dataInicial='" + dataDisponível + "'&@dataFinalCotacao='" + dataDisponível + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
                cotação = await respostaCotaçãoEndPoint.json()
                
            }
        }
        let valorDesejado = document.querySelector("#idValor").value
        let valorPagar = valorDesejado / cotação.value[cotação.value.length - 1].cotacaoCompra
        valorPagar = valorPagar.toFixed(3)
        console.log(cotação)
        console.log(valorDesejado)
        console.log(valorPagar)
        document.querySelector("#idOut").value = valorDesejado + " " + moedaCâmbio + "custam " + valorPagar + " " + moedaUsuário + "."
    } else if (moedaUsuário === "BRL") {
        var respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaCâmbio + "'&@dataInicial='" + dataAtual + "'&@dataFinalCotacao='" + dataAtual + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
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


                respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaCâmbio + "'&@dataInicial='" + dataDisponível + "'&@dataFinalCotacao='" + dataDisponível + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
                cotação = await respostaCotaçãoEndPoint.json()

            }
        }
        let valorDesejado = document.querySelector("#idValor").value
        let valorPagar = valorDesejado * cotação.value[cotação.value.length - 1].cotacaoVenda
        valorPagar = valorPagar.toFixed(3)
        console.log(cotação)
        console.log(valorDesejado)
        console.log(valorPagar)
        document.querySelector("#idOut").value = valorDesejado + " " + moedaCâmbio + "custam " + valorPagar + " " + moedaUsuário + "."
    } else {
        var respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaUsuário + "'&@dataInicial='" + dataAtual + "'&@dataFinalCotacao='" + dataAtual + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
        var cotação = await respostaCotaçãoEndPoint.json()
        var respostaCotaçãoEndPoint2 = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaCâmbio + "'&@dataInicial='" + dataAtual + "'&@dataFinalCotacao='" + dataAtual + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
        var cotação2 = await respostaCotaçãoEndPoint2.json()

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


                respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaUsuário + "'&@dataInicial='" + dataAtual + "'&@dataFinalCotacao='" + dataAtual + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
                cotação = await respostaCotaçãoEndPoint.json()
                var respostaCotaçãoEndPoint2 = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaCâmbio + "'&@dataInicial='" + dataAtual + "'&@dataFinalCotacao='" + dataAtual + "'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
                var cotação2 = await respostaCotaçãoEndPoint2.json()

            }
        }
        let valorDesejado = document.querySelector("#idValor").value
        let valorReais = valorDesejado / cotação.value[cotação.value.length - 1].cotacaoCompra
        let valorPagar = valorReais * cotação2.value[cotação.value.length - 1].cotacaoVenda
        valorPagar = valorPagar.toFixed(3)
        console.log(cotação)
        console.log(cotação2)
        console.log(valorDesejado)
        console.log(valorReais)
        console.log(valorPagar)
        document.querySelector("#idOut").value = valorDesejado + " " + moedaCâmbio + " custam " + valorPagar + " " + moedaUsuário + "."
    }
})



