//Pegar moedas
const endPoint = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?$top=100&$format=json"

// Data de hoje
var hoje = new Date();

var atual = new Date(hoje.getTime());
atual.setDate(hoje.getDate());

var dd = atual.getDate();
var mm = atual.getMonth()+1; 
var yyyy = atual.getFullYear();

if(dd<10) 
{
dd='0'+dd;
}

if(mm<10) 
{
mm='0'+mm;
} 

var dataAtual = mm+'-'+dd+'-'+yyyy

console.log(dataAtual)

// Data ontem
var ontem = new Date(hoje.getTime());
ontem.setDate(hoje.getDate() - 1);

var dd = ontem.getDate();
var mm = ontem.getMonth()+1; 
var yyyy = ontem.getFullYear();

if(dd<10) 
{
dd='0'+dd;
}

if(mm<10) 
{
mm='0'+mm;
} 

var dataOntem = mm+'-'+dd+'-'+yyyy

console.log(dataOntem)

// Data ante-ontem
var anteOntem = new Date(hoje.getTime());
anteOntem.setDate(hoje.getDate() -2);

var dd = anteOntem.getDate();
var mm = anteOntem.getMonth()+1; 
var yyyy = anteOntem.getFullYear();

if(dd<10) 
{
dd='0'+dd;
}

if(mm<10) 
{
mm='0'+mm;
} 

var dataAnteOntem = mm+'-'+dd+'-'+yyyy

console.log(dataAnteOntem)

// Data 3 dias atrás
var trêsDias = new Date(hoje.getTime());
trêsDias.setDate(hoje.getDate() -3);

var dd = trêsDias.getDate();
var mm = anteOntem.getMonth()+1; 
var yyyy = trêsDias.getFullYear();

if(dd<10) 
{
dd='0'+dd;
}

if(mm<10) 
{
mm='0'+mm;
} 

var dataTrêsDias = mm+'-'+dd+'-'+yyyy

console.log(dataTrêsDias)

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

var buscarCotação = document.querySelector("#idBuscarCotação")
buscarCotação.addEventListener("click", async function calcularCotação() {

    let moedaEscolhida = ""
    if (document.querySelector("#idMoedaUsuário").value === "BRL") {
        moedaEscolhida = document.querySelector("#idMoedaCâmbio").value
    } 
    
    else if (document.querySelector("#idMoedaCâmbio").value === "BRL") {
        moedaEscolhida = document.querySelector("#idMoedaUsuário").value
    }

    var respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaEscolhida + "'&@dataInicial='" + dataAtual +"'&@dataFinalCotacao='" + dataAtual +"'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
    var cotação = await respostaCotaçãoEndPoint.json()
    console.log(cotação)
    if (cotação.value.length == 0) {
        respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaEscolhida + "'&@dataInicial='" + dataOntem +"'&@dataFinalCotacao='" + dataOntem +"'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
        cotação = await respostaCotaçãoEndPoint.json()
        console.log(cotação)
    } 

    else if (cotação.value.length == 0) {
        respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaEscolhida + "'&@dataInicial='" + dataAnteOntem +"'&@dataFinalCotacao='" + dataAnteOntem +"'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
        cotação = await respostaCotaçãoEndPoint.json()
        console.log(cotação)
    }

    else if (cotação.value.length == 0) {
        respostaCotaçãoEndPoint = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='" + moedaEscolhida + "'&@dataInicial='" + dataTrêsDias +"'&@dataFinalCotacao='" + dataTrêsDias +"'&$top=100&$format=json&$select=paridadeCompra,paridadeVenda,cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim")
        cotação = await respostaCotaçãoEndPoint.json()
        console.log(cotação)
    }


}); 



