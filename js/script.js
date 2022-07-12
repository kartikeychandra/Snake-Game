let inputDir = {x:0, y:0}
let snakeArr = [{x:13, y:15}]
let lastPaintTime = 0;
let speed = 5;
let food = {x:8, y:6}
score = 0
function main(ctime){
    // console.log(ctime)
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return
    }    
    lastPaintTime = ctime;
    gameEngine();
}
function gameEngine(){
    document.getElementById('snakeboard').innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        document.getElementById('snakeboard').appendChild(snakeElement)
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    document.getElementById('snakeboard').appendChild(foodElement)

    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
        score += 1;
        document.querySelector('.scoreBoard').innerHTML = "Score: " + score
    }
    for (let i = snakeArr.length - 2 ; i >=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {
            inputDir = {x: 0, y: 0};
            snakeArr = [{x: 13, y: 15}]
            document.querySelector('.scoreBoard').innerHTML = "Score: 0" 
        }
    }
    if (snakeArr[0].x >= 18 || snakeArr[0].x <=0 || snakeArr[0].y >= 18 || snakeArr[0].y <=0){
        inputDir = {x: 0, y: 0};
        snakeArr = [{x: 13, y: 15}]
        document.querySelector('.scoreBoard').innerHTML = "Score: 0"
    }
}

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1};
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;    
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})




window.requestAnimationFrame(main)