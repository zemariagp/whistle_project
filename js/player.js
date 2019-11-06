class Player {
  constructor(game) {
    this.game = game;
    this.position = {
      x: 0,
      y: 300
    };
    this.size = {
      x: 100,
      y: 80
    };
    this.ACCELERATION = 1;
    this.velocityY = 1;
    this.positionLog = [{
      x: 0,
      y: 0
    }]



    this.playerImg = new Image();
    this.playerImg.src = "img/ship_transparent.png";
    // this.loadPlayerImage("img/ship_transparent.png");
  }

  normalizePitch(pitch) {
    if (pitch > 932 && pitch < 2500) {
      let normalized = Math.min(Math.max((pitch - 932) / (2500 - 932), 0), 1);
      return normalized;
    } else {
      return -1;
    }
  }

  move() {

    if (this.normalizePitch(this.game.pitch) !== -1) {


      const height = this.game.context.canvas.height;

      const pitch = this.normalizePitch(this.game.pitch);


      const absolutePitch = pitch * height;



      if (this.position.y < absolutePitch) {
        let delta = absolutePitch - this.position.y;

        this.position.y += Math.floor(delta * 0.4);
        this.position.x += 4;
        // this.velocityY += this.ACCELERATION;

      } else if (this.position.y > absolutePitch) {
        let delta = this.position.y - absolutePitch;

        this.position.y -= Math.floor(delta * 0.4);
        this.position.x += 4;
        // this.velocityY -= this.ACCELERATION;

      }
      let newPosition = {
        x: this.position.x,
        y: this.position.y
      };
      this.positionLog.push(newPosition);

    }



  }

  draw() {
    const height = this.game.context.canvas.height;
    this.game.context.drawImage(this.playerImg, this.position.x, height - this.position.y, this.size.x, this.size.y);
  }

  loadPlayerImage(src) {
    let img = new Image();
    img.src = src;
    let self = this;
    img.addEventListener("load", e => {

      self.playerImg = img;
    });
  }


}