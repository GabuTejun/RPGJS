let player = {
    strBase: 2,
    dexBase: 2,
    vitBase: 2,
    vit: 0,
    dex: 0,
    str: 0,
    expPlayer: 0,
    expForLevelUp: 10,
    levelPlayer: 1,
    statsUp: 0,
};
let enemys = [{
    nameMonster: "Slime",
    minStats: 2,
    maxStats: 5,
}];
player.vit = player.vitBase
player.str = player.strBase
player.dex = player.dexBase
playerStats("hidden")

function createMonster() {
    document.getElementById('nameMonster').hidden = false;
    document.getElementById('minStats').hidden = false;
    document.getElementById('maxStats').hidden = false;
    document.getElementById('sendMonster').hidden = false;
}

function verifyNewMonster() {
    nameMonster = document.getElementById('nameMonster').value;
    minStats = Number(document.getElementById('minStats').value);
    maxStats = Number(document.getElementById('maxStats').value);
    for (let i = 0; i < enemys.length; i++){
        if(nameMonster != enemys[i].nameMonster){
        } else {
            document.getElementById('response').innerHTML = "Nome já usado!"
            return
        }
    }
    newMonster(nameMonster, minStats, maxStats)
}

function newMonster(nameMonster, minStats, maxStats) {
    if (nameMonster != "" && minStats > 0 && maxStats > minStats){
        enemys.push({
            nameMonster,
            minStats,
            maxStats
        })
        document.getElementById('response').innerHTML = "";
        document.getElementById('nameMonster').value = "";
        document.getElementById('minStats').value = "";
        document.getElementById('maxStats').value = "";
        document.getElementById('nameMonster').hidden = true;
        document.getElementById('minStats').hidden = true;
        document.getElementById('maxStats').hidden = true;
        document.getElementById('sendMonster').hidden = true;
    } else {
        document.getElementById('response').innerHTML = "Impóssivel criar um monstro assim! Por Favor altere alguma informação para continuar."
    }
}

function spawnMonster() {
    enemy = Math.round(Math.random() * (enemys.length - 1) + 0)
    strMonster = Number(Math.round(Math.random() * (enemys[enemy].maxStats - enemys[enemy].minStats) + enemys[enemy].minStats - enemys[enemy].minStats/2))
    vitMonster = Number(Math.round(Math.random() * (enemys[enemy].maxStats - enemys[enemy].minStats) + enemys[enemy].minStats + enemys[enemy].maxStats))
    dexMonster = Number(Math.round(Math.random() * (enemys[enemy].maxStats - enemys[enemy].minStats) + enemys[enemy].minStats - enemys[enemy].minStats))
    expMonster = Number(Math.round((strMonster + vitMonster + dexMonster)/4))
    document.getElementById('enemy').innerHTML = "Monstro : " + enemys[enemy].nameMonster + "<br>Força = " + strMonster + "<br>Defesa = " + dexMonster + "<br>Vida = " + vitMonster
}

function battle() {
    if (dexMonster < player.str){
        vitMonster += dexMonster - player.str
    }
    if (player.dex < strMonster){
        player.vit += player.dex - strMonster
    }

    document.getElementById('enemy').innerHTML = "Monstro : " + enemys[enemy].nameMonster + "<br>Força = " + strMonster + "<br>Defesa = " + dexMonster + "<br>Vida = " + vitMonster
    playerStats("hidden")

    if (vitMonster <= 0){
        player.expPlayer += expMonster
        player.vit = player.vitBase
        spawnMonster()
        playerStats("hidden")

        if (player.expPlayer >= player.expForLevelUp){
            player.levelPlayer += 1
            player.expPlayer = 0
            player.expForLevelUp = Math.round(player.expForLevelUp * 1.5)
            playerStats()
            player.statsUp = player.levelPlayer
            document.getElementById('spawnMonster').disabled = true
            document.getElementById('battle').disabled = true
        }
        
    }

    if (player.vit <= 0){

    }

    console.log(player.expPlayer, player.expForLevelUp, player.levelPlayer)
    console.log(player.statsUp)
}


function playerStats(hidden) {
    document.getElementById('strPlayer').innerHTML = "Força = " + player.str + "<button id='strUp' " + hidden + " onclick='statsUp(`strBase`)'>+</button>"
    document.getElementById('dexPlayer').innerHTML = "Defesa = " + player.dex + "<button id='dexUp' " + hidden + " onclick='statsUp(`dexBase`)'>+</button>"
    document.getElementById('vitPlayer').innerHTML = "Vida = " + player.vit + "<button id='vitUp' " + hidden + " onclick='statsUp(`vitBase`)'>+</button>"
}

function statsUp(stat) {
    
    player[stat] += 1
    player.statsUp = player.statsUp-1
    player.vit = player.vitBase
    player.str = player.strBase
    player.dex = player.dexBase
    playerStats()
    if (player.statsUp == 0) {
        playerStats("hidden")
        document.getElementById('spawnMonster').disabled = false
        document.getElementById('battle').disabled = false
    }
}
