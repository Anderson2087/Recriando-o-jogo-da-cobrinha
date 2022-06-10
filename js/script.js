let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Criando o campo onde vai ficar a cobrinha;
function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //Desenha o retângulo usando x e y e a largura e altura setadas;
}

//Criando a cobrinha do jogo;
function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "blue";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Função para crias a comida da cobra em pontos aleatorios;
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//Quando um evento acontece, detecta e chama uma função;
document.addEventListener('keydown', update);

function update(event){

    //Função de movimento...
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

//Iniciar o Jogo;
function iniciarJogo(){

    //Função para a cobrinha atrvesar as paredes;
    if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    //Condição pa que se a cobrinha bater no proprio corpo da Game Over;
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(")
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    //Dando movimento a cobrinha;
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Função para fazer a cobrinha comer e almentar de tamanho;
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    //função para a cobrina crecer;
    let newhead = {
        x: snakeX,
        y: snakeY
    }

    //Método unshift adiciona como primeiro quadradinho da cobrinha;
    snake.unshift(newhead);

}

let jogo = setInterval(iniciarJogo, 100);