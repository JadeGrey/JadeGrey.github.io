import * as game from './util/imports'
import { progress } from './util/globals'

function main() {
    if (localStorage.getItem(btoa('saveData'))) {
        progress.load()
    }
    game.builders.updatePoints()
    game.builders.updatePower()
    game.builders.loadUpgrades()
    setInterval(game.handlers.second, 1000)
}

main()