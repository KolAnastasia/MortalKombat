export const player1 = {
    name: 'Sonya',
    hp: 100,
    player: 1,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    value: 0,
    attack: function () {
        console.log(this.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHp,
   
}

export const player2 = {
    name: 'Scorpion',
    hp: 100,
    player: 2,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    value: 0,
    attack: function () {
        console.log(this.name + 'Fight...')
    },
    changeHP,
    elHP,
    renderHp,
};

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
