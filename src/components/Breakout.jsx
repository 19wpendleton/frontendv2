import {React, useEffect, useRef, useState } from 'react';
const CANVAS_WIDTH = 1000
const CANVAS_HEIGHT = 500
const N_BRICK_COLUMNS = 10
const N_BRICK_ROWS = 10
const BRICK_SEP = 4
const BRICK_WIDTH = Math.floor((CANVAS_WIDTH - BRICK_SEP * (N_BRICK_COLUMNS + 1)) / N_BRICK_COLUMNS)
const BRICK_HEIGHT = 10
const BRICK_Y_OFFSET = 70
const COLORS = ['red', 'orange', 'yellow', 'green', 'blue']
const BALL_RADIUS = 10
const VELOCITY_Y = 2.0
const VELOCITY_X_MIN = 2.0
const VELOCITY_X_MAX = 6.0
const DELAY = 1 / 120
const PADDLE_WIDTH = 70
const PADDLE_HEIGHT = 15
const PADDLE_Y_OFFSET = 50
const N_TURNS = 3

const Breakout = (props) => {

    const breakoutRef = useRef(null);

    useEffect(() => {
        const canvas = breakoutRef.current;
        const c = canvas.getContext('2d');
        var x = CANVAS_WIDTH / 2;
        var y = CANVAS_HEIGHT / 2;
        var dx = Math.random() * (VELOCITY_X_MAX - VELOCITY_X_MIN) + VELOCITY_X_MIN;
        var dy = VELOCITY_Y
        var mouse = {
            x: undefined,
            y: undefined
        }
        let bricks = [];
        let score = 0;
        let turn = 1;

        window.addEventListener('mousemove', 
            function(event) {
                mouse.x = event.x - canvas.offsetLeft;
                mouse.y = event.y - canvas.getBoundingClientRect().top;
                canvas.width = CANVAS_WIDTH;
                canvas.height = CANVAS_HEIGHT;
                if (
                    mouse.x >= 0 &&
                    mouse.x <= canvas.width &&
                    mouse.y >= 0 &&
                    mouse.y <= canvas.height
                ) {
                    paddle.x = mouse.x - PADDLE_WIDTH / 2;
                }

            })
        
        window.addEventListener('touchmove', 
            function(event) {
                mouse.x = event.x - canvas.offsetLeft;
                mouse.y = event.y - canvas.getBoundingClientRect().top;
                canvas.width = CANVAS_WIDTH;
                canvas.height = CANVAS_HEIGHT;
                if (
                    mouse.x >= 0 &&
                    mouse.x <= canvas.width &&
                    mouse.y >= 0 &&
                    mouse.y <= canvas.height
                ) {
                    paddle.x = mouse.x - PADDLE_WIDTH / 2;
                }

            })
        
        var pointerDown = false;
        window.addEventListener('pointerdown',
            function(event) {
                mouse.x = event.x - canvas.offsetLeft;
                mouse.y = event.y - canvas.getBoundingClientRect().top;
                canvas.width = CANVAS_WIDTH;
                canvas.height = CANVAS_HEIGHT;
                if (
                    mouse.x >= 0 &&
                    mouse.x <= canvas.width &&
                    mouse.y >= 0 &&
                    mouse.y <= canvas.height &&
                    !pointerDown
                ) {
                    pointerDown = true;
                    console.log('true');
                } else if (
                    mouse.x >= 0 &&
                    mouse.x <= canvas.width &&
                    mouse.y >= 0 &&
                    mouse.y <= canvas.height &&
                    pointerDown
                ) {
                    pointerDown = false;
                    console.log('false');
                }
            }
        )

        function Ball(x, y, dx, dy) {
            
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;

            this.drawBall = function() {
                c.beginPath();
                c.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2, false);
                c.fillStyle = 'white';
                c.fill();
            }

            this.updateBall = function() {

                this.drawBall();

                // move ball if mouse is clicked
                if (pointerDown) {
                    this.x += this.dx;
                    this.y += this.dy;
                } else {
                    this.x += 0;
                    this.y += 0;
                    c.font = '32px Arial';
                    c.fillStyle = 'white';
                    c.fillText('Click to Play', 400, 400);
                }

                // bounce ball
                // if ball is past left or right wall, bounce horizontally
                if (this.x + BALL_RADIUS >= CANVAS_WIDTH || this.x - BALL_RADIUS <= 0) {
                    this.dx = -this.dx;
                }
                // if ball is past top or bottom wall, bounce vertically
                if (this.y + BALL_RADIUS >= CANVAS_HEIGHT || this.y - BALL_RADIUS <= 0) {
                    this.dy = -this.dy;
                }

                // if ball hits paddle, bounce upwards
                if (
                    ball.x + BALL_RADIUS >= paddle.x &&
                    ball.x <= paddle.x + PADDLE_WIDTH &&
                    ball.y + BALL_RADIUS >= paddle.y &&
                    ball.y <= paddle.y + PADDLE_HEIGHT && 
                    ball.dy > 0 
                ) {
                    ball.dy = -ball.dy;
                };
            }
        }

        function Paddle(x, y) {
            this.x = x;
            this.y = y;

            this.drawPaddle = function() {
                c.fillStyle = 'white';
                c.fillRect(this.x, this.y, PADDLE_WIDTH, PADDLE_HEIGHT);
            }
        }

        var ball = new Ball(x, y, dx, dy);
        var paddle = new Paddle(x, CANVAS_HEIGHT - PADDLE_Y_OFFSET);

        const generateBricks = () => {
            for (let col = 0; col < N_BRICK_COLUMNS; col++) {
                bricks[col] = [];
                for (let row = 0; row < N_BRICK_ROWS; row++) {
                    bricks[col][row] = {x: 0, y: 0, status: 1}
                }
            }
        }

        const drawBricks = () => {
            for (let col = 0; col < N_BRICK_COLUMNS; col++) {
                for (let row = 0; row < N_BRICK_ROWS; row++) {
                    if (bricks[col][row].status === 1) {
                        let totalBrickSpace = BRICK_WIDTH * N_BRICK_COLUMNS + BRICK_SEP * (N_BRICK_COLUMNS - 1);
                        let freeSpace = CANVAS_WIDTH - totalBrickSpace;
                        let leftXOffset = freeSpace / 2;
                        let top = BRICK_Y_OFFSET + (BRICK_HEIGHT + BRICK_SEP) * row;
                        let left = leftXOffset + col * (BRICK_WIDTH + BRICK_SEP);
                        bricks[col][row].x = left;
                        bricks[col][row].y = top;
                        c.fillStyle = COLORS[Math.floor(row / 2)];
                        c.fillRect(left, top, BRICK_WIDTH, BRICK_HEIGHT);
                    }
                }
            }
        }

        const handleBrickCollision = () => {
            for (let col = 0; col < N_BRICK_COLUMNS; col++) {
                for (let row = 0; row < N_BRICK_ROWS; row++) {
                    let b = bricks[col][row];
                    if (b.status === 1) {
                        if(
                            ball.x + BALL_RADIUS + 5 >= b.x &&
                            ball.x - 5 <= b.x + BRICK_WIDTH &&
                            ball.y + BALL_RADIUS + 5 >= b.y &&
                            ball.y - 5 <= b.y + BRICK_HEIGHT
                            ) {
                                ball.y = ball.y + dy;
                                ball.dy = -ball.dy;
                                b.status = 0;
                                score++;
                                break;
                            }
                    }
                }
            }
        }
        

        const drawScore = () => {
            c.font = '16px Arial';
            c.fillStyle = 'white';
            c.fillText('Score: ' + score, 8, 20);
        }

        const drawTurn = () => {
            if (ball.y + BALL_RADIUS >= CANVAS_HEIGHT) {
                turn++
            }
            c.font = '16px Arial';
            c.fillStyle = 'white';
            c.fillText('Turn: ' + turn + '/3', 8, 40);
        }

        // reset score, handle loss
        let highScore = parseInt(localStorage.getItem('highScore'));

        const scoreDisplay = document.querySelector('.high-score');
        if (isNaN(highScore)) {
            highScore = 0;
        }
        scoreDisplay.innerHTML = `High Score: ${highScore}`;

        const handleLoss = () => {
            if (turn > N_TURNS) {
                if(score > highScore){
                    localStorage.setItem('highScore', score.toString());
                    scoreDisplay.innerHTML = `HighScore: ${score}`
                }
                score = 0;
                turn = 1;
                generateBricks();
            }

        }
        
        // make bricks
        generateBricks();
        
        const animate = () => {
            
            requestAnimationFrame(animate);
            
            // draw components
            c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            ball.updateBall();
            paddle.drawPaddle();  
            drawBricks();
            handleBrickCollision();
            drawScore();
            drawTurn();

            // handle loss
            handleLoss();
        }
        animate();

    }, [])

    return (
        <>
        <div className='Canvas'>
            <h1>Breakout</h1>
            <p>Destroy all the bricks to win!</p>
            <div className="high-score"></div>
            <canvas 
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            ref={breakoutRef}
            
            {...props}/>
        </div>
        </>
    )
}
export default Breakout;