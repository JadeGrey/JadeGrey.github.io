let clickPower = 1;
let autoPower = 0;
let totalPoints = 0;
let points = 0;
let dust = 0;
let multiplier = 1;
let cur_upgrades = [];
let dust_upgrades = [];
let progress;

class Upgrade {
    constructor(name, tier, power, auto, count = 1) {
        this.name = name;
        this.tier = tier;
        this.power = power;
        this.auto = auto;
        this.count = count;
    }

    addCount(count = 1) {
        this.count += count;
    }

    static fromObject(obj) {
        return new Upgrade(obj.name, obj.tier, obj.power, obj.auto, obj.count)
    }
}

class DustUpgrade {
    constructor(name, tier, modifier, cost, count = 1) {
        this.name = name;
        this.tier = tier;
        this.modifier = modifier;
        this.cost = cost;
        this.count = count;
    }

    addCount(count = 1) {
        this.count += count;
    }

    buy(count = 1) {
        for (i = 0; i < dust_upgrades.length; i++) {
            if (this.name == dust_upgrades[i].name) {
                this.addCount(count)
                modifierHandler(this.modifier, count)
                return
            }
        }

        dust_upgrades.push(this)

        if (count > 1) {
            this.addCount(count - 1)
        }

        modifierHandler(this.modifier, count)
    }
}

class Progress {
    constructor(clickPower, autoPower, totalPoints, points, multiplier, cur_upgrades, dust) {
        this.clickPower = clickPower
        this.autoPower = autoPower
        this.totalPoints = totalPoints
        this.points = points
        this.multiplier = multiplier
        this.upgrades = cur_upgrades
        this.dust = dust
    }

    sync() {
        this.clickPower = clickPower
        this.autoPower = autoPower
        this.totalPoints = totalPoints
        this.points = points
        this.multiplier = multiplier
        this.upgrades = cur_upgrades
        this.dust = dust
    }

    dump() {
        clickPower = this.clickPower
        autoPower = this.autoPower
        totalPoints = this.totalPoints
        points = this.points
        multiplier = this.multiplier
        cur_upgrades = this.upgrades.map(Upgrade.fromObject)
        dust = this.dust
        progress = this
        updatePoints()
        updatePower()
    }

    save(sync = true) {
        if (sync) {
            this.sync()
        }
        localStorage.setItem(btoa('saveData'), btoa(JSON.stringify(this)))
    }

    load(dump = true) {
        let p = localStorage.getItem(btoa('saveData'))
        if (p) {
            p = JSON.parse(atob(p))
            this.clickPower = p.clickPower
            this.autoPower = p.autoPower
            this.totalPoints = p.totalPoints
            this.points = p.points
            this.multiplier = p.multiplier
            this.upgrades = p.upgrades
            this.dust = p.dust
        }

        if (dump) {
            this.dump()
        }
    }

    reset() {
        this.import(btoa(JSON.stringify(new Progress(1, 0, 0, 0, 1, [], 0))))
        updatePoints()
        updatePower()
    }

    import(value, dump=true) {
        let data = atob(value)
        data = JSON.parse(data)
        this.clickPower = data.clickPower
        this.autoPower = data.autoPower
        this.totalPoints = data.totalPoints
        this.points = data.points
        this.multiplier = data.multiplier
        this.upgrades = data.upgrades
        this.dust = data.dust

        if (dump) {
            this.dump()
        }
    }

    export(sync = true) {
        if (sync) {
            this.sync()
        }
        return btoa(JSON.stringify(this))
    }
}

const FPS = 30
const CLICK_BASE_COST = 75.0;
const AUTO_BASE_COST = 100.0;
const DISCOUNT_PER_TIER = 0.02;
const POWER_COST_MULTIPLIER = 1.15;
const ALL_UPGRADES = [
    new Upgrade("Baby Goose", 1, 1, false, 0),
    new Upgrade("Goose Pen", 1, 1, true, 0),
    new Upgrade("Young Goose", 2, 5, false, 0),
    new Upgrade("Goose Pond", 2, 5, true, 0),
    new Upgrade("Aspiring Goose", 3, 50, false, 0),
    new Upgrade("Goose Park", 3, 50, true, 0),
    new Upgrade("Smart Goose", 4, 120, false, 0),
    new Upgrade("Goose Farm", 4, 120, true, 0),
    new Upgrade("Adult Goose", 5, 1000, false, 0),
    new Upgrade("Goose Machine", 5, 2000, true, 0),
    new Upgrade("CEO Goose", 6, 6500, false, 0),
    new Upgrade("Goose Industry", 6, 40000, true, 0),
    new Upgrade("President Goose", 7, 14000, false, 0),
    new Upgrade("Goose Country", 7, 120000, true, 0),
    new Upgrade("Leader Goose", 8, 80000, false, 0),
    new Upgrade("Goose Empire", 8, 300000, true, 0),
    new Upgrade("Science Goose", 9, 190000, false, 0),
    new Upgrade("Goose Planet", 9, 1200000, true, 0),
    new Upgrade("Astronaut Goose", 10, 800000, false, 0),
    new Upgrade("Goose Galaxy", 10, 8500000, true, 0),
    new Upgrade("Cosmic Goose", 11, 100000000, false, 0),
    new Upgrade("Goose Universe", 11, 100000000, true, 0),
];
const MODIFIERS = [
    "multiplier"
];
const ALL_DUST_UPGRADES = [
    new DustUpgrade("Goose Wax", 0, "multiplier"),
]

function handleClick() {
    points = Math.round(points + (clickPower * multiplier))
    totalPoints = Math.round(totalPoints + (clickPower * multiplier))
    updatePoints()
}

function handleAutoClick() {
    points = Math.round(points + (autoPower * multiplier))
    totalPoints = Math.round(totalPoints + (autoPower * multiplier))
    updatePoints()
}

function modifierHandler(modifier, count) {
    if (modifier === 'multiplier') {
        return multiplier += 0.1 * count
    }
}

function calcCost(upgrade, amount = 1) {
    if (upgrade.auto) {
        cost = (AUTO_BASE_COST * upgrade.power) * (POWER_COST_MULTIPLIER ** (upgrade.count * amount)) * (1 - (DISCOUNT_PER_TIER * (upgrade.tier - 1)))
    } else {
        cost = (CLICK_BASE_COST * upgrade.power) * (POWER_COST_MULTIPLIER ** (upgrade.count * amount)) * (1 - (DISCOUNT_PER_TIER * (upgrade.tier - 1)))
    }

    return Math.ceil(cost)
}   

function parseUpgrade(upgrade) {
    for (let _upgrade of cur_upgrades) {
        console.log(`B: ${upgrade.name} | A: ${_upgrade.name}`)
        if (upgrade.name === _upgrade.name) {
            console.log(_upgrade)
            return _upgrade
        }
    }
    return upgrade
}

function buyUpgrade(upgrade, multiplier) {
    cost = calcCost(upgrade, multiplier)

    if (points >= cost) {
               
        for (i = 0; i < multiplier; i++) {
            
            if (upgrade.count > 0) {
                upgrade.addCount()
            } else {
                upgrade.count = 1
                cur_upgrades.push(upgrade)
            }
            if (upgrade.auto) {
                autoPower += upgrade.power
            } else {
                clickPower += upgrade.power
            }
        }
        points = points - cost
        updatePoints() 
        updatePower()
        loadUpgrades()
        return true
    }
    return false
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function handleSecond() {
    handleAutoClick()
    progress.save()
    if (canAccend() && !document.getElementById('Accend')) {
        buttons = document.getElementById("options")
        buttons.innerHTML += '<input type="button" onclick="accend()" value="Accend" id="Accend">'
    }
}

function calcDust() {
    conv = Math.floor(totalPoints / 100000000)
    return conv
}

function accend() {
    if (canAccend()) {
        dust = dust + calcDust()
        totalPoints = totalPoints - (calcDust() * 100000000)
        p = new Progress(1, 0, totalPoints, 0, multiplier + (dust/10), [], 0)
        progress.import(btoa(JSON.stringify(p)))
    }
}

function main() {
    progress = new Progress(1, 0, 0, 1, [])
    if (localStorage.getItem(btoa('saveData'))) {
        progress.load()
    }
    updatePoints()
    updatePower()
    loadUpgrades()
    setInterval(handleSecond, 1000)
}

function loadUpgrades() {
    var upgrades = document.getElementById("upgrades")
    upgrades.innerHTML = '';
    let i = 0
    for (let _upgrade of ALL_UPGRADES) {
        _upgrade = parseUpgrade(_upgrade)
        console.log(_upgrade)
        console.log(`${_upgrade.name} | Count: ${_upgrade.count}`)
        var upgrade = document.createElement("div")
        upgrade.id = "upgrade" + i
        upgrade.innerHTML = "<p>" + _upgrade.name + "</p><p>Cost: " + calcCost(_upgrade) + "</p>"
        upgrade.onclick = upgradeCallback(_upgrade);
        upgrades.appendChild(upgrade)
        i++
    }
}

function updatePoints() {
    document.getElementById("points").innerHTML = "Points: " + Math.round(points)
    document.getElementById("multiplier").innerHTML = `Multiplier: ${multiplier.toFixed(2)}x`

}

function updatePower() {
    document.getElementById("clickPower").innerHTML = "Click Power: " + Math.round(clickPower * multiplier)
    document.getElementById("autoPower").innerHTML = "Auto Power: " + Math.round(autoPower * multiplier)
}

function upgradeCallback(upgrade) {
    return function() {
        buyUpgrade(upgrade, 1)
    }
}

function canAccend() {
    if (multiplier > 1) {
        return true
    }
    for (let _upgrade of cur_upgrades) {
        if (_upgrade.name == "Goose Empire") {
            return true
        }
    }
    return false
}

main()