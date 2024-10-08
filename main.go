package main

import (
	"time"
	"fmt"
	"net/http"
	"html/template"
)

var clickPower int = 1
var autoPower int = 0
var points int = 100000000
var frame int = 0
var multiplier int = 1
var upgrades []Upgrade

var allUpgrades []Upgrade = []Upgrade{{name: "Baby Goose", tier: 1, power: 1, auto: false}, {name: "Goose Pen", tier: 1, power: 1, auto: true}, {name: "Young Goose", tier: 2, power: 5, auto: false}, {name: "Goose Pond", tier: 2, power: 5, auto: true}, {name: "Aspiring Goose", tier: 3, power: 50, auto: false}, {name: "Goose Park", tier: 3, power: 50, auto: true}, {name: "Smart Goose", tier: 4, power: 120, auto: false}, {name: "Goose Farm", tier: 4, power: 120, auto: true}, {name: "Adult Goose", tier: 5, power: 1000, auto: false}, {name: "Goose Machine", tier: 5, power: 2000, auto: true}, {name: "CEO Goose", tier: 6, power: 6500, auto: false}, {name: "Goose Industry", tier: 6, power: 40000, auto: true}, {name: "President Goose", tier: 7, power: 14000, auto: false}, {name: "Goose Country", tier: 7, power: 120000, auto: true}, {name: "Leader Goose", tier: 8, power: 80000, auto: false}, {name: "Goose Empire", tier: 8, power: 300000, auto: true},}

const (
	FPS float32 = 1.0 / 30.0 * float32(time.Second)
	CLICK_BASE_COST float64 = 100.0
	AUTO_BASE_COST float64 = 250.0
	DISCOUNT_PER_TIER float64 = 0.02
	)

type Upgrade struct {
	name string
	tier int
	power int
	auto bool
}

func main() {
	// for true {
	// 	handleFrame()
	// 	time.Sleep(time.Duration(FPS))
	// 	fmt.Println(points)
	// }
	fmt.Println(calcCost(allUpgrades[15]))
	fmt.Println(allUpgrades[15].name)
}

func handleClick() {
	points = points + clickPower
}

func handleAutoClick() {
	points = points + int(autoPower * multiplier)
}

func handleFrame() {
	if frame >= 30 {
		handleAutoClick()
		buyUpgrade(allUpgrades[9], 5)
		frame = 0
	}
	frame++
}

func buyUpgrade(upgrade Upgrade, multiplier int) (success bool) {
	cost := calcCost(upgrade) * multiplier
	if points >= cost {
		for i := 0; i < multiplier; i++ {
			points = points - cost
			upgrades = append(upgrades, upgrade)
			if upgrade.auto {
				autoPower = autoPower + upgrade.power
			} else {
				clickPower = clickPower + upgrade.power
			}
			return true
		}
	}
	return false
}

func calcCost(upgrade Upgrade) (cost int) {
	if upgrade.auto {
		cost = int((AUTO_BASE_COST * float64(upgrade.power)) * (1.0 - DISCOUNT_PER_TIER * float64(upgrade.tier)))
		return
	}
	cost = int((CLICK_BASE_COST * float64(upgrade.power)) * (1.0 - DISCOUNT_PER_TIER * float64(upgrade.tier)))
	return
}
