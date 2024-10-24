export default class DustUpgrade {
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