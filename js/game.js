class Game {



  constructor(context, {
    getCurrentPitch
  }, noOfPlan) {
    this.context = context;
    this.getCurrentPitch = getCurrentPitch;
    this.pitch;
    this.spaceShip = new Player(this);
    this.numberOfPlanets = noOfPlan;
    this.level = new Background(this, this.numberOfPlanets);


    this.winLooseState = "playing";
    this.loop();


  }

  loop(timestamp) {
    const pitch = this.getCurrentPitch();
    this.pitch = pitch;


    this.updateEverything();
    this.drawEverything();


    window.requestAnimationFrame((timestamp) => this.loop(timestamp));
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

      let one = (pointB.y) - (pointA.y);
      let two = (pointB.x) - (pointA.x);

      let distance = Math.sqrt(one * one + two * two);



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

    }



  }

  drawEverything() {


    this.context.clearRect(0, 0, 1500, 500);




    if (this.winLooseState === "playing") {
      this.level.draw();
      this.spaceShip.draw();
    } else if (this.winLooseState === "win") {
      this.level.drawWin();

    } else if (this.winLooseState === "lose") {
      this.level.drawLose();

    }




  }

  asd() {




    this.spaceShip = new Player(this);

    this.level = new Background(this, this.numberOfPlanets);


    this.winLooseState = "playing";
  }
}