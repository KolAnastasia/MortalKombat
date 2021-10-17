const player1 = {
    name: 'Sonya',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + 'Fight...')},         
};


const player2 = {
    name: 'scorpion',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + 'Fight...')},         
};


function createPlayer(className, obj ) {
    const $player = document.createElement('div');
    $player.classList.add(className);

   

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerText = obj.name;

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $img = document.createElement('img');
    $img.src = obj.img;

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width =  obj.hp + '%';


    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img)

    $player.appendChild($progressbar)
    $player.appendChild($character)

    const $arenas = document.querySelector('.arenas')
    $arenas.appendChild($player)

    

}

createPlayer('player1', player1);
createPlayer('player2', player2);