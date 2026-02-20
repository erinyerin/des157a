window.addEventListener('load', function () {
    'use strict';
    
    const sections = document.querySelectorAll('section');
    const container = document.querySelector('#container');
    let sectionTops = [];
    let pagetop;
    let counter = 1;
    let prevCounter=1;
    let doneResizing;

    window.addEventListener('resize', function () {
        clearTimeout(doneResizing);
        doneResizing = setTimeout(function () {
            resetPagePosition();
        }, 500);
    });

    function resetPagePosition() {
        sectionTops = [];
        sections.forEach(function (eachSection) {
            sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.   scrollY);
        });

        const pagePosition = container.scrollTop + sectionTops[0] + 10;
        counter = 0;
        sectionTops.forEach(function (eachSection) { 
            if (pagePosition > eachSection) { counter++; }
        });
        console.log(`counter is now ${counter}`);
    }   


    sections.forEach(function (eachSection){
        sectionTops.push(Math.floor(eachSection.getBoundingClientRect().top) + window.scrollY);
    });

    console.log(sectionTops);

    container.addEventListener('scroll', function(){
        pagetop = container.scrollTop + 100;
        // console.log(pagetop);

        if (pagetop>sectionTops[counter]){
            counter++;
            console.log(`scrolling down ${counter}`);
        }
        else if (counter > 1 && pagetop < sectionTops[counter-1]){
            counter--;
            console.log(`scrolling up ${counter}`);
        }
        
        if (counter !=prevCounter){
            onSectionChange();
            prevCounter = counter;
        }});

    function onSectionChange() { 
        const myStyle = `image${counter}`;
         document.querySelector('#container').className = myStyle;
    }

});