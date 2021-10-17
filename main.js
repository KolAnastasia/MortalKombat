
const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button');

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


function createElement(tag, className){
    const $tag= document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}


function createPlayer( playerObj ) {
    const $player = createElement('div', 'player'+ playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width =  playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;
    
    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
    

}

function random(number) { 
    return Math.ceil(Math.random() * number);
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player +' .life');
    const $damage = random(20)
    player.hp -= $damage;
    $playerLife.style.width = player.hp + '%';


    if (player1.hp <= 0) {
        player1.hp = 0;
        $arenas.appendChild(playerWins(player2.name));
        $playerLife.style.width=0 + "%";
    }

    if (player2.hp <= 0) {
        player2.hp = 0;
        $arenas.appendChild(playerWins(player1.name));
        $playerLife.style.width=0 + "%";
 
    }

}


function playerWins(name){
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' WINS';
    $randomButton.disabled = true

    return $winTitle;
}

$randomButton.addEventListener('click', function(){
    console.log('####: click Random Button');
    changeHP(player1);
    changeHP(player2);

})


createPlayer('player1', player1);
createPlayer('player2', player2);