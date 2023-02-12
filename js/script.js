let fruit = [ 'apple.png', 'bananas.png', 'grape.png', 'lemon.png', 'mandarin.png', 'pear.png', 'pineapple.png', 'watermelon.png', 'apple.png', 'bananas.png', 'grape.png', 'lemon.png', 'mandarin.png', 'pear.png', 'pineapple.png', 'watermelon.png' ];
    const PATH = 'images/';
    
    document.addEventListener( 'DOMContentLoaded', function () { 
      let startButton = document.querySelector( '.startButton' );
      startButton.addEventListener( 'click', newGame, false );

    let mixFruit;
    let flexCell = document.querySelectorAll( '.flexCell' );
    let imgCover = [];
    let imgBox = [];
    let img = [];
    let imgToCheck = [];
    let idToCheck = [];
    let idNum;
    let countImgs;

    function newGame ( e ) { 
      if ( startButton.getAttribute( 'value' ) == 'restartGame' ) { 
        for ( let i = 0; i < fruit.length; i++ ) {
          imgBox[i].removeChild( img[i] );
          flexCell[i].removeChild( imgCover[i] );
          flexCell[i].removeChild( imgBox[i] );
        }
        imgToCheck.splice( 0, imgToCheck.length); 
        idToCheck.splice( 0, idToCheck.length);
      }
      startButton.setAttribute( 'value', 'restartGame' );
      startButton.textContent = "Начать заново";
      
      mixFruit = mixArr( fruit );
      countImgs = 0;
      for ( let i = 0; i < fruit.length; i++ ) { 
        flexCell[i].style.backgroundImage = "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";
        imgCover[i] = document.createElement( 'div' );
        imgBox[i] = document.createElement( 'div' );
        img[i] = document.createElement( 'img' );
        imgCover[i].id = i;
        imgCover[i].classList.add('imgCover');
        imgBox[i].classList.add('elmHidden');
        img[i].classList.add('elmHidden');
        img[i].src = PATH + mixFruit[i];
        img[i].setAttribute( "alt", mixFruit[i].slice( 0, mixFruit[i].length - 4 ) );
        flexCell[i].appendChild( imgCover[i] );
        flexCell[i].appendChild( imgBox[i] );
        imgBox[i].appendChild( img[i] );
        imgCover[i].addEventListener( 'click', сheckImg, false );
      }
    }  
    function сheckImg ( e ) {
      idNum = +( this.getAttribute( "id" ) );
      console.log ('idNum', idNum);
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
          imgCover[idToCheck[0]].removeEventListener( 'click', сheckImg, false );
          imgCover[idToCheck[1]].removeEventListener( 'click', сheckImg, false ); 
        }
          imgToCheck.splice( 0, imgToCheck.length); 
          idToCheck.splice( 0, idToCheck.length);
      }
    } 
    function toggleImg ( j ) { 
      imgBox[j].classList.toggle('elmHidden');
      imgCover[j].classList.toggle( "elmHidden" );
      img[j].classList.toggle( "elmHidden" ); //imgBox[idNum].style.transform = 'rotateY(180deg)';
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
    }, false );