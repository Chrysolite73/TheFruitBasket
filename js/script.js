let fruit = [ 'apple.png', 'bananas.png', 'grape.png', 'lemon.png', 'mandarin.png', 'pear.png', 'pineapple.png', 'watermelon.png', 'apple.png', 'bananas.png', 'grape.png', 'lemon.png', 'mandarin.png', 'pear.png', 'pineapple.png', 'watermelon.png' ];
const PATH = 'images/';
const GameStatuses = {Default: "Default", NewGame: "NewGame", InGame: "InGame", Pause: "Pause", GameOver: "GameOver"};

document.addEventListener( 'DOMContentLoaded', function () { 

  let gameStatus = GameStatuses.Default;
  let withTimer = false;

  const startButton = document.querySelector( '.startButton' );
  const timerCheckBox = document.querySelector( '.checkbox' );
  const pauseButton = document.querySelector( '.pauseButton' );
  const popUp = document.querySelector('.pop-up');
  const flexCell = document.querySelectorAll( '.flexCell' );
  const tabBox = document.querySelector( '.tabBox' )
  const nemuRules = document.querySelector( '.menu-rules' );
  const menuBox = document.querySelector( '.menuBox' ); 
  const timerBox = document.querySelector( '.timerBox' );


  let mixFruit;
  let imgCover = [];
  let imgBox = [];
  let img = [];
  let imgToCheck = [];
  let idToCheck = [];
  let idNum;
  let countImgs;
  let idTimer;
  const timer = document.querySelector( '.timer' );
  let checkGameEnd;
  let time;
  let timeCount = 0;
  let boxToPauseImg;
  let imgToPause;

  startButton.addEventListener( 'click', newGame, false );
  //timerCheckBox.addEventListener( 'click', appendTimer, false );
  timerCheckBox.addEventListener( 'click', inGameWithTimer, false );
  nemuRules.addEventListener( 'click', showRules, false );

  function inGameWithTimer () {
    appendTimer ();
    if ( withTimer && gameStatus === GameStatuses.InGame ) {
      initTimer();
    }
  }

  function newGame ( e ) { 
    gameStatus = GameStatuses.NewGame;
    time = Date.now(); 
    countImgs = 0;
    checkGameEnd = 0;
    sec = 0;
    timeCount = 0;
    min = 0;
    if ( startButton.getAttribute( 'name' ) == 'restartGame' ) { 
      for ( let i = 0; i < fruit.length; i++ ) {
        imgBox[i].remove();
        imgCover[i].remove();
      }
      clearInterval( idTimer );
      pauseButton.removeEventListener('click', stopTimer, false );
      if ( withTimer ) {
        withTimer = false;
        timerCheckBox.setAttribute( 'name', 'timerOff' );
        timerBox.classList.toggle( "elmHidden" );
        timerCheckBox.textContent = '';        
      }

      tabBox.removeEventListener( 'click', turnOffMenu, false );
      imgToCheck.splice( 0, imgToCheck.length); 
      idToCheck.splice( 0, idToCheck.length);
      if ( menuBox.getAttribute( 'name' ) == 'menuOff' ) {
        menuBox.classList.toggle( 'dropdown-menu' );
        menuBox.classList.toggle( 'elmHidden' );
        menuBox.setAttribute( 'name', 'menuOn' );
      }
      if ( tabBox.classList.contains( "elmHidden" ) ) {
        tabBox.classList.remove( "elmHidden" );
        boxToPauseImg.classList.toggle( 'elmHidden' );
      }
    }
    startButton.setAttribute( 'name', 'restartGame' );
    startButton.textContent = "Начать заново";
    mixFruit = mixArr( fruit );
    tabBox.addEventListener( 'click', turnOffMenu, false );
    gameStatus = GameStatuses.InGame
    pauseButton.textContent = "Пауза";
    for ( let i = 0; i < fruit.length; i++ ) { 
      flexCell[i].style.backgroundImage = "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";
      imgCover[i] = document.createElement( 'div' );
      imgBox[i] = document.createElement( 'div' );
      img[i] = createImg ( i, mixFruit );
      imgCover[i].id = i;
      imgCover[i].classList.add('imgCover');
      imgBox[i].classList.add('elmHidden');
      img[i].classList.add('elmHidden');
      flexCell[i].append( imgCover[i] );
      flexCell[i].append( imgBox[i] );
      imgBox[i].append( img[i] );
      imgCover[i].addEventListener( 'click', сheckImg, false );
    }
    boxToPauseImg = document.querySelector( '.boxToPauseImg' );
  }
  function turnOffMenu( e ) {
    menuBox.classList.toggle( 'dropdown-menu' );
    menuBox.classList.toggle( 'elmHidden' );
    menuBox.setAttribute( 'name', 'menuOff' );
    tabBox.removeEventListener( 'click', turnOffMenu, false );
  }
  function сheckImg ( e ) {
    console.log("withTimer: ", withTimer);
    idNum = +( this.getAttribute( "id" ) );
    if( countImgs == 0 ) { 
      toggleImg( idNum );
      idToCheck.push( idNum );
      imgToCheck.push( mixFruit[idNum].slice( 0, mixFruit[idNum].length - 4 ) );
    }
    if ( imgToCheck.length == 2 )  { 
      if ( imgToCheck[0] != imgToCheck[1] ) {
        countImgs = 1;
        setTimeout( toggleImg, 500, idToCheck[0] );
        setTimeout( toggleImg, 500, idToCheck[1] ); 
        setTimeout( () => countImgs = 0, 500 ); 
      } else {
        checkGameEnd++;
        imgCover[idToCheck[0]].removeEventListener( 'click', сheckImg, false );
        imgCover[idToCheck[1]].removeEventListener( 'click', сheckImg, false );
          if ( checkGameEnd == 8 ) {
            if ( withTimer ) {
              clearInterval( idTimer );
            }
            createMessage ();
          } 
      }
      imgToCheck.splice( 0, imgToCheck.length); 
      idToCheck.splice( 0, idToCheck.length);
    }
  }
  function toggleImg ( j ) { 
    imgBox[j].classList.toggle('elmHidden');
    imgCover[j].classList.toggle( "elmHidden" );
    img[j].classList.toggle( "elmHidden" ); 
  }
  function mixArr ( arr ) {
    for ( let i = 0; i < arr.length; i++ ) {
      let num = Math.floor( Math.random() * arr.length );
      let item1 = arr[i];
      let item2 = arr[num];
      arr[i] = item2;
      arr[num] = item1;
    }
    return arr;
  }
  function createImg ( index, arr ) { //img на время паузы
    elemImg = document.createElement( 'img' );
    elemImg.src = PATH + arr[index];
    elemImg.setAttribute( "alt", arr[index].slice( 0, arr[index].length - 4 ) );
    return elemImg;
  }
  function appendTimer ( e ) {
    console.log ("Старт таймер");
    let minSecInText = getMinSec (timeCount);
    displayTimerElement ( timer, minSecInText.min, minSecInText.sec);
    if ( withTimer ) {
      timerCheckBox.setAttribute( 'name', 'timerOff' );
      withTimer = false;
      timerBox.classList.toggle( "elmHidden" );
      timerCheckBox.textContent = '';
      tabBox.removeEventListener( 'click', initTimer, false );
    } else {
      withTimer = true;
      timerCheckBox.setAttribute( 'name', 'timerOn' );
      timerCheckBox.textContent = '❃';
      timerBox.classList.toggle( "elmHidden" );
      tabBox.addEventListener( 'click', initTimer, false );      
    }
  }
  /*function initTimer() {
    if ( startButton.getAttribute( 'name' ) == 'restartGame' ) { 
      time = Date.now(); 
      tabBox.removeEventListener( 'click', initTimer, false );
      idTimer = setInterval(runTimer, 1000 );
      pauseButton.addEventListener('click', stopTimer, false );
    }
  }*/
  function initTimer() {
      time = Date.now(); 
      tabBox.removeEventListener( 'click', initTimer, false );
      idTimer = setInterval(runTimer, 1000 );
      pauseButton.addEventListener('click', stopTimer, false );
  }



  function runTimer() {
    console.log("GameStatus:", gameStatus);


    let newTime = Date.now();
    timeCount = newTime - time;

    let minSecInText = getMinSec (timeCount);
    displayTimerElement ( timer, minSecInText.min, minSecInText.sec );
    /*
    timer.innerHTML = '<div>'+ min +'</div><div>' + sec + '</div>';*/
  }  

  function getMinSec (count) {
    /*let newTime = Date.now();
    count = newTime - time;*/
    
    console.log ( count);
    let sec = Math.floor(count / 1000);
    let min = 0;
    console.log ( sec);
    if ( sec >= 60 ) {
      sec = Math.floor( (count / 1000) % 60) ;
      min = Math.floor( (count / 1000) / 60 );
    }
    if ( String(sec).length < 2 ) {
      sec = '0' + sec;
    };
    if ( String(min).length < 2 ) {
      min = '0' + min;
    };
    return { min: min, sec: sec };
  }
  function stopTimer ( e ) {
    if ( idTimer !== null ) {
      pauseButton.textContent = "Продолжить";
      clearInterval( idTimer );
      idTimer = null;
      tabBox.classList.toggle('elmHidden');
      let rendomId = Math.floor( Math.random() * ( img.length / 2 ) );
      imgToPause = createImg ( rendomId, fruit );
      boxToPauseImg.append( imgToPause );
      boxToPauseImg.classList.toggle("elmHidden");
    } else {
      pauseButton.textContent = "Пауза";
      time = Date.now() - timeCount;
      imgToPause.remove();
      boxToPauseImg.classList.toggle("elmHidden");
      tabBox.classList.toggle('elmHidden');
      idTimer = setInterval(runTimer, 1000, min, sec );
    }
  }
  function createMessage () {
    pauseButton.removeEventListener('click', stopTimer, false );
    popUp.innerHTML = '<span>Вы победили!</span>';
    popUp.style.fontSize = '60px';
    toggleMessage ();
    popUp.addEventListener( 'click', toggleMessage, false );
  }
  function toggleMessage ( e ) {
    popUp.classList.toggle( "elmHidden" );
    popUp.classList.toggle( "message" );
  }
  function showRules ( e ) {
    popUp.style.fontSize = '40px';
    popUp.innerHTML = '<span>На поле скрыты 8 пар картинок. Необходимо найти пару. Играть можно с таймером или без него.</span>';
    toggleMessage ();
    popUp.addEventListener( 'click', toggleMessage, false );
  }
  // function displayTimerElement(elem, min, sec) {
  //   displayElement(elem, timerTemplate, {min: min, sec: sec});
  // }

  function displayTimerElement(elem, min, sec) {    
    displayElement(elem, timerTemplate, {min: min, sec: sec});
  }

  function displayElement ( elem, templateProcessor, objParams) {
    let htmlText = templateProcessor(objParams);
    //debugger;
    elem.innerHTML = htmlText;
  }

 function timerTemplate (objParams) {
  //let htmlText = `<div> ${objParams.min} </div><div>  ${objParams.sec}  </div>`;
  //let htmlText2 = "<div>" + min + "</div><div>" + sec + "</div>";
  //debugger;
  return `<div> ${objParams.min} </div><div>  ${objParams.sec}  </div>`;
 }
  
}, false );
