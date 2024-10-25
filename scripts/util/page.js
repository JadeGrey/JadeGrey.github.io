import { ALL_UPGRADES } from './constants';
import { progress } from './globals';
import { Upgrade } from '../classes/upgrade';
import { calcCost } from './gameMath';

export function loadUpgrades() {
  var upgrades = document.getElementById('upgrades');
  upgrades.innerHTML = '';
  let i = 0;
  for (let _upgrade of ALL_UPGRADES) {
    _upgrade = Upgrade.parseUpgrade(_upgrade);
    console.log(_upgrade);
    console.log(`${_upgrade.name} | Count: ${_upgrade.count}`);
    var upgrade = document.createElement('div');
    upgrade.id = 'upgrade' + i;
    upgrade.innerHTML =
      '<p>' + _upgrade.name + '</p><p>Cost: ' + calcCost(_upgrade) + '</p>';
    upgrade.onclick = Upgrade.upgradeCallback(_upgrade);
    upgrades.appendChild(upgrade);
    i++;
  }
}

export function updatePoints() {
  document.getElementById('points').innerHTML =
    'Points: ' + Math.round(progress.points);
  document.getElementById(
    'multiplier'
  ).innerHTML = `Multiplier: ${progress.multiplier.toFixed(2)}x`;
}

export function updatePower() {
  document.getElementById('clickPower').innerHTML =
    'Click Power: ' + Math.round(progress.clickPower * progress.multiplier);
  document.getElementById('autoPower').innerHTML =
    'Auto Power: ' + Math.round(progress.autoPower * progress.multiplier);
}
