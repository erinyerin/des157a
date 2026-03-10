(function(){
    'use strict'
    console.log('reading JS');

    const startGame = document.querySelector('#startGame');
    const gameControl = document.querySelector('#gamecontrol');
    const game = document.querySelector('#game');
    const score = document.querySelector('#score');
    const duckscore = document.querySelector('#score1')
    const pigeonscore = document.querySelector('#score2')
    const duckImage = document.querySelector('#duckImage');
    const pigeonImage = document.querySelector('#pigeonImage');
    const actionArea = document.querySelector('#actions');
    const howTo = document.querySelector('#howto')
    const diceArea = document.querySelector('#diceArea')
    const gameText = document.querySelector('#gameText')
    const quit = document.querySelector('#quit')
    const modal = document.querySelector('#modal')

    const gameData = {
        dice: ['1die.png', '2die.png', '3die.png', '4die.png', '5die.png', '6die.png'],
        players: ['Duck', 'Pigeon'],

        imageSelector: [duckImage, pigeonImage],
        
        fatLevel:[0, 1], //Duck: 0, 2, 4 and Pigeon: 1, 3, 5
        zeroCondition: [0, 0],
        
        neutral: ['duck1neutral.png', 'pigeon1neutral.png', 'duck2neutral.png', 'pigeon2neutral.png', 'duck3neutral.png', 'pigeon3neutral.png'],
        open: ['duck1open.png', 'pigeon1open.png', 'duck2open.png', 'pigeon2open.png', 'duck3open.png', 'pigeon3open.png', 'blowup.png'],

        score: [0, 0],
        roll1: 0,
        roll2: 0,
        rollSum: 0,
        index: 0,
        gameEnd: 29
    };

    howTo.addEventListener('click', function(){
        modal.classList.add('slide-up');
        modal.classList.remove('slide-down');
    })

    quit.addEventListener('click', function(){
        location.reload();
    })


    startGame.addEventListener('click', function(){
        //randomly set gameData.index here
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);
        setUpTurn();
        modal.classList.add('slide-down');
        modal.classList.remove('slide-up');
    });


    function setUpTurn(){
        gameText.innerHTML = `Roll the dice to feed ${gameData.players[gameData.index]}!`;
        gameData.imageSelector[gameData.index].src = `images/${gameData.open[gameData.fatLevel[gameData.index]]}`;

        actionArea.innerHTML = '<button id="roll">Feed</button>';
        document.querySelector('#roll').addEventListener('click', throwDice);
    }

    function showCurrentScore(){
        duckscore.innerHTML = `${gameData.score[0]}`;
        pigeonscore.innerHTML = `${gameData.score[1]}`
    }

    function zeroCondition(){
        if (gameData.fatLevel[gameData.index]<2){
            gameData.zeroCondition[gameData.index] = Math.floor(Math.random() * 10);
            //generate random number btwn 0 and 9, so 10% chance of generating 0
        }

        else if (gameData.fatLevel[gameData.index]>=2 && gameData.fatLevel[gameData.index]<4){
            gameData.zeroCondition[gameData.index] = Math.floor(Math.random() * 4);
            //generate random number btwn 0 and 3, so 25% chance of generating 0
        }

        else if (gameData.fatLevel[gameData.index]>=4){
            gameData.zeroCondition[gameData.index] = Math.floor(Math.random() * 2);
            //generate random number btwn 0 and 1, so 50% chance of generating 0
        }
    }

    function updateVariables(){
        // if(gameData.score[gameData.index] > gameData.gameEnd){
        //     //fixed, check if works
        //     game.innerHTML = `<h2>${gameData.players[gameData.index]} ate ${gameData.score[gameData.index]} breadcrumbs and wins!</h2>`
        //     gameData.imageSelector[gameData.index].src = `images/${gameData.neutral[gameData.fatLevel[gameData.index]]}`
        //     actionArea.innerHTML='<button id="quit">Start a New Game?</button>';
        // }
        // else{
            showCurrentScore()
        // }

        if(gameData.score[gameData.index]<= 10){
            gameData.fatLevel[gameData.index] = gameData.index;
            console.log(gameData.fatLevel)
        }
        else if ((gameData.score[gameData.index]> 10) && (gameData.score[gameData.index]<=18) ){
            gameData.fatLevel[gameData.index] = gameData.index + 2;
            console.log(gameData.fatLevel)
        }
        else if(gameData.score[gameData.index]>18){
            gameData.fatLevel[gameData.index] = gameData.index + 4;
            console.log(gameData.fatLevel)
        }

        zeroCondition()
        console.log(gameData.zeroCondition)
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random()*6)+1;
        gameData.roll2 = Math.floor(Math.random()*6)+1;
        gameText.innerHTML = `Roll the dice for the ${gameData.players[gameData.index]}`;
        diceArea.innerHTML =`<img src="images/${gameData.dice[gameData.roll1-1]}"> <img src="images/${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if either die is a 1;
        if (gameData.roll1 === 1 || gameData.roll2 === 1){
            gameData.imageSelector[gameData.index].src = `images/${gameData.neutral[gameData.fatLevel[gameData.index]]}`
            gameData.index ? (gameData.index=0) : (gameData.index=1);
            gameText.innerHTML = `<p>Sorry, one of your rolls was a one. Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }

        //if neither die is a 1;
        else{
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;

            updateVariables(); //this will update fatLevel and zeroCondition

            if(gameData.zeroCondition[gameData.index]===0){
                gameData.score[gameData.index] = 0;
                gameData.imageSelector[gameData.index].src = `images/${gameData.open[6]}`
                gameText.innerHTML = `<p>Oh no! Your bird overate!</p>`;
                showCurrentScore();
                gameData.fatLevel[gameData.index] = gameData.index;

                setTimeout(function(){
                    gameData.imageSelector[gameData.index].src = `images/${gameData.neutral[gameData.fatLevel[gameData.index]]}`
                    gameData.index ? (gameData.index=0) : (gameData.index=1);
                    setUpTurn();
                }, 3000);
            }
            //zero condition will have x% chance of picking 0
            //if gameData.zeroCondition[gameData.index] = 0
            //score = 0
            //image = blowup, gameData.imageSelector[gameData.index].src = `images/${gameData.open[6]}`
            //then basically either die is 1 condition except image changes after let's say 3 second delay, and text is different - "oh no, your bird overate!"
            //after three second delay we switch game index, then setUpTurn

            else if (gameData.score[gameData.index] > gameData.gameEnd){
                game.innerHTML = `<h2>${gameData.players[gameData.index]} ate ${gameData.score[gameData.index]} breadcrumbs and wins!</h2>`
                gameData.imageSelector[gameData.index].src = `images/${gameData.neutral[gameData.fatLevel[gameData.index]]}`
                actionArea.innerHTML='<button id="playAgain">Play Again</button>';
                document.querySelector('#playAgain').addEventListener('click', function(){
                    location.reload()
                })
            }

            else{
                gameData.imageSelector[gameData.index].src = `images/${gameData.open[gameData.fatLevel[gameData.index]]}`;

                actionArea.innerHTML = '<button id="rollagain">Feed</button> or <button id="pass">Pass</button>';

                document.querySelector('#rollagain').addEventListener('click', function(){
                    throwDice();
                })
                document.querySelector('#pass').addEventListener('click', function(){
                        gameData.imageSelector[gameData.index].src = `images/${gameData.neutral[gameData.fatLevel[gameData.index]]}`
                        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                        setUpTurn();
                });

            }

        }
    }

})();