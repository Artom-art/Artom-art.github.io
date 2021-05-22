var GAME = {
    width: 900,
    height: 900,
    fps: 1000 / 60,
    canvasContext: null,
    backgroundColor: "gray"
}

var PLAYER = {
    x: 50,
    y: 50,
    width: 50,
    height: 56,
    imgWidth: 16,
    imgHeight: 18,
    xDirection: 0,
    yDirection: 0,
    speed: 3.5,
    img: new Image(),
    imgArr: Array,
    imgCount: 0,
    imgNumber: 1,
    checkStop: true,
}

var BOT = {
    x: 800,
    y: 300,
    width: 30,
    height: 30,
    color: "white",
    screenColor: "red",
    xDirection: 2,
    yDirection: 2,
    counterX: 1,
    counterY: 1,
}

var FINWIN = {
    x: 250,
    y: 250,
    width: 500,
    height: 400,
    color: "white",
}

var WALL1 = {
    x: 300,
    y: 400,
    width: 200,
    height: 20,
    color: "yellow",
}

var WALL2 = {
    x: 300,
    y: 400,
    width: 20,
    height: 300,
}

var WALL3 = {
    x: 500,
    y: 600,
    width: 20,
    height: 400,
}

var WALL4 = {
    x: 500,
    y: 600,
    width: 200,
    height: 20,
}

var WALL5 = {
    x: 300,
    y: 850,
    width: 20,
    height: 160,
}

var WALL6 = {
    x: 480,
    y: 270,
    width: 20,
    height: 150,
}

var WALL7 = {
    x: 840,
    y: 600,
    width: 160,
    height: 20,
}

var WALL8 = {
    x: 480,
    y: 0,
    width: 20,
    height: 100,
}
var TABLE1 = {
    x: 700,
    y: 760,
    width: 100,
    height: 60,
    color: "brown",
}

var TABLE2 = {
    x: 630,
    y: 300,
    width: 100,
    height: 60,
}

var TABLE3 = {
    x: 200,
    y: 150,
    width: 60,
    height: 100,
}

var TABLE4 = {
    x: 120,
    y: 500,
    width: 60,
    height: 100,
}

var TABLE5 = {
    x: 800,
    y: 200,
    width: 100,
    height: 60,
}

let frameCount = 0;
let count = 100;
let index = 0;
let gameOver = false;
let timerId;
let start = true;

function init() {
    var canvas = document.getElementById("canvas");
    _initCanvas(canvas);
    _initEventListeners();
    play();
    sayHistory();
    window.onclick = function() {
        if (start) {
            start = false;
            timerId = setInterval(play, GAME.fps);
        }
    }
}

function sayHistory() {
    GAME.canvasContext.fillStyle = "black";
    GAME.canvasContext.font = "30px Arial";
    GAME.canvasContext.fillText("Вы - начинающий охотник за вирусами. Однажды", 130, 50);
    GAME.canvasContext.fillText("к вам приходит человек и говорит, что", 130, 85);
    GAME.canvasContext.fillText("в его компьютер вселился вирус, он просит помочь.", 130, 120);
    GAME.canvasContext.fillText("Таким образом у вас появился первый заказ...", 130, 155); //Предыстория
    
    GAME.canvasContext.font = "15px Arial";
    GAME.canvasContext.fillText("Стрелка вверх - бежать вверх", 10, GAME.height - 170);
    GAME.canvasContext.fillText("Стрелка вниз - бежать вниз", 10, GAME.height - 140);
    GAME.canvasContext.fillText("Стрелка влево - бежать налево", 10, GAME.height - 110);
    GAME.canvasContext.fillText("Стрелка вправо - бежать направо", 10, GAME.height - 80);
    GAME.canvasContext.fillText("Пробел - остановиться", 10, GAME.height - 50);
    GAME.canvasContext.font = "20px Arial";
    GAME.canvasContext.fillText("Нажмите ПКМ для начала игры", 10, GAME.height - 20); // Пишем подсказки
    }

function play() {
    if (!gameOver) {
        draw();
        update();
    } else {
        clearInterval(timerId);
        drawFinishWindow();
        start = true;
        window.onclick = function() {
            if (start) {
                start = false;
                makeReset();
                timerId = setInterval(play, GAME.fps);
            }
        }
        return;
    }
}

function draw() {
    GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    GAME.canvasContext.fillStyle = GAME.backgroundColor;
    GAME.canvasContext.fillRect(0, 0, GAME.width, GAME.height); //Рисуем задний фон

    GAME.canvasContext.fillStyle = TABLE1.color;
    GAME.canvasContext.fillRect(TABLE1.x, TABLE1.y, TABLE1.width, TABLE1.height); //Рисуем стол 1
    GAME.canvasContext.fillRect(TABLE1.x + 10, TABLE1.y + TABLE1.height, 15, 20);
    GAME.canvasContext.fillRect(TABLE1.x + TABLE1.width - 25, TABLE1.y + TABLE1.height, 15, 20);

    GAME.canvasContext.fillRect(TABLE2.x, TABLE2.y, TABLE2.width, TABLE2.height);
    GAME.canvasContext.fillRect(TABLE2.x + 10, TABLE2.y + TABLE2.height, 15, 20);
    GAME.canvasContext.fillRect(TABLE2.x + TABLE2.width - 25, TABLE2.y + TABLE2.height, 15, 20); // Рисуем стол 2

    GAME.canvasContext.fillRect(TABLE3.x, TABLE3.y, TABLE3.width, TABLE3.height);
    GAME.canvasContext.fillRect(TABLE3.x + 5, TABLE3.y + TABLE3.height, 15, 20);
    GAME.canvasContext.fillRect(TABLE3.x + TABLE3.width - 20, TABLE3.y + TABLE3.height, 15, 20); // Рисуем стол 3

    GAME.canvasContext.fillRect(TABLE4.x, TABLE4.y, TABLE4.width, TABLE4.height);
    GAME.canvasContext.fillRect(TABLE4.x + 5, TABLE4.y + TABLE4.height, 15, 20);
    GAME.canvasContext.fillRect(TABLE4.x + TABLE4.width - 20, TABLE4.y + TABLE4.height, 15, 20); // Рисуем стол 4

    GAME.canvasContext.fillRect(TABLE5.x, TABLE5.y, TABLE5.width, TABLE5.height);
    GAME.canvasContext.fillRect(TABLE5.x + 10, TABLE5.y + TABLE5.height, 15, 20);
    GAME.canvasContext.fillRect(TABLE5.x + TABLE5.width - 25, TABLE5.y + TABLE5.height, 15, 20); //Рисуем стол 5
 
    GAME.canvasContext.fillStyle = "blue";
    GAME.canvasContext.fillRect(TABLE1.x + TABLE1.width - 20, TABLE1.y + 10, 12, 19); //Рисуем бумаги на столе 1
    GAME.canvasContext.fillRect(TABLE4.x + 10, TABLE4.y + 15, 19, 12); //Рисуем бумаги на столе 4
    GAME.canvasContext.fillRect(TABLE5.x + 15, TABLE5.y + 10, 12, 19); //Рисуем бумаги на столе 5
    GAME.canvasContext.fillStyle = "white";
    GAME.canvasContext.fillRect(TABLE2.x + 15, TABLE2.y + 10, 12, 19); //Рисуем бумаги на столе 2
    GAME.canvasContext.fillRect(TABLE3.x + 10, TABLE3.y + 15, 19, 12); //Рисуем бумаги на столе 3

    PLAYER.img.src = 'images/walk' + PLAYER.imgNumber + '.png';
    GAME.canvasContext.drawImage(PLAYER.img, 0, 0, PLAYER.imgWidth, PLAYER.imgHeight, PLAYER.x, PLAYER.y, PLAYER.width, PLAYER.height);
    requestAnimationFrame(walk); // Рисуем игрока

    GAME.canvasContext.fillStyle = BOT.color;
    GAME.canvasContext.fillRect(BOT.x + 10, BOT.y, BOT.width, BOT.height); 
    GAME.canvasContext.fillRect(BOT.x, BOT.y + BOT.height, BOT.width + 20, BOT.height / 2);
    GAME.canvasContext.fillStyle = BOT.screenColor;
    GAME.canvasContext.fillRect(BOT.x + 15, BOT.y + 5, BOT.width - 10, BOT.height - 10) //Рисуем бота

    GAME.canvasContext.fillStyle = WALL1.color;
    GAME.canvasContext.fillRect(WALL1.x, WALL1.y, WALL1.width, WALL1.height); //Рисуем стену 1
    GAME.canvasContext.fillRect(WALL2.x, WALL2.y, WALL2.width, WALL2.height); //Рисуем стену 2
    GAME.canvasContext.fillRect(WALL3.x, WALL3.y, WALL3.width, WALL3.height); //Рисуем стену 3
    GAME.canvasContext.fillRect(WALL4.x, WALL4.y, WALL4.width, WALL4.height); //Рисуем стену 4
    GAME.canvasContext.fillRect(WALL5.x, WALL5.y, WALL5.width, WALL5.height); //Рисуем стену 5
    GAME.canvasContext.fillRect(WALL6.x, WALL6.y, WALL6.width, WALL6.height); //Рисуем стену 6
    GAME.canvasContext.fillRect(WALL7.x, WALL7.y, WALL7.width, WALL7.height); //Рисуем стену 7
    GAME.canvasContext.fillRect(WALL8.x, WALL8.y, WALL8.width, WALL8.height); //Рисуем стену 8
}

function drawFinishWindow() {
    GAME.canvasContext.fillStyle = "black";
    GAME.canvasContext.font = "40px Arial";
    GAME.canvasContext.fillText("Поздравляем вас с первым", FINWIN.x, FINWIN.y);
    GAME.canvasContext.fillText("успешно выполненным заданием.", FINWIN.x, FINWIN.y + 40);
    GAME.canvasContext.fillText("Ура!!!", FINWIN.x, FINWIN.y + 80);
    GAME.canvasContext.font = "25px Arial";
    GAME.canvasContext.fillText("Если хотите ещё, нажмите ПКМ", FINWIN.x, FINWIN.y + 150);
}

function walk() {
    frameCount++;
    PLAYER.imgArr = [0, 1, 0, 2];
    if (frameCount >= 5 && !PLAYER.checkStop) {
      frameCount = 0;
      if (index < PLAYER.imgArr.length) {
          PLAYER.imgNumber = PLAYER.imgCount + PLAYER.imgArr[index];
          index++;
      } else {
          index = 0;
      }
    }
}

function update() {
    let horCollisionWithWall1 = _botHasHorCollisionWithItems(BOT, WALL1);
    let horCollisionWithWall2 = _botHasHorCollisionWithItems(BOT, WALL2);
    let horCollisionWithWall3 = _botHasHorCollisionWithItems(BOT, WALL3);
    let horCollisionWithWall4 = _botHasHorCollisionWithItems(BOT, WALL4);
    let horCollisionWithWall5 = _botHasHorCollisionWithItems(BOT, WALL5);
    let horCollisionWithWall6 = _botHasHorCollisionWithItems(BOT, WALL6);
    let horCollisionWithWall7 = _botHasHorCollisionWithItems(BOT, WALL7);
    let horCollisionWithWall8 = _botHasHorCollisionWithItems(BOT, WALL8);
    let horCollisionWithTable1 = _botHasHorCollisionWithItems(BOT, TABLE1);
    let horCollisionWithTable2 = _botHasHorCollisionWithItems(BOT, TABLE2);
    let horCollisionWithTable3 = _botHasHorCollisionWithItems(BOT, TABLE3);
    let horCollisionWithTable4 = _botHasHorCollisionWithItems(BOT, TABLE4);
    let horCollisionWithTable5 = _botHasHorCollisionWithItems(BOT, TABLE5);
    let verCollisionWithWall1 = _botHasVerCollisionWithItems(BOT, WALL1);
    let verCollisionWithWall2 = _botHasVerCollisionWithItems(BOT, WALL2);
    let verCollisionWithWall3 = _botHasVerCollisionWithItems(BOT, WALL3);
    let verCollisionWithWall4 = _botHasVerCollisionWithItems(BOT, WALL4);
    let verCollisionWithWall5 = _botHasVerCollisionWithItems(BOT, WALL5);
    let verCollisionWithWall6 = _botHasVerCollisionWithItems(BOT, WALL6);
    let verCollisionWithWall7 = _botHasVerCollisionWithItems(BOT, WALL7);
    let verCollisionWithWall8 = _botHasVerCollisionWithItems(BOT, WALL8);
    let verCollisionWithTable1 = _botHasVerCollisionWithItems(BOT, TABLE1);
    let verCollisionWithTable2 = _botHasVerCollisionWithItems(BOT, TABLE2);
    let verCollisionWithTable3 = _botHasVerCollisionWithItems(BOT, TABLE3);
    let verCollisionWithTable4 = _botHasVerCollisionWithItems(BOT, TABLE4);
    let verCollisionWithTable5 = _botHasVerCollisionWithItems(BOT, TABLE5);
    let playerHasCollision1 = _playerHasCollisionWithItems(PLAYER, WALL1);
    let playerHasCollision2 = _playerHasCollisionWithItems(PLAYER, WALL2);
    let playerHasCollision3 = _playerHasCollisionWithItems(PLAYER, WALL3);
    let playerHasCollision4 = _playerHasCollisionWithItems(PLAYER, WALL4);
    let playerHasCollision5 = _playerHasCollisionWithItems(PLAYER, WALL5);
    let playerHasCollision6 = _playerHasCollisionWithItems(PLAYER, WALL6);
    let playerHasCollision7 = _playerHasCollisionWithItems(PLAYER, WALL7);
    let playerHasCollision8 = _playerHasCollisionWithItems(PLAYER, WALL8);
    let playerHasCollisionWithTable1 = _playerHasCollisionWithItems(PLAYER, TABLE1);
    let playerHasCollisionWithTable2 = _playerHasCollisionWithItems(PLAYER, TABLE2);
    let playerHasCollisionWithTable3 = _playerHasCollisionWithItems(PLAYER, TABLE3);
    let playerHasCollisionWithTable4 = _playerHasCollisionWithItems(PLAYER, TABLE4);
    let playerHasCollisionWithTable5 = _playerHasCollisionWithItems(PLAYER, TABLE5);

    if (!playerHasCollision1 && !playerHasCollision2 && !playerHasCollision3 && !playerHasCollision4 
    && !playerHasCollision5 && !playerHasCollision6 && !playerHasCollision7 && !playerHasCollision8
    && !playerHasCollisionWithTable1 && !playerHasCollisionWithTable2 && !playerHasCollisionWithTable3
    && !playerHasCollisionWithTable4 && !playerHasCollisionWithTable5) {
        if (PLAYER.y + PLAYER.yDirection > 0 && PLAYER.y + PLAYER.height + PLAYER.yDirection < GAME.height) {
            PLAYER.y += PLAYER.yDirection;
        }
        if (PLAYER.x + PLAYER.xDirection > 0 && PLAYER.x + PLAYER.width + PLAYER.xDirection < GAME.width) {
            PLAYER.x += PLAYER.xDirection;
        }
    }
    if (BOT.y + BOT.yDirection < 0 || BOT.y + BOT.height + BOT.height / 2 + BOT.yDirection > GAME.height
    || horCollisionWithTable1 || horCollisionWithTable2 || horCollisionWithTable3 || horCollisionWithTable4
    || horCollisionWithTable5 || horCollisionWithWall1 || horCollisionWithWall2 || horCollisionWithWall3 || horCollisionWithWall4
    || horCollisionWithWall5 || horCollisionWithWall6 || horCollisionWithWall7 || horCollisionWithWall8) {
        BOT.counterY = -BOT.counterY;
        BOT.yDirection = getRandomInt(2, 5) * BOT.counterY;
    }

    if (BOT.x + BOT.width + 20 + BOT.xDirection > GAME.width || BOT.x + BOT.xDirection < 0
    || verCollisionWithTable1 || verCollisionWithTable2 || verCollisionWithTable3 || verCollisionWithTable4
    || verCollisionWithTable5 || verCollisionWithWall1 || verCollisionWithWall2 || verCollisionWithWall3 || verCollisionWithWall4
    || verCollisionWithWall5 || verCollisionWithWall6 || verCollisionWithWall7 || verCollisionWithWall8) {
        BOT.counterX = -BOT.counterX;
        BOT.xDirection = getRandomInt(2, 5) * BOT.counterX;
    }

    BOT.y += BOT.yDirection;
    BOT.x += BOT.xDirection;

    if (count === 0) {
      changeDirection();
      count = 100;
    }

    count--;

    if (_botHasCollisionWithPlayer(BOT, PLAYER)) {
        gameOver = true;
    }
}

function changeDirection() {
    console.log('changeDirection');
    if (PLAYER.x < BOT.x && PLAYER.y < BOT.y) {
        if (BOT.x + BOT.xDirection - PLAYER.x < BOT.x - PLAYER.x && BOT.y + BOT.yDirection - PLAYER.y < BOT.y - PLAYER.y
        && BOT.x - PLAYER.x < 100 && BOT.x - PLAYER.x < 100) {
            BOT.counterX = -BOT.counterX;
            BOT.counterY = -BOT.counterY;
            BOT.xDirection = getRandomInt(2, 5) * BOT.counterX;
            BOT.yDirection = getRandomInt(2, 5) * BOT.counterY;
        }
    }
    if (PLAYER.x > BOT.x && PLAYER.y < BOT.y) {
        if (PLAYER.x - (BOT.x + BOT.xDirection) < PLAYER.x - BOT.x && BOT.y + BOT.yDirection - PLAYER.y < BOT.y - PLAYER.y
        && PLAYER.x - BOT.x < 100 && BOT.y - PLAYER.y < 100) {
            BOT.counterX = -BOT.counterX;
            BOT.counterY = - BOT.counterY;
            BOT.xDirection = getRandomInt(2, 5) * BOT.counterX;
            BOT.yDirection = getRandomInt(2, 5) * BOT.counterY;
        }
    }
    if (PLAYER.x < BOT.x && PLAYER.y > BOT.y) {
        if (BOT.x + BOT.xDirection - PLAYER.x < BOT.x - PLAYER.x && PLAYER.y - (BOT.y + BOT.yDirection) < PLAYER.y - BOT.y
        && BOT.x - PLAYER.x < 100 && PLAYER.y - BOT.y < 100) {
            BOT.counterX = -BOT.counterX;
            BOT.counterY = -BOT.counterY;
            BOT.xDirection = getRandomInt(2, 5) * BOT.counterX;
            BOT.yDirection = getRandomInt(2, 5) * BOT.counterY;
        }
    }
    if (PLAYER.x > BOT.x && PLAYER.y > BOT.y) {
        if (PLAYER.x - (BOT.x + BOT.xDirection) < PLAYER.x - BOT.x && PLAYER.y - (BOT.y + BOT.yDirection) < PLAYER.y - BOT.y
        && PLAYER.x - BOT.x < 100 && PLAYER.y - BOT.y < 100) {
            BOT.counterX = -BOT.counterX;
            BOT.counterY = -BOT.counterY;
            BOT.xDirection = getRandomInt(2, 5) * BOT.counterX;
            BOT.yDirection = getRandomInt(2, 5) * BOT.counterY;
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeReset() {
    PLAYER.x = 50;
    PLAYER.y = 50;
    PLAYER.xDirection = 0;
    PLAYER.yDirection = 0;
    PLAYER.imgNumber = 1;
    PLAYER.imgCount = 0;
    PLAYER.checkStop = true;
    BOT.x = 800;
    BOT.y = 200;
    BOT.xDirection = 2;
    BOT.yDirection = 2;
    BOT.counterX = 1;
    BOT.counterY = 1;
    frameCount = 0;
    count = 250;
    index = 0;
    gameOver = false;
}

function _botHasCollisionWithPlayer(bot, p) {
    var xCollision = (p.x + p.width / 2 >= bot.x && p.x + p.width / 2 <= bot.x + bot.width + 20);
    var yCollision = (p.y + p.height / 2 >= bot.y && p.y + p.height / 2 <= bot.y + bot.height + bot.height / 2);
    return xCollision && yCollision;
}

function _botHasCollisionWithItems(bot, i) {
    var xCollision = (bot.x + bot.xDirection <= i.x + i.width && bot.x + bot.width + 20 + bot.xDirection >= i.x);
    var yCollision = (bot.y + bot.yDirection <= i.y + i.height && bot.y + bot.height + bot.height / 2 + bot.yDirection >= i.y);
    return xCollision && yCollision;
}

function _botHasHorCollisionWithItems(bot, i) {
    var check = (_botHasCollisionWithItems(bot, i) && ((bot.y < i.y && bot.y + bot.height + bot.height / 2 < i.y) || (bot.y > i.y + i.height && bot.y + bot.height + bot.height / 2 > i.y + i.height)));
    return check;
}

function _botHasVerCollisionWithItems(bot, i) {
    var check = (_botHasCollisionWithItems(bot, i) && ((bot.x > i.x + i.width && bot.x + bot.width + 20 > i.x + i.width) || (bot.x < i.x && bot.x + bot.width + 20 < i.x)));
    return check;
}

function _playerHasCollisionWithItems(p, w) {
    var xCollision = (p.x + p.width + p.xDirection >= w.x && p.x + p.xDirection <= w.x + w.width);
    var yCollision = (p.y + p.yDirection <= w.y + w.height && p.y + p.height + p.yDirection >= w.y);
    return xCollision && yCollision;
}

function _initCanvas(canvas) {
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    GAME.canvasContext = canvas.getContext("2d");
}

function _initEventListeners() {
    document.addEventListener("keydown", _onDocumentKeyDown);
}

function _onDocumentKeyDown(event) {
    if (event.key == "ArrowUp") {
        PLAYER.yDirection = -PLAYER.speed;
        PLAYER.xDirection = 0;
        PLAYER.imgCount = 4;
        PLAYER.checkStop = false;
    }
    if (event.key == "ArrowDown") {
        PLAYER.yDirection = PLAYER.speed;
        PLAYER.xDirection = 0;
        PLAYER.imgCount = 1;
        PLAYER.checkStop = false;
    }
    if (event.key == "ArrowRight") {
        PLAYER.xDirection = PLAYER.speed;
        PLAYER.yDirection = 0;
        PLAYER.imgCount = 10;
        PLAYER.checkStop = false;
    }
    if (event.key == "ArrowLeft") {
        PLAYER.xDirection = -PLAYER.speed;
        PLAYER.yDirection = 0;
        PLAYER.imgCount = 7;
        PLAYER.checkStop = false;
    }
    if (event.key == " ") {
        PLAYER.xDirection = 0;
        PLAYER.yDirection = 0;
        PLAYER.checkStop = true;
    }
}
