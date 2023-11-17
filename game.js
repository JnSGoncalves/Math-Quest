const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
// Variáveis de Start //
let conta;
let result;
const vida_inicial = 3;
let vida;
let pontuacao = 0;
let opcoes;
let fase = 0;
let a = false;
let b = false;
let c = false;
let d = false;
let timer;
let timer_inicial = 15;
let respondido = false;
let acerto = false;
let fimGame = false;
let resultStr;
const timeout = 2000;
const opcaoA = {
    x : 100,
    y : 170,
    tamanho : 40
};
const opcaoB = {
    x : 200,
    y : 250,
    tamanho : 40
};
const opcaoC = {
    x : 300,
    y : 160,
    tamanho : 40
};
const opcaoD = {
    x : 410,
    y : 260,
    tamanho : 40
};
// Objeto Quadrado Start //
let quad_start = new Path2D();
quad_start.rect((canvas.width / 2) - 60,(canvas.height / 2) - 30 , 110, 40)

// Objeto Quadrado em volta do Timer //
let quad_timerV = new Path2D()
quad_timerV.rect(650, 50, 20, 200)

// Objeto Quadrado do Timer //
let quad_timer = new Path2D()
quad_timer.alt =  -192;
quad_timer.rect(654, 246, 12, quad_timer.alt);
quad_timer.cor = 'rgba(255,255,255,0.7)';

let coracao = new Image();
coracao.src = './imagens/coracao.png'
coracao.width = 30
coracao.height = 30

function drawVida() {
    for (let i = 0; i < vida; i++) {
        const offsetX = i * coracao.width;
        ctx.drawImage(coracao, 40 + offsetX, 403, coracao.width, coracao.height);
    }
}

function reset() {
    conta = null;
    result = null;
    vida = vida_inicial;
    pontuacao = 0;
    a = false;
    b = false;
    c = false;
    d = false;
    respondido = false;
    erro_ou_acerto = 0;
    fimGame = false;
}

function inicio() {
    respondido = false;

    init()

    desenharLinhaGiz(35, 385, canvas.width - 35, 385)

    text(687 - ctx.measureText(`Pontos: ${pontuacao}`).width, 430, `Pontos: ${pontuacao}`, 30)
    text(opcaoA.x, opcaoA.y, `A) ${opcoes[0]}`, opcaoA.tamanho)

    opcaoA.text = ctx.measureText(`A) ${opcoes[0]}`)
    text(opcaoB.x, opcaoB.y, `B) ${opcoes[1]}`, opcaoB.tamanho)

    opcaoB.text = ctx.measureText(`B) ${opcoes[1]}`)
    text(opcaoC.x, opcaoC.y, `C) ${opcoes[2]}`, opcaoC.tamanho)

    opcaoC.text = ctx.measureText(`C) ${opcoes[2]}`)
    text(opcaoD.x, opcaoD.y, `D ) ${opcoes[3]}`, opcaoD.tamanho)

    opcaoD.text = ctx.measureText(`D ) ${opcoes[3]}`)

    text((canvas.width / 2) - ctx.measureText(`${conta}`).width / 2 - 40, 80, conta, 50)

    canvas.addEventListener("click", clique_opcoes);

    drawVida()
    tempo_fase1()
}

start()