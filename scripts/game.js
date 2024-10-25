// import * as dust from './classes/dust';
import * as upgrades from './classes/upgrade';
import * as handlers from './util/handlers';
import * as builders from './util/page';
import { progress } from './util/globals';

export const ALL_UPGRADES = [
  new upgrades.Upgrade('Baby Goose', 1, 1, false, 0),
  new upgrades.Upgrade('Goose Pen', 1, 1, true, 0),
  new upgrades.Upgrade('Young Goose', 2, 5, false, 0),
  new upgrades.Upgrade('Goose Pond', 2, 5, true, 0),
  new upgrades.Upgrade('Aspiring Goose', 3, 50, false, 0),
  new upgrades.Upgrade('Goose Park', 3, 50, true, 0),
  new upgrades.Upgrade('Smart Goose', 4, 120, false, 0),
  new upgrades.Upgrade('Goose Farm', 4, 120, true, 0),
  new upgrades.Upgrade('Adult Goose', 5, 1000, false, 0),
  new upgrades.Upgrade('Goose Machine', 5, 2000, true, 0),
  new upgrades.Upgrade('CEO Goose', 6, 6500, false, 0),
  new upgrades.Upgrade('Goose Industry', 6, 40000, true, 0),
  new upgrades.Upgrade('President Goose', 7, 14000, false, 0),
  new upgrades.Upgrade('Goose Country', 7, 120000, true, 0),
  new upgrades.Upgrade('Leader Goose', 8, 80000, false, 0),
  new upgrades.Upgrade('Goose Empire', 8, 300000, true, 0),
  new upgrades.Upgrade('Science Goose', 9, 190000, false, 0),
  new upgrades.Upgrade('Goose Planet', 9, 1200000, true, 0),
  new upgrades.Upgrade('Astronaut Goose', 10, 800000, false, 0),
  new upgrades.Upgrade('Goose Galaxy', 10, 8500000, true, 0),
  new upgrades.Upgrade('Cosmic Goose', 11, 100000000, false, 0),
  new upgrades.Upgrade('Goose Universe', 11, 100000000, true, 0),
];

function main() {
  if (localStorage.getItem(btoa('saveData'))) {
    progress.load();
  }
  builders.updatePoints();
  builders.updatePower();
  builders.loadUpgrades();
  setInterval(handlers.handleSecond, 1000);
}

main();
