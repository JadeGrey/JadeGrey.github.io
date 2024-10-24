import { Upgrade } from '../classes/upgrade'

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
// const ALL_DUST_UPGRADES = [
//     new DustUpgrade("Goose Wax", 0, "multiplier"),
// ]

export default {
    FPS: FPS,
    CLICK_BASE_COST: CLICK_BASE_COST,
    AUTO_BASE_COST: AUTO_BASE_COST,
    DISCOUNT_PER_TIER: DISCOUNT_PER_TIER,
    POWER_COST_MULTIPLIER: POWER_COST_MULTIPLIER,
    ALL_UPGRADES: ALL_UPGRADES,
    MODIFIERS: MODIFIERS,
    ALL_DUST_UPGRADES: ALL_DUST_UPGRADES
}