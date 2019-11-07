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
    pointA = this.spaceShip.position;
    for (let i = 0; i < this.level.obstacles.length; i++) {
      let pointB = this.level.obstacles[i];
      console.log("A ", pointA);
      console.log("B ", pointB);
      let one = (pointB.y) - (pointA.y);
      let two = (pointB.x) - (pointA.x);

      let distance = Math.sqrt(one * one + two * two);



      console.log(distance);
      if (distance <= 45) {
        this.level.obstacles[i].state = "bright";
      }
    }
    // END OF COLLISIONS

    // WIN LOSE CONDITIONS
    let allObstacles = this.level.obstacles;
    let hitObstacles = this.level.obstacles.filter(obs => {
      return obs.state === "bright";
    })

    if (allObstacles.length > 0 && allObstacles.length === hitObstacles.length) { //win condition

      this.winLooseState = "win";
    } else if (allObstacles.length > 0 && allObstacles.length !== hitObstacles.length && this.spaceShip.position.x > 1200) {
      this.winLooseState = "lose";
      console.log(allObstacles);
      console.log(this.spaceShip.position.x)
    }



  }

  drawEverything() {


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