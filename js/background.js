class Background {
  constructor(game, level) {
    this.game = game;
    this.level = level;

    this.obstacles = [];
    this.background = [];

    this.backgroundPathArray = ["img/nebula03.png", "img/nebula06.png", "img/nebula07.png"];
    this.loadBackground(0, 0, this.backgroundPathArray[Math.floor(Math.random() * 3)]);
    this.loadAllObstacles(Math.floor(Math.random() * 6) + 1);

    this.winImg = new Image();
    this.winImg.src = "img/winwin.png";
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
        this.game.context.filter = "brightness(30%)";
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

      obs.x--;
    });
    //this.game.context.filter = 'hue-rotate(45deg)';
    //this.game.context.drawImage(this.winImg, 300, 300, 400, 400);
    this.game.context.fillStyle = "yellow";
    this.game.context.font = '200px Lazer';
    this.game.context.lineWidth = 8;

    this.game.context.fillText('YOU WIN', 200, 300);
    this.game.context.strokeText('YOU WIN', 200, 300);
    this.playSong();

  }

  drawLose() {

    this.draw();
    

    this.obstacles.forEach(obs => {

      obs.x++;
    });
    //this.game.context.filter = 'hue-rotate(45deg)';
    //this.game.context.drawImage(this.winImg, 300, 300, 400, 400);
    this.game.context.fillStyle = "gray";
    this.game.context.font = '200px Lazer';
    this.game.context.lineWidth = 8;

    this.game.context.strokeText('TRY AGAIN', 0, 0);
    this.game.context.fillText('TRY AGAIN', 0, 0);
    //this.playSong();

  }

  playSong() {
    if (!this.songBeingPlayed) {
      this.winSong.play()
      
      this.songBeingPlayed = true;
    }
  }

}