import { updatePoints } from './page';
import { progress } from './globals';

export function handleClick() {
  points = Math.round(
    progress.points + progress.clickPower * progress.multiplier
  );
  progress.totalPoints = Math.round(
    progress.totalPoints + progress.clickPower * progress.multiplier
  );
  updatePoints();
}

export function handleAutoClick() {
  progress.points = Math.round(
    progress.points + progress.autoPower * progress.multiplier
  );
  progress.totalPoints = Math.round(
    progress.totalPoints + progress.autoPower * progress.multiplier
  );
  updatePoints();
}

export function modifierHandler(modifier, count) {
  if (modifier === 'multiplier') {
    return (progress.multiplier += 0.1 * count);
  }
}

export function handleSecond() {
  handleAutoClick();
  progress.save();
  if (canAccend() && !document.getElementById('Accend')) {
    buttons = document.getElementById('options');
    buttons.innerHTML +=
      '<input type="button" onclick="progress.accend()" value="Accend" id="Accend">';
  }
}
