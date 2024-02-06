/* let titulo = document.querySelector("h1");
titulo.innerHTML = "Jogo do número secreto";

let paragrafo = document.querySelector("p");
paragrafo.innerHTML = "Selecione um número entre 1 e 10";
*/

let listaNumerosSorteados = [];
let numerolimite = 10;
let tentativas = 1;
let numeroSecreto = gerarNumeroAleatorio();

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}
function exibirMensagemInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "Selecione um número entre 1 e 10.");
}

exibirMensagemInicial();

function verificarChute() {
  let chuteUsuario = document.querySelector("input").value;
  let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
  let mensagemTentativa =
    ("p",
    `Parabéns!!! Você descobriu o número secreto em ${tentativas} ${palavraTentativa}.`);

  if (chuteUsuario == numeroSecreto) {
    exibirTextoNaTela("p", mensagemTentativa);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chuteUsuario < numeroSecreto) {
      exibirTextoNaTela("p", "Número secreto é maior");
    } else {
      exibirTextoNaTela("p", "Número secreto é menor");
    }
  }
  limparCampo();
  tentativas++;
}

function gerarNumeroAleatorio() {
  let quantidadeElementosLista = listaNumerosSorteados.length;

  if (quantidadeElementosLista == numerolimite) {
    listaNumerosSorteados = [];
  }

  let numeroEscolhido = parseInt(Math.random() * 10 + 1);
  if (listaNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chuteUsuario = document.querySelector("input").value = "";
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMensagemInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
