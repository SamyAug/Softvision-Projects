const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.getElementById('playground').append(canvas);
const context = canvas.getContext('2d');

//////////////////Exercitiile 1 si 2//////////////////
class Patrat {
    constructor(culoare, latura) {
        this.culoare = culoare;
        this.latura = latura;
    }


    draw() {
        context.beginPath();
        context.moveTo(this.latura * 2, this.latura * 2);
        context.lineTo(this.latura * 3, this.latura * 2);
        context.lineTo(this.latura * 3, this.latura * 3);
        context.lineTo(this.latura * 2, this.latura * 3);
        context.lineTo(this.latura * 2, this.latura * 2);
        context.fillStyle = 'green';
        context.fill();
        context.closePath();
    }
}

const a = new Patrat('green', 20);
a.draw();


///////////////////Exercitiul 3//////////////////////
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.dx = 1;
        this.dy = 1;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.arc(
            this.x,
            this.y,
            this.radius,
            this.startAngle,
            this.endAngle
        );
        context.stroke();
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    move(stepX, stepY) {
        if (this.dx == 1)
            this.radius++;
        else
            this.radius--;
        this.x += stepX * this.dx;
        this.y += stepY * this.dy;
        this.changeDirectionIfExceededBounds();
        this.draw();
    }

    changeDirectionIfExceededBounds() {
        if (this.x + this.radius >= canvas.width) {
            this.dx = -1;
            this.color = 'blue';
        }
        if (this.y + this.radius >= canvas.height) {
            this.dy = -1;
        }
        if (this.x - this.radius <= 0) {
            this.dx = 1;
            this.color = 'red';
        }
        if (this.y - this.radius <= 0) {
            this.dy = 1;
        }
    }
}

function getRandom(min, max) {
    return Math.floor(min + Math.random() * (max - min)) + 1;
}


const circle = new Circle(
    getRandom(0, canvas.width),
    getRandom(0, canvas.height),
    getRandom(10, 100),
    'red');



function animateCircle() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    circle.move(10, 0);
}

//setInterval(animateCircle, 500);

///////////////////Exercitiul 4//////////////////////
const rows = 20;
const colums = 10;
const width = 30;
const height = 30;

let grid = [];

function createGrid() {
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Cell(i, j, (i + j) % 2 ? 'white' : 'black');
        }
    }
}

function drawGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].draw();
        }
    }
}

createGrid();
drawGrid();

///////////////////Exercitiul 5//////////////////////

class Square {
    constructor(row, column) {
        this.row = row;
        this.column = column;
    }


    draw() {
        context.beginPath();
        grid[this.row][this.column] = new Cell(this.row, this.column, 'green');
        grid[this.row + 1][this.column] = new Cell(this.row + 1, this.column, 'green');
        grid[this.row + 1][this.column + 1] = new Cell(this.row + 1, this.column + 1, 'green');
        grid[this.row][this.column + 1] = new Cell(this.row, this.column + 1, 'green');
        drawGrid();
        context.closePath();
    }
}

const b = new Square(2, 3);
b.draw();
const c = new Square(5, 7);
c.draw();