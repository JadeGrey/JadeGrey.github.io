export class Progress {
    constructor(
      clickPower = 1,
      autoPower = 0,
      totalPoints = 0,
      points = 0,
      multiplier = 1,
      upgrades = [],
      dust = 0
    ) {
      this.clickPower = clickPower;
      this.autoPower = autoPower;
      this.totalPoints = totalPoints;
      this.points = points;
      this.multiplier = multiplier;
      this.upgrades = upgrades;
      this.dust = dust;
    }
  
    save() {
      localStorage.setItem(btoa('saveData'), btoa(JSON.stringify(this)));
    }
  
    load() {
      let p = localStorage.getItem(btoa('saveData'));
      if (p) {
        p = JSON.parse(atob(p));
        Object.assign(this, Progress.fromObject(p));
      }
    }
  
    reset() {
      this.import(btoa(JSON.stringify(new Progress(1, 0, 0, 0, 1, [], 0))));
      updatePoints();
      updatePower();
      loadUpgrades();
      document.getElementById('Accend').remove();
    }
  
    import(value) {
      let data = atob(value);
      data = JSON.parse(data);
      Object.assign(this, Progress.fromObject(data));
    }
  
    export() {
      return btoa(JSON.stringify(this));
    }
  
    canAccend() {
      if (multiplier > 1) {
        return true;
      }
      for (let _upgrade of this.upgrades) {
        if (_upgrade.name === 'Goose Empire') {
          return true;
        }
      }
      return false;
    }
  
    accend() {
      if (Progress.canAccend()) {
        this.dust += calcDust();
        this.totalPoints -= calcDust() * 100000000;
        p = new Progress(
          1,
          0,
          this.totalPoints,
          0,
          this.multiplier + this.dust / 10,
          [],
          0
        );
        Object.assign(this, p);
      }
    }
  
    static fromObject(obj) {
      return new Progress(
        obj.clickPower,
        obj.autoPower,
        obj.totalPoints,
        obj.points,
        obj.multiplier,
        obj.upgrades,
        obj.dust
      );
    }
  }
  