const game = {
  color: {
    red: 0,
    green: 0,
    blue: 0
  },
  variation: {
    red: 0,
    green: 0,
    blue: 0
  },
  right: 0,
  total: 0,
  possibilities: [ 
    [0,0,16], [0,16,0], [0,16,16], [16,0,0], [16,0,16], [16,16,0], [16,16,16],
    [0,0,-16], [0,-16,0], [0,-16,-16], [-16,0,0], [-16,0,-16], [-16,-16,0], [-16,-16,-16],
    [0,16,-16], [0,-16,16], [16,0,-16], [-16,0,16], [16,-16,0], [-16,16,0],
    [16,16,-16], [16,-16,16], [16,-16,-16], [-16,16,16], [-16,16,-16], [-16,-16,16]
  ],
  min: 50,
  correct: 0,
  initialize: function() {
    // associate the event handlers to the buttons
    const boxes = document.querySelectorAll(".boxes.mini .color-box");
    for (let x = 0; x < boxes.length; x++) {
      boxes[x].addEventListener("click", function() {
        if (this.dataset.value == game.correct) {
          document.querySelector("#scrim").classList.add("correct");
          this.classList.add("right");
          game.right++;
        } else {
          document.querySelector("#scrim").classList.add("incorrect");
          this.classList.add("wrong");
          document.querySelector(`[data-value='${game.correct}']`).classList.add("right");
        }
        
        game.total++;
        document.querySelector("#total").textContent = game.total;
        document.querySelector("#guessed").textContent = game.right;
        
        document.querySelector("#correct-color").style.backgroundColor = document.querySelector(`[data-value='${game.correct}']`).style.backgroundColor;
    document.querySelector("#picked-color").style.backgroundColor = this.style.backgroundColor;
      });
    }
    
    // associate event to the button
    document.querySelector("#scrim button").addEventListener("click", function() {
      const scrim = document.querySelector("#scrim");
      scrim.classList.remove("correct");
      scrim.classList.remove("incorrect");
      game.generateGame();
    });

    // generate a new round
    this.generateGame();
  },
  generateGame: function() {
    // remove rights and wrongs
    var dright = document.querySelector(".right");
    if (dright) dright.classList.remove("right");
    var dwrong = document.querySelector(".wrong");
    if (dwrong) dwrong.classList.remove("wrong");
    
    document.querySelector("#correct-color").style.backgroundColor = "rgba(0,0,0,0)";
    document.querySelector("#picked-color").style.backgroundColor = "rgba(0,0,0,0)";
    
    // generate the sequence
    this.color.red   = this.min + Math.floor(Math.random() * (255 - this.min * 2));
    this.color.green = this.min + Math.floor(Math.random() * (255 - this.min * 2));
    this.color.blue  = this.min + Math.floor(Math.random() * (255 - this.min * 2));
    this.variation.red   = Math.floor((Math.random() * this.min) / 2);
    this.variation.green = Math.floor((Math.random() * this.min) / 2);
    this.variation.blue  = Math.floor((Math.random() * this.min) / 2);
    document.querySelector("#box-1").style.backgroundColor = `rgb(${this.color.red},${this.color.green},${this.color.blue})`;
    document.querySelector("#box-2").style.backgroundColor = `rgb(${this.color.red+this.variation.red},${this.color.green+this.variation.green},${this.color.blue+this.variation.blue})`;
    
    // set up the correct one
    this.correct = Math.floor(Math.random()*4);
    document.querySelector("#color-" + this.correct).style.backgroundColor = `rgb(${this.color.red+this.variation.red*2},${this.color.green+this.variation.green*2},${this.color.blue+this.variation.blue*2})`;
    
    // generate the incorrect colors
    for (let x = 0; x < 4; x++) {
      if (x != this.correct) {
        var change = Math.floor(Math.random() * this.possibilities.length);
        document.querySelector("#color-" + x).style.backgroundColor = `rgb(${this.color.red+this.variation.red+this.possibilities[change][0]},${this.color.green+this.variation.green+this.possibilities[change][1]},${this.color.blue+this.variation.blue+this.possibilities[change][2]})`;
      }
    }
  }
}

game.initialize()