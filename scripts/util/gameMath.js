import { AUTO_BASE_COST, CLICK_BASE_COST, POWER_COST_MULTIPLIER, DISCOUNT_PER_TIER } from './constants'

function calcDust() {
    conv = Math.floor(totalPoints / 100000000)
    return conv
}

function calcCost(upgrade, amount = 1) {
    if (upgrade.auto) {
        cost = (AUTO_BASE_COST * upgrade.power) * (POWER_COST_MULTIPLIER ** (upgrade.count * amount)) * (1 - (DISCOUNT_PER_TIER * (upgrade.tier - 1)))
    } else {
        cost = (CLICK_BASE_COST * upgrade.power) * (POWER_COST_MULTIPLIER ** (upgrade.count * amount)) * (1 - (DISCOUNT_PER_TIER * (upgrade.tier - 1)))
    }

    return Math.ceil(cost)
}

export default {
    calcCost, calcDust
}