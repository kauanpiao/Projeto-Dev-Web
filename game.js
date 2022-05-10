var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d')


var alvo = new Image();


// Função que inicia as imagens
function init() {
    alvo.src = 'alvo.png';
}

// definindo o timer
function timer() {

    var timer = setInterval(function () {
        sec.s = sec.s < 10 ? "0" + sec.s : sec.s;
        document.getElementById('timer').innerHTML = '00:' + sec.s;
        sec.s--;

        if (sec.s < 0) {
            clearInterval(timer);

        }

    }, 1000);

}

// Definindo o que acontece quando acaba o tempo
const sec = {

    s: 20,
    desenha(){
        var precisao = ((100 * placar.pontuacao)/(placar.erros+placar.pontuacao));
        var as = (placar.pontuacao/20);
        var es = (placar.erros/20);
        var med =(placar.pontuacao/20)-(placar.erros/20);
        var final = (precisao * med);
        if(final < 0){
            final = 0
        }


        if(sec.s < 0) {

            ctx.textAlign = 'center'
            ctx.font = '70px "Baloo 2"'
            ctx.fillStyle = 'black'
            ctx.fillText(`Tempo Esgotado`,canvas.width/2,200)
            ctx.beginPath();
            ctx.font = '50px "Baloo 2"'
            ctx.fillText(`Precisão: ${precisao.toFixed(2)}%`,canvas.width/2,320)
            ctx.fillText(`Acertos por segundo: ${as.toFixed(2)}`,canvas.width/2,370)
            ctx.fillText(`Erros por segundo: ${es.toFixed(2)}`,canvas.width/2,420)
            ctx.beginPath();
            ctx.font = '70px "Baloo 2"'
            ctx.fillText(`Pontuação Final: ${(final).toFixed(0)}`,canvas.width/2,550)

            //botão de reiniciar
            function Botao(x,y,w,h){
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
            }
            var bt = new Botao(canvas.width/2-150,600,300 ,100);
            ctx.fillStyle ='cadetblue'
            ctx.fillRect(bt.x,bt.y,bt.w,bt.h);
            ctx.beginPath();
            ctx.fillStyle = 'black'
            ctx.font = '35px "Baloo 2"'
            ctx.fillText(`clique para reiniciar`,canvas.width/2,660)

            canvas.onclick = function(evt){
                var rectNav = canvas.getBoundingClientRect();
                const pos ={
                    x: evt.offsetX,
                    y: evt.offsetY
                }
                console.log(pos.x,pos.y, bt.x, bt.y)

                if(pos.x>bt.x && pos.x<(bt.x+bt.w) && pos.y>bt.y && pos.y<(bt.y+bt.h)){
                    location.reload();
                }

                }
            }



        }

}




// Definindo o placar
const placar = {
    pontuacao: 0,
    erros: -1,

    desenha(){
        ctx.textAlign = 'center'
        ctx.font = '30px "Baloo 2"'
        ctx.fillStyle = 'black'
        ctx.fillText(`Acertos: ${placar.pontuacao} Erros:${placar.erros} `,canvas.width/2,50)

    }

}
// Definindo o mouse como mira
const mira2 ={
    largura: 70,
    altura: 70,

    desenha(){
        window.addEventListener('mousemove', e =>{
            x = e.offsetX;
            y = e.offsetY;

        })

    }
}

// Definindo o alvo

const alvo2 = {
    x: Math.random() * 1366,
    y: Math.random() * 768,
    largura: 70,
    altura: 70,



    desenha(){
        if((alvo2.x < 70) || (alvo2.y < 70) )  {
            alvo2.x = Math.random() * 1290;
            alvo2.y = Math.random() * 698;
        }
        setInterval(function(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
        },30)
            ctx.beginPath();
            ctx.arc(alvo2.x, alvo2.y, 35, 0 , 2*Math.PI);
            ctx.fillStyle = '#006eab';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(alvo2.x, alvo2.y, 30, 0 , 2*Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(alvo2.x, alvo2.y, 20, 0 , 2*Math.PI);
            ctx.fillStyle = '#006eab';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(alvo2.x, alvo2.y, 10, 0 , 2*Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();

            if(sec.desenha() == true){
                ctx.clearRect(0,0,canvas.width,canvas.height);
            }


}
}






// Evento para definir o que acontece quando clicamos com o mouse

window.addEventListener('click', e =>{

    if(e.button ==0) {
        if (sec.s < 0) {
            ctx.clearRect(0, 0, 1366, 768)
        } else {
            if ((e.offsetX >= alvo2.x - 25) && (e.offsetX <= alvo2.x + 25) && (e.offsetY >= alvo2.y - 25) && (e.offsetY <= alvo2.y + 25)) {

                console.log('acerto mizeravi')
                placar.pontuacao = placar.pontuacao + 1
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                alvo2.x = Math.random() * 1290;
                alvo2.y = Math.random() * 698;


            } else {
                placar.erros = placar.erros + 1
                console.log('errou', '/', e.offsetX, '/', alvo2.x)
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                alvo2.x = Math.random() * 1290;
                alvo2.y = Math.random() * 698;
            }
        }
    }
})

//inicializando e atualizando todas as funções para rodar em loop

function loop() {

    sec.desenha();
    alvo2.desenha();
    mira2.desenha();
    placar.desenha();
    requestAnimationFrame(loop);


}

//inicializando funções

function main(){
    init();
    loop();
    timer();

    placar.pontuacao = 0
    placar.erros = -1
    sec.s = 20
}
