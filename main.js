import { player1, player2 } from './players.js';
import { generateLogs } from './generateLogs.js';
import { getRandom } from './getRandom.js';
import { createPlayer } from './createPlayer.js';
import { createElement } from './createElement.js';


const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];


generateLogs('start', player1, player2)


function playerWins(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + ' Wins';
    } else {
        $winTitle.innerText = 'draw';
    }

    return $winTitle;
}


const createReloadButton = () => {
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

const playerAttack = () => {
    const attack = {}

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

const showResult = () => {
    if (player1.hp === 0 || player2.hp === 0) {
        createReloadButton()
           
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1)
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2)
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw', player1, player2)
    }

}



$formFight.addEventListener('submit', function (event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value)
        player1.value = enemy.value
        player1.renderHp();
        generateLogs('hit', player2, player1);

    }

    if (enemy.defence !== player.hit) {
        player2.changeHP(player.value)
        player2.renderHp();
        player2.value = enemy.value
        generateLogs('hit', player1, player2);
    }

    showResult();


})