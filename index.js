let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;



modal.addEventListener('click',  function (ev) {
    if(ev.target.classList.contains('easy')) {
        speed = 1000;
    } else if(ev.target.classList.contains('normal')) {
        speed = 500;
    } else if(ev.target.classList.contains('hard')) {
        speed = 200;
    }

    if(ev.target.classList.contains('button')) {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        startGame();
    }
} )
function startGame () {
    const tetris = document.createElement('div');
    tetris.classList.add('tetris');

    for (let i = 1; i < 181; i++) {
        let excel = document.createElement('div');
        excel.classList.add('excel');
        tetris.appendChild(excel);
    }

    let main = document.getElementsByClassName('main')[0];
    main.appendChild(tetris);

    let excel = document.getElementsByClassName('excel');
    let i = 0;

    for (let y = 18; y > 0; y--) {
        for (let x = 1; x < 11; x++) {
            excel[i].setAttribute('posX', x);
            excel[i].setAttribute('posY', y);
            i++;
        }
    }

    let x = 5, y = 15;

    let mainArr=[[[0,1],[0,2],[0,3],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]],[[-1,1],[0,0],[1,-1],[2,-2]],[[1,-1],[0,0],[-1,1],[-2,2]]],[[1,0],[0,1],[1,1],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]],[[0,0],[0,0],[0,0],[0,0]]],[[1,0],[0,1],[0,2],[[0,0],[-1,1],[1,0],[2,-1]],[[1,-1],[1,-1],[-1,0],[-1,0]],[[-1,0],[0,-1],[2,-2],[1,-1]],[[0,-1],[0,-1],[-2,0],[-2,0]]],[[1,0],[1,1],[1,2],[[0,0],[0,0],[1,-1],[-1,-1]],[[0,-1],[-1,0],[-2,1],[1,0]],[[2,0],[0,0],[1,-1],[1,-1]],[[-2,0],[1,-1],[0,0],[-1,1]]],[[1,0],[-1,1],[0,1],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]],[[0,-1],[-1,0],[2,-1],[1,0]],[[0,0],[1,-1],[-2,0],[-1,-1]]],[[1,0],[1,1],[2,1],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]],[[2,-1],[0,0],[1,-1],[-1,0]],[[-2,0],[0,-1],[-1,0],[1,-1]]],[[1,0],[2,0],[1,1],[[1,-1],[0,0],[0,0],[0,0]],[[0,0],[-1,0],[-1,0],[1,-1]],[[1,-1],[1,-1],[1,-1],[0,0]],[[-2,0],[0,-1],[0,-1],[-1,-1]]]];

    let currentFigure = 0;
    let figureBody = 0;
    let rotate = 1;

    const getAttribute = (el) => {
        return [figureBody[el].getAttribute('posX'), figureBody[el].getAttribute('posY')]
    }

    const setAttributesCoords = (paramX, paramY, xTerm = 0, yTerm = 0) => {
        return document.querySelector(`[posX = "${paramX + xTerm}"][posY = "${paramY + yTerm}"]`)
    }

    function create() {
        function getRandom() {
            return Math.round(Math.random() * (mainArr.length - 1))
        }

        rotate = 1;
        currentFigure = getRandom();

        figureBody = [
            setAttributesCoords(x, y),
            setAttributesCoords(x, y, mainArr[currentFigure][0][0], mainArr[currentFigure][0][1]),
            setAttributesCoords(x, y, mainArr[currentFigure][1][0], mainArr[currentFigure][1][1]),
            setAttributesCoords(x, y, mainArr[currentFigure][2][0], mainArr[currentFigure][2][1])
        ]

        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        }
    }

    create();



    let score = 0;
    let input = document.getElementsByTagName('input')[0];
    input.value = `Ваши очки ${score}`;

    function move() {
        let moveFlag = true;
        let coordinates = [
            getAttribute(0), getAttribute(1), getAttribute(2), getAttribute(3)
        ]

        for (let i = 0; i < coordinates.length; i++) {
            if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
                moveFlag = false;
                break
            }
        }

        if (moveFlag) {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }

            figureBody = [
                document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
            ];

            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        } else {
            for (let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
                figureBody[i].classList.add('set');
            }

            for (let i = 1; i < 15; i++) {
                let count = 0;
                for (let k = 1; k < 11; k++) {
                    if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                        count++;
                        if (count == 10) {
                            score += 10;
                            input.value = `Ваши очки ${score}`;
                            for (let m = 1; m < 11; m++) {
                                document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
                            }
                            let set = document.querySelectorAll('.set');
                            let newSet = [];
                            for (let s = 0; s < set.length; s++) {
                                let setCoords = [set[s].getAttribute('posX'), set[s].getAttribute('posY')]
                                if (setCoords[1] > i) {
                                    set[s].classList.remove('set');
                                    newSet.push(document.querySelector(`[posX = "${setCoords[0]}"][posY = "${setCoords[1] - 1}"]`));
                                }
                            }
                            for (let a = 0; a < newSet.length; a++) {
                                newSet[a].classList.add('set')
                            }
                            i--;
                        }
                    }
                }
            }
            for (let n = 1; n < 11; n++) {
                if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                    clearInterval(interval);
                    alert(`Игра окончена! Ваши очки ${score}`);
                    break;
                }
            }
            create();
        }
    }

    let interval = setInterval(() => {
        move()
    }, speed);

    let flag = true;



    window.addEventListener('keydown', function (ev) {
        let coords1 = getAttribute(0);
        let coords2 = getAttribute(1);
        let coords3 = getAttribute(2);
        let coords4 = getAttribute(3);

        function getNewState(a) {
            flag = true;
            let figureNew = [
                document.querySelector(`[posX = "${+coords1[0] + a}"][posY = "${+coords1[1]}"]`),
                document.querySelector(`[posX = "${+coords2[0] + a}"][posY = "${+coords2[1]}"]`),
                document.querySelector(`[posX = "${+coords3[0] + a}"][posY = "${+coords3[1]}"]`),
                document.querySelector(`[posX = "${+coords4[0] + a}"][posY = "${+coords4[1]}"]`),
            ];

            for (let i = 0; i < figureNew; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }

            if (flag) {
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }

                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }
            }
        }

        if (ev.keyCode == 37) {
            getNewState(-1);
        } else if (ev.keyCode == 39) {
            getNewState(1);
        } else if (ev.keyCode == 40) {
            move();
        } else if (ev.keyCode == 38) {
            flag = true;
            let figureNew = [
                document.querySelector(`[posX = "${+coords1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${+coords1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
                document.querySelector(`[posX = "${+coords2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${+coords2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
                document.querySelector(`[posX = "${+coords3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${+coords3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
                document.querySelector(`[posX = "${+coords4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${+coords4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
            ];

            for (let i = 0; i < figureNew; i++) {
                if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                    flag = false;
                }
            }

            if (flag) {
                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.remove('figure');
                }

                figureBody = figureNew;

                for (let i = 0; i < figureBody.length; i++) {
                    figureBody[i].classList.add('figure');
                }

                if (rotate < 4) {
                    rotate++
                } else {
                    rotate = 1
                }
            }
        }

    })
}






