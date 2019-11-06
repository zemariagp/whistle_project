class Game {
  constructor(context, {
    getCurrentPitch
  }) {
    this.context = context;
    this.getCurrentPitch = getCurrentPitch;
    this.pitch;
    this.level = new Background(this, 1);


    this.spaceShip = new Player(this);
    this.winLooseState = "playing";
    this.loop();


  }

  loop() {
    const pitch = this.getCurrentPitch();
    this.pitch = pitch;

    this.updateEverything();
    this.drawEverything();


    window.requestAnimationFrame(() => this.loop());
  }

  updateEverything() {
    this.spaceShip.move();
    let pointA = {
      x: 0,
      y: 0
    };

    // COLLISIONS
    pointA = this.spaceShip.positionLog[this.spaceShip.positionLog.length - 1];
    for (let i = 0; i < this.level.obstacles.length; i++) {
      let pointB = this.level.obstacles[i];
      let distance = Math.round(Math.sqrt((((pointB.y + 45) - (pointA.y + 35)) ** 2) + (((pointB.x + 45) - (pointA.x + 40)) ** 2)));

      if (distance <= 100) {
        this.level.obstacles[i].state = "bright";
      }
    }
    let x = this.level.obstacles.filter(obs => {
      return obs.state === "bright";
    })

    // if(this.level.obstacles.length > 0 && this.level.obstacles.length === x.length)

    if (1 == 1) {
      // win
      this.winLooseState = "win";
    }
  }









  drawEverything() {
    // console.log('drawing');
    // this.level1.draw();

    this.context.clearRect(0, 0, 1500, 500);




    if (this.winLooseState === "playing") {
      this.level.draw();
      this.spaceShip.draw();
    } else if (this.winLooseState === "win") {
      this.level.drawWin();
      console.log("win");
    } else if (this.winLooseState === "lose") {
      this.level.drawLose();
    }




  }
}