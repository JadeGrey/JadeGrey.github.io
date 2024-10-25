import * as progression from './classes/progression';
// import * as dust from './classes/dust';
import * as upgrades from './classes/upgrade';
import * as CONSTANTS from './util/constants';
import * as gmath from './util/gameMath';
import * as handlers from './util/handlers';
import * as builders from './util/page';
import { progress } from './util/globals';

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
