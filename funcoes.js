// Timer //
// noinspection CommaExpressionJS

function tempo_fase1() {
    let timerFunct = timer_inicial
    timer = timerFunct

    tmfase1()
    function tmfase1 () {
        drawProgressBar()
        function drawProgressBar() {
            if (fimGame === false)
                if (timer > 0) {
                    let alt = -((timer / timerFunct) * 192)
                    ctx.fillStyle = quad_timer.cor;
                    ctx.fillRect(654, 246, 12, alt);
                    requestAnimationFrame(drawProgressBar)
                }
            if (respondido){
                cancelAnimationFrame(drawProgressBar)
            }
        }
        if (timer !== 0 && timer > 0 && respondido === false) {
            ctx.clearRect(645, 45, 700, 280)

            quad_vazio(quad_timerV)
            text(650, 280, timer.toFixed(0), 30)

            timer -= 0.1

            setTimeout(tmfase1, 100)
        }else if (respondido === false) {
            acabou_o_tempo()
        }
    }
}

function desenharLinhaGiz(x1, y1, x2, y2) {
    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function gameover() {
    fimGame = true
    ctx.clearRect(0,0,canvas.width,canvas.height)
    text(285, (canvas.height / 2), 'GAME OVER!', 35)

    text(canvas.width / 2 - ctx.measureText(`Total de Pontos: ${pontuacao}!`).width / 2 + 15, 150, `Total de Pontos: ${pontuacao}`, 30)

    if (pontuacao < 100){
        text(canvas.width / 2 - ctx.measureText('Acho que deveria estudar mais...').width / 2, 340, 'Acho que deveria estudar mais...', 30)
    }
    else if (pontuacao >= 100 && pontuacao < 200){
        text(canvas.width / 2 - ctx.measureText('Muito bem!').width / 2, 340, 'Muito Bem!', 30)
    }
    else if (pontuacao >= 200){
        text(canvas.width / 2 - ctx.measureText('Incrível!!').width / 2, 350, 'Incrível!!', 30)
    }

    setTimeout(continuar, 500)
}



// Inicio do Jogo //
function start() {
    reset()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    text_menu((canvas.width / 2) - 50, (canvas.height / 2), 'START', 30)
    quad_vazio(quad_start)


    // Adicione o ouvinte de eventos apenas uma vez //
    canvas.addEventListener("click", cliqueStart);

    function cliqueStart() {
        const x = event.offsetX;
        const y = event.offsetY;

        if (ctx.isPointInPath(quad_start, x, y)) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (fase === 0){
                inicio()
            }

            // Remove o ouvinte de eventos após o primeiro clique
            canvas.removeEventListener("click", cliqueStart);
        }
    }
}

function continuar() {

    let xtext = 270
    let ytext = 435

    text(270, 428, 'CONTINUAR', 40)

    let tamanho = ctx.measureText('CONTINUAR')

    canvas.addEventListener("click", clickContinue);

    function clickContinue() {
        const x = event.offsetX;
        const y = event.offsetY;

        if (x > xtext && x < xtext + tamanho.width && y < ytext && y > ytext - 40) {
            if (fimGame === true){
                start()
            }else {
                inicio()
            }

            canvas.removeEventListener("click", clickContinue);
        }
    }
}

// Acertou //
function acertou() {
    respondido = true;
    canvas.removeEventListener("click", clique_opcoes);

    text(canvas.width / 2 - ctx.measureText("Resposta Certa!").width / 2 - 35, 340, "Resposta Certa!", 40)
    pontuacao += 10
    acerto = true

    if (pontuacao % 100 === 0){
        if (timer_inicial > 5){
            if (acerto === true) {
                timer_inicial -= 2
                acerto = false;
            }
        }
    }

    setTimeout(continuar, 500)
}

// Errou //
function errou() {
    respondido = true;
    canvas.removeEventListener("click", clique_opcoes);

    text(canvas.width / 2 - ctx.measureText("Resposta Errada!").width / 2 - 35, 310, "Resposta Errada!", 40)
    setTimeout(function (){
        text(canvas.width / 2 - ctx.measureText(`Resposta: ${resultStr}`).width / 2, 355, `Resposta: ${resultStr}`, 40)
    }, timeout / 2.5)

    vida -= 1

    if (vida !== 0){
        setTimeout(continuar, 1500)
    }else {
        setTimeout(gameover, 2000)
    }
}

// Acabou o Tempo
function acabou_o_tempo() {
    canvas.removeEventListener("click", clique_opcoes);

    text(240, 310, "Acabou o Tempo!", 40)
    setTimeout(function (){
        text(canvas.width / 2 - ctx.measureText(`Resposta: ${resultStr}`).width / 2, 355, `Resposta: ${resultStr}`, 40)
    }, timeout / 2.5)
    vida -= 1

    if (vida !== 0){
        setTimeout(continuar, 1500)
    }else {
        setTimeout(gameover, 2000)
    }
}

// Opções //
function clique_opcoes() {
    const x = event.offsetX;
    const y = event.offsetY;

    if (x > opcaoA.x && x < opcaoA.x + opcaoA.text.width && y > opcaoA.y - opcaoA.tamanho && y < opcaoA.y){
        if (a) {
            acertou()
        }else {
            errou()
        }
    }
    if (x > opcaoB.x && x < opcaoB.x + opcaoB.text.width && y > opcaoB.y - opcaoB.tamanho && y < opcaoB.y){
        if (b) {
            acertou()
        }else {
            errou()
        }
    }
    if (x > opcaoC.x && x < opcaoC.x + opcaoC.text.width && y > opcaoC.y - opcaoA.tamanho && y < opcaoC.y){
        if (c) {
            acertou()
        }else {
            errou()
        }
    }
    if (x > opcaoD.x && x < opcaoD.x + opcaoD.text.width && y > opcaoD.y - opcaoD.tamanho && y < opcaoD.y){
        if (d) {
            acertou()
        }else {
            errou()
        }
    }
}


function init() {
    timer = timer_inicial
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    gerarConta()
    opcoes = opcoes_resultado(result)

}

function text_menu(x, y, texto, tamanho) {
    ctx.beginPath()
    ctx.fillStyle = 'white';
    ctx.font = `${tamanho}px 'Times New Roman'`;
    ctx.fillText(texto, x, y);
    ctx.closePath()
}

// Função que Desenha um texto no Canvas //
function text(x, y, texto, tamanho) {
    ctx.beginPath()
    ctx.fillStyle = 'white';
    ctx.font = `${tamanho}px 'Font_giz'`;
    ctx.fillText(texto, x, y);
    ctx.closePath()
}

function quad_vazio(objeto) {
    ctx.beginPath()
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke(objeto);
    ctx.closePath()
}

// função para o mínimo e máximo de uma função, estamos usando para interar nas listas.
function randomInt(min, max) {
    min = Math.floor(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarConta() {
    let lado = Math.random() > 0.5 ? 0 : 1;
    let op = Math.random() > 0.5 ? '+' : '-';

    let n1c1 = randomInt(-10, 10);
    let n2c1 = randomInt(-10, 10);

    let n1c2 = randomInt(-10, 10);
    let n2c2 = randomInt(-10, 10);
    let operadorC2 = Math.random() > 0.5 ? '*' : '/';
    let divisaoN2 = randomInt(-3, 3);
    while (divisaoN2 === 0){
        divisaoN2 = randomInt(-3, 3);
    }


    if (lado === 0){
        if (op === '+'){
            result = operadorC2 === '*' ? n1c1 + n2c1 + (n1c2 * n2c2) : n1c1 + n2c1 + (n1c2 / divisaoN2)
            console.log(result)
            if (n2c1 >= 0) {
                if (n1c2 >= 0){
                    conta = operadorC2 === '*' ? n1c1 + ' + ' + n2c1 + ' + ' + n1c2 + " * " + n2c2 : n1c1 + ' + ' + n2c1 + ' + ' + n1c2 + ' / ' + divisaoN2
                }else {
                    conta = operadorC2 === '*' ? n1c1 + ' + ' + n2c1 + ' ' + n1c2 + " * " + n2c2 : n1c1 + ' + ' + n2c1 + ' ' + n1c2 + ' / ' + divisaoN2
                }
            }
            else {
                if (n1c2 >= 0){
                    conta = operadorC2 === '*' ? n1c1 + ' ' + n2c1 + ' + ' + n1c2 + " * " + n2c2 : n1c1 + ' ' + n2c1 + ' + ' + n1c2 + ' / ' + divisaoN2
                }else {
                    conta = operadorC2 === '*' ? n1c1 + ' ' + n2c1 + ' ' + n1c2 + " * " + n2c2 : n1c1 + ' ' + n2c1 + ' ' + n1c2 + ' / ' + divisaoN2
                }
            }
        }
        else if (op === '-'){
            result = operadorC2 === '*' ? n1c1 + n2c1 - (n1c2 * n2c2) : n1c1 + n2c1 - (n1c2 / divisaoN2)
            console.log(result)
            if (n2c1 >= 0) {
                conta = operadorC2 === '*' ? n1c1 + ' + ' + n2c1 + ' -(' + n1c2 + ' * ' + n2c2 + ')' : n1c1 + ' + ' + n2c1 + ' -(' + n1c2 + ' / ' + divisaoN2 + ')'
            }
            else {
                conta = operadorC2 === '*' ? n1c1 + ' ' + n2c1 + ' -(' + n1c2 + ' * ' + n2c2 + ')' : n1c1 + ' ' + n2c1 + ' -(' + n1c2 + ' / ' + divisaoN2 + ')'
            }
        }
    }else {
        result = operadorC2 === '*' ? n1c2 * n2c2 + n1c1 + n2c1 : n1c2 / divisaoN2 + n1c1 + n2c1
        console.log(result)
        if (n1c1 >= 0){
            if (n2c1 >= 0){
                conta = operadorC2 === '*' ? n1c2 + ' * ' + n2c2 + ' + ' + n1c1 + ' + ' + n2c1 : n1c2 + ' / ' + divisaoN2 + ' + ' + n1c1 + ' + ' + n2c1
            }else {
                conta = operadorC2 === '*' ? n1c2 + ' * ' + n2c2 + ' + ' + n1c1 + ' ' + n2c1 : n1c2 + ' / ' + divisaoN2 + ' + ' + n1c1 + ' ' + n2c1
            }
        }
        else {
            if (n2c1 >= 0){
                conta = operadorC2 === '*' ? n1c2 + ' * ' + n2c2 + ' ' + n1c1 + ' + ' + n2c1 : n1c2 + ' / ' + divisaoN2 + ' ' + n1c1 + ' + ' + n2c1
            }else {
                conta = operadorC2 === '*' ? n1c2 + ' * ' + n2c2 + ' ' + n1c1 + ' ' + n2c1 : n1c2 + ' / ' + divisaoN2 + ' ' + n1c1 + ' ' + n2c1
            }
        }
    }
}

// fazendo função que gera as opções e resultados //
function opcoes_resultado(resultado){
    a = false;
    b = false;
    c = false;
    d = false;
    let opcoes = [0,0,0,0]
    let [n1, n2, n3] = gera_n_aleatorios(resultado)
    let indice_result = randomInt(0,3)
    let indice_n1 = randomInt(0,3)
    while (indice_n1 === indice_result) {
        indice_n1 = randomInt(0,3)
    }
    let indice_n2 = randomInt(0,3)
    while (indice_n2 === indice_result || indice_n2 === indice_n1) {
        indice_n2 = randomInt(0,3)
    }
    let indice_n3 = randomInt(0,3)
    while (indice_n3 === indice_result || indice_n3 === indice_n1 || indice_n3 === indice_n2) {
        indice_n3 = randomInt(0,3)
    }

    if (resultado % 1 === 0) {
        opcoes[indice_result] = resultado
        resultStr = resultado
    }else {
        resultado = resultado.toFixed(2)
        opcoes[indice_result] = resultado
        resultStr = resultado
    }
    opcoes[indice_n1] = n1 % 1 === 0 ? n1 : n1.toFixed(2)
    opcoes[indice_n2] = n2 % 1 === 0 ? n2 : n2.toFixed(2)
    opcoes[indice_n3] = n3 % 1 === 0 ? n3 : n3.toFixed(2)

    //verificando a lista para não passar de 4 opções, se passar a lista retorma ao valor original.
    if(opcoes.length > 4){
        opcoes = [0,0,0,0]
    }

    if (indice_result === 0){
        a = true
    }else if (indice_result === 1) {
        b = true
    }else if (indice_result === 2){
        c = true
    }else if (indice_result === 3){
        d = true
    }


    return opcoes
}

// função para gera números aleatórios para lista de opções acima
function gera_n_aleatorios(resultado) {
    let n_aleatorio1 = null;
    let n_aleatorio2 = null;
    let n_aleatorio3 = null;
    while (n_aleatorio1, n_aleatorio2, n_aleatorio3 == null || n_aleatorio1 === n_aleatorio2 || n_aleatorio1 === n_aleatorio3 || n_aleatorio2 === n_aleatorio3 || (n_aleatorio1, n_aleatorio2, n_aleatorio3 === resultado)) {
        if (resultado % 1 === 0){
            n_aleatorio1 = Math.random() > 0.5 ? resultado + randomInt(1,10) : resultado - randomInt(1,10);
            while (n_aleatorio1 === resultado){
                n_aleatorio1 = Math.random() > 0.5 ? resultado + randomInt(1,10) : resultado - randomInt(1,10);
            }
            n_aleatorio2 = randomInt(resultado - 10,resultado + 10);
            while (n_aleatorio2 === resultado || n_aleatorio2 === n_aleatorio1) {
                n_aleatorio2 = randomInt(resultado - 10,resultado + 10);
            }
            n_aleatorio3 = randomInt(1,90);
            while (n_aleatorio3 === resultado) {
                n_aleatorio3 = randomInt(5,90);
            }
        }else {
            n_aleatorio1 = Math.random() > 0.5 ? resultado + randomInt(1,4) : resultado - randomInt(1,4);
            while (n_aleatorio1 === resultado){
                n_aleatorio1 = Math.random() > 0.5 ? resultado + randomInt(1,10) : resultado - randomInt(1,10);
            }
            n_aleatorio2 = randomInt((resultado - 10), (resultado + 10)) / 3;
            while (n_aleatorio2 === resultado || n_aleatorio2 === n_aleatorio1) {
                n_aleatorio2 = (randomInt((resultado + 10) * 2 ,resultado * 2)) / 2;
            }
            n_aleatorio3 = randomInt(1,90);
            while (n_aleatorio3 === resultado || n_aleatorio3 === n_aleatorio2 || n_aleatorio3 === n_aleatorio1) {
                n_aleatorio3 = randomInt(5,90);
            }
        }
    }

    return [n_aleatorio1, n_aleatorio2, n_aleatorio3]
}