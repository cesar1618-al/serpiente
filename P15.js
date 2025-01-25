var lienzo = document.getElementById('game');
var contexto = lienzo.getContext('2d');
var cuadricula = 16;
var contador = 0;

var vibora = {
    x:160,
    y:160,
    dx: cuadricula,
    dy: 0,
    celdas: [],
    maxCeldas: 4,
};

var comida = {
    x: 320,
    y: 320,
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function ciclo(){
    requestAnimationFrame(ciclo);

    if (++contador < 4){
        return;
    }
    contador = 0;
    contexto.clearRect(0,0,lienzo.width,lienzo.height)

    vibora.x += vibora.dx;
    vibora.y += vibora.dy;

    if (vibora.x < 0){
        vibora.x = lienzo.width - cuadricula;
    }
    else if (vibora.x >= lienzo.width){
        vibora.x = 0;
    }

    if (vibora.y < 0){
        vibora.y = lienzo.height - cuadricula;
    }
    else if (vibora.y >= lienzo.height){
        vibora.y = 0;
    }
    vibora.celdas.unshift({x: vibora.x, y: vibora.y});
    //Push agrega, pop elimina
    if (vibora.celdas.length > vibora.maxCeldas){
        vibora.celdas.pop();
    }

    contexto.fillStyle = 'deeppink';
    contexto.fillRect(comida.x, comida.y, cuadricula-1, cuadricula-1);

    contexto.fillStyle = 'deepskyblue'
    vibora.celdas.forEach(function(cell, index) {
      contexto.fillRect(cell.x, cell.y, cuadricula-1, cuadricula-1,);
      
         if (cell.x === comida.x && cell.y === comida.y){
         vibora.maxCeldas++;
         comida.x = getRandom(0, 25)* cuadricula;
         comida.y = getRandom(0, 25)* cuadricula;
         }

        for(var i = index + 1; i < vibora.celdas.length; i++){
            if (cell.x === vibora.celdas[i].x && cell.y === vibora.celdas[i].y){
                vibora.x = 160;
                vibora.y = 160;
                vibora.celdas = [];
                vibora.maxCeldas = 4;
                vibora.dx = cuadricula;
                vibora.dy = 0;
                comida.x = getRandom(0, 25)* cuadricula;
                comida.y = getRandom(0, 25)* cuadricula;   
            }
        }
    });

    
}

document.addEventListener('keydown', function(e){

    if (e.which === 37 && vibora.dx === 0) {
        vibora.dx = -cuadricula;
        vibora.dy = 0;
    }
    else if (e.which === 38 && vibora.dy === 0) {
        vibora.dy = -cuadricula;
        vibora.dx = 0;
    }
    else if (e.which === 39 && vibora.dx === 0) {
        vibora.dx = cuadricula;
        vibora.dy = 0;
    }
    else if (e.which === 40 && vibora.dy === 0) {
        vibora.dy = cuadricula;
        vibora.dx = 0;
    }
});

requestAnimationFrame(ciclo);