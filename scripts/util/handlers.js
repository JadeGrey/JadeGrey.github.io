import { updatePoints } from './page'
import { progress } from './globals'

function handleClick() {
    points = Math.round(progress.points + (progress.clickPower * progress.multiplier))
    progress.totalPoints = Math.round(progress.totalPoints + (progress.clickPower * progress.multiplier))
    updatePoints()
}

function handleAutoClick() {
    progress.points = Math.round(progress.points + (progress.autoPower * progress.multiplier))
    progress.totalPoints = Math.round(progress.totalPoints + (progress.autoPower * progress.multiplier))
    updatePoints()
}

function modifierHandler(modifier, count) {
    if (modifier === 'multiplier') {
        return progress.multiplier += 0.1 * count
    }
}

function handleSecond() {
    handleAutoClick()
    progress.save()
    if (canAccend() && !document.getElementById('Accend')) {
        buttons = document.getElementById("options")
        buttons.innerHTML += '<input type="button" onclick="progress.accend()" value="Accend" id="Accend">'
    }
}

export default {
    autoClick: handleAutoClick, click: handleClick, second: handleSecond, modifier: modifierHandler
}