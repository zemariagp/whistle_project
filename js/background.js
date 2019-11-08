class Background {
  constructor(game, numObs) {
    this.game = game;
    // this.level = level;

    this.obstacles = [];
    this.background = [];

    this.backgroundPathArray = ["img/nebula03.png", "img/nebula06.png", "img/nebula07.png"];
    this.loadBackground(0, 0, this.backgroundPathArray[Math.floor(Math.random() * 3)]);
    this.loadAllObstacles(numObs);




    this.winSong = new Audio("/music/win.mp3");
    this.songBeingPlayed = false;





  }

  draw() {

    this.background.forEach(obs => {
      this.game.context.drawImage(obs.img, obs.x, obs.y, 1500, 500); // 
    })
    this.obstacles.forEach(obs => {
      this.game.context.save();

      if (obs.state === "dark") {
        this.game.context.filter = "brightness(40%)";
      } else if (obs.state === "bright") {
        this.game.context.filter = "brightness(100%)";
        this.game.context.shadowColor = "#ffd900";
        this.game.context.shadowBlur = 20;
        this.game.context.shadowOffsetX = 0;
        this.game.context.shadowOffsetY = 0;
      }
      this.game.context.drawImage(obs.img, obs.x, obs.y, 100, 100);
      this.game.context.restore();
      // this.game.context.fillRect(obs.x + 45, obs.y + 45, 10, 10);
      // TODO: rotate images
    })

  }



  loadAllObstacles(howMany) {
    let spaceForObstacle = 1000 / (howMany + 1);

    for (let i = 1; i <= howMany; i++) {
      this.loadObstacles((spaceForObstacle * i) + 200, (Math.floor(Math.random() * 300) + 50), ("img/planet" + (Math.floor(Math.random() * 20) + 10).toString() + ".png"));



    }
  }
  loadObstacles(x, y, src) {
    let img = new Image();
    img.src = src;
    let self = this;
    img.addEventListener("load", e => {

      self.obstacles.push({
        x: x,
        y: y,
        img: img,
        oscBuffer: 10,
        state: "dark"
      });
    })


  }
  loadBackground(x, y, src) {
    let img = new Image();
    img.src = src;
    let self = this;
    img.addEventListener("load", e => {

      self.background.push({
        x: x,
        y: y,
        img: img
      });
    })


  }

  drawWin() {
    this.draw();


    this.obstacles.forEach(obs => {

      obs.y++;
    });
    //this.game.context.filter = 'hue-rotate(45deg)';
    //this.game.context.drawImage(this.winImg, 300, 300, 400, 400);
    this.game.context.fillStyle = "yellow";
    this.game.context.font = '200px Lazer';
    this.game.context.lineWidth = 8;
    this.game.context.textAlign = "center";
    this.game.context.strokeText('YOU WIN', 650, 300);
    this.game.context.fillText('YOU WIN', 650, 300);
    let straightLine = 2700;
    let time = 10;
    let score = (this.game.spaceShip.positionLog.length - straightLine + (time / this.obstacles.length)) ** (-1) // TODO IMPLEMENT STRAIGHNESS SCORE

    this.game.context.font = '50px Lazer, serif';
    this.game.context.textAlign = "center";
    this.game.context.strokeText("Score " + score, 650, 400);
    this.game.context.fillText("Score " + score, 650, 400);

    this.playSong();
    if (this.obstacles[0].y > 600) {
      this.winSong.pause();
      this.winSong.currentTime = 0;
      this.songBeingPlayed = false;
      this.game.asd();
    }


  }

  drawLose() {

    this.draw();


    this.obstacles.forEach(obs => {

      obs.y++;
    });
    //this.game.context.filter = 'hue-rotate(45deg)';
    //this.game.context.drawImage(this.winImg, 300, 300, 400, 400);
    this.game.context.fillStyle = "white";
    this.game.context.font = '200px Lazer';
    this.game.context.lineWidth = 5;
    this.game.context.textAlign = "center";
    this.game.context.strokeText('TRY AGAIN', 650, 300);
    this.game.context.fillText('TRY AGAIN', 650, 300);

    if (this.obstacles[0].y > 400) {
      this.game.asd();
    }
  }

  playSong() {
    if (!this.songBeingPlayed) {
      this.winSong.play()

      this.songBeingPlayed = true;
    }
  }




}