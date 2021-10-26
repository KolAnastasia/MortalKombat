import { logs } from './logs.js';
import { getRandom } from './getRandom.js';
const $chat = document.querySelector('.chat')

export function generateLogs(type, player, enemy) {
    let text = logs[type];
    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    switch (type) {
        case 'start':
            text = text
                .replace('[time]', time)
                .replace('[player1]', player.name)
                .replace('[player2]', enemy.name);
            break;
        case 'hit':
            text = text[getRandom(text.length) - 1]
                .replace('[playerDefence]', player.name)
                .replace('[playerKick]', enemy.name);
            text = `${time} - ${text} - ${player.value} [${player.hp}/100]`;
            break;
        case 'draw':
            text = `${time} - ${text}`;
            break;
        case 'end':
            text = text[getRandom(text.length) - 1]
                .replace('[playerWins]', player.name)
                .replace('[playerLose]', enemy.name);
            text = `${time} - ${text}`;
            break;
        default:
            text = 'Упс, а куда все делись???'
            break;

    }

    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el,);
}