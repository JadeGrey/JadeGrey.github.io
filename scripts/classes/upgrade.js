import { progress } from '../util/globals'
import { calcCost } from '../util/gameMath'
import { updatePoints, updatePower, loadUpgrades } from '../util/page'

export default class Upgrade {
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

    static buyUpgrade(upgrade, multiplier) {
        cost = calcCost(upgrade, multiplier)
    
        if (progress.points >= cost) {
                   
            for (i = 0; i < multiplier; i++) {
                
                if (upgrade.count > 0) {
                    upgrade.addCount()
                } else {
                    upgrade.count = 1
                    progress.upgrades.push(upgrade)
                }
                if (upgrade.auto) {
                    progress.autoPower += upgrade.power
                } else {
                    progress.clickPower += upgrade.power
                }
            }
            progress.points -= cost
            updatePoints() 
            updatePower()
            loadUpgrades()
            return true
        }
        return false
    }

    static parseUpgrade(upgrade) {
        for (let _upgrade of progress.upgrades) {
            if (upgrade.name === _upgrade.name) {
                return _upgrade
            }
        }
        return upgrade
    }

    static upgradeCallback(upgrade) {
        return function() {
            buyUpgrade(upgrade, 1)
        }
    }
}
