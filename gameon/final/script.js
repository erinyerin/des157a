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

    const gameData = {
        dice: ['1die.png', '2die.png', '3die.png', '4die.png', '5die.png', '6die.png'],
        players: ['Duck', 'Pigeon'],

        imageSelector: [duckImage, pigeonImage],
        
        fatLevel:[0, 1], //Duck: 0, 2, 4 and Pigeon: 1, 3, 5
        
        neutral: ['duck1neutral.png', 'pigeon1neutral.png', 'duck2neutral.png', 'pigeon2neutral.png', 'duck3neutral.png', 'pigeon3neutral.png'],
        open: ['duck1open.png', 'pigeon1open.png', 'duck2open.png', 'pigeon2open.png', 'duck3open.png', 'pigeon3open.png'],

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


    startGame.addEventListener('click', function(){
        //randomly set gameData.index here
        gameData.index = Math.round(Math.random());
        console.log(gameData.index);

        document.querySelector('#quit').addEventListener('click', function(){
            location.reload();
        });
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

    function checkWinningCondition(){
        if(gameData.score[gameData.index] > gameData.gameEnd){
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`
            actionArea.innerHTML='';
            document.querySelector('#quit').innerHTML = 'Start a New Game?'
        }
        else{
            showCurrentScore()
        }

        if(gameData.score[gameData.index]<= 10){
            gameData.fatLevel[gameData.index] = gameData.index;
        }
        else if ((gameData.score[gameData.index]> 10) && (gameData.score[gameData.index]<=18) ){
            gameData.fatLevel[gameData.index] = gameData.fatLevel[gameData.index] + 2;
        }
        else if(gameData.score[gameData.index]>18){
            gameData.fatLevel[gameData.index] = gameData.fatLevel[gameData.index] + 2;
        }
    }

    function throwDice(){
        actionArea.innerHTML = '';
        gameData.roll1 = Math.floor(Math.random()*6)+1;
        gameData.roll2 = Math.floor(Math.random()*6)+1;
        gameText.innerHTML = `Roll the dice for the ${gameData.players[gameData.index]}`;
        diceArea.innerHTML =`<img src="images/${gameData.dice[gameData.roll1-1]}"> <img src="images/${gameData.dice[gameData.roll2-1]}">`;
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        //if two 1's are rolled;
        if (gameData.rollSum ===2){
            gameText.innerHTML += '<p>Oh snap! Snake eyes!</p>'
            gameData.score[gameData.index] = 0;
            gameData.index ? (gameData.index = 0) : (gameData.index = 1);
            showCurrentScore();
            //wait 2 seconds...
            setTimeout(setUpTurn, 2000);
        }

        //if either die is a 1;
        else if (gameData.roll1 === 1 || gameData.roll2 === 1){
            gameData.imageSelector[gameData.index].src = `images/${gameData.neutral[gameData.fatLevel[gameData.index]]}`
            gameData.index ? (gameData.index=0) : (gameData.index=1);
            gameText.innerHTML += `<p>Sorry, one of your rolls was a one. Switching to ${gameData.players[gameData.index]}</p>`;
            setTimeout(setUpTurn, 2000);
        }

        //if neither die is a 1;
        else{
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;

            checkWinningCondition();

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

})();