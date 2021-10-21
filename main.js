const $arenas = document.querySelector('.arenas')
// const $randomButton = document.querySelector('.button');

const $formFight = document.querySelector('.control')
const player1 = {
    name: 'Sonya',
    hp: 100,
    player: 1,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function () {
        console.log(this.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHp
};

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}


const ATTACK = ['head', 'body', 'foot'];



const player2 = {
    name: 'Scorpion',
    hp: 100,
    player: 2,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function () {
        console.log(this.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHp
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}


function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;


}

function changeHP(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    return this.hp;
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');

}

function renderHp() {
    this.elHP().style.width = this.hp + '%';

}

function playerWins(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + ' Wins';
    } else {
        $winTitle.innerText = 'draw';
    }

    return $winTitle;
}

function getRandom(number) {
    return Math.ceil(Math.random() * number);
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    $arenas.appendChild($reloadWrap);

    const $reloadButton = createElement('button', 'button');
    $reloadWrap.appendChild($reloadButton);
    $reloadButton.innerText = 'Restart';
    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    })


    return $reloadButton;

}




// $randomButton.addEventListener('click', function () {
//     player1.changeHP(getRandom());
//     player2.changeHP(getRandom());
//     player1.renderHp();
//     player2.renderHp();

//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton()
//     }

//     if (player1.hp === 0 && player1.hp < player2.hp) {
//         $arenas.appendChild(playerWins(player2.name));
//     } else if (player2.hp === 0 && player2.hp < player1.hp) {
//         $arenas.appendChild(playerWins(player1.name));
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild(playerWins());
//     }
// })

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defense = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defense
    }
}



$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const attack = {}

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        if (attack.hit === enemy.defense) {
            attack.value = 0

        }
        if (enemy.hit === attack.defence) {
            enemy.value = 0

        }

        item.checked = false;
    }



    player1.changeHP(enemy.value);
    player2.changeHP(attack.value);
    player1.renderHp();
    player2.renderHp();

    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton()
    }



    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
    }


    console.log('####:a', attack);
    console.log('####:e', enemy);

})