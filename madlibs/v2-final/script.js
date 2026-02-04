( function(){
    'use strict';
    console.log('Reading JS');

    const myForm = document.querySelector('#myform');
    const madlib = document.querySelector('#madlib');
    const title = document.querySelectorAll('.title')
    const formData = document.querySelectorAll("input[type=text]");

    myForm.addEventListener('submit', function (event) {
        event.preventDefault();
        processFormData(formData);
    });

    function processFormData(formData){
        const words = [];
        const emptyfields = [];
        let counter = 0;

        for (const eachWord of formData){
            if (eachWord.value){
                words.push(eachWord.value);
                eachWord.value="";
            }
            else {
                emptyfields.push(counter);
            }  
            counter++;
        }
        if (emptyfields.length > 0){
            madlib.innerHTML="Please fill in all fields."
        }
        else {
            makeMadlib(words);
        }
        
    };

    function makeMadlib(words){
        const myText = `
                        <p>
                            I still sleep with the ${words[3]} on like it helps <br>
                            Behind my eyelids an endless ${words[4]} <br>
                            If growing up’s just ${words[5]} up <br>
                            I must be doing it wrong somehow <br>
                        </p>

                        <p>
                            Your ${words[6]} fit mine like muscle memory<br>
                            Like it would always know the way <br>
                            Now every street ${words[7]} like you<br>
                            And it’s the one I always take<br>
                        </p>

                        <p>
                            I still remember every ${words[8]}<br>
                            Like hitting potholes on the way home <br>
                            I drive in circles with the ${words[9]} of the radio static<br>
                            And I end up more ${words[10]} than before<br>
                        </p>

                        <p>
                            I left my ${words[11]} at your place<br>
                            The one I used to keep in the backseat of my car<br>
                            I didn’t need it in your sunlight<br>
                            But now your bedroom window’s dark<br>
                        </p>

                        <p>
                            I DON’T WANT YOU BACK<br>
                            I JUST WANT IT BACK<br>
                            My ${words[11]} and my dreams<br>
                            You took it all to ${words[12]}<br>
                            And you left me here to ${words[13]}<br>
                        </p>
                    `
        madlib.innerHTML = myText;
        
        for (var i=0; i<title.length; i++){
            title[i].innerHTML = `
                <p><b>${words[0]}, I Gave You Everything and Now I'm ${words[1]}</b></p>
                <p>A Song by ${words[2]}</p>
            `
        }

        for (const eachField of formData){
            eachField.value = '';
        }
    }

} )();

( function(){
    'use strict';
    console.log('Reading JS');

    const record = document.querySelector('#record');
    const playbackButton = document.querySelector('#playbackButton');

    record.classList.add('spinning');

    playbackButton.addEventListener('click', function() {
        if (record.classList.contains('paused')) {
            record.classList.remove('paused');
            playbackButton.className = 'fa-solid fa-pause';
        }
        else {
            record.classList.add('paused');
            playbackButton.className = 'fa-solid fa-play';
        }
    });

} )();

( function(){
    'use strict';
    console.log('Reading JS');

    const clickable = document.querySelectorAll('.clickable')
    var frontZindex = 0;

    clickable.forEach(function(div) {
        div.addEventListener('click', function() {
            frontZindex++;
            this.style.zIndex = frontZindex;
        })

    });

} )();