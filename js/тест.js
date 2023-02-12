/*function createImg ( name, index ) {
  name[i]
}*/
let num = Math.floor( Math.random() * ( arr.length / 2 ) );
function createImg ( index ) {
  img[index] = document.createElement( 'img' );
  img[index].src = PATH + mixFruit[i];
  img[index].setAttribute( "alt", mixFruit[index].slice( 0, mixFruit[index].length - 4 ) );
  return img[index];
}