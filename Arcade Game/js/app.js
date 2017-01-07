// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    //TO generate random speed of enemies
    this.speed = Math.random() * 100 + 50;

}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //Provides Movement for enemies
    this.x = this.x + dt * this.speed
    //Prevents enemies from going offscreen
    if (this.x > 503) {
        this.x = 0;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';

    //Alerts player when they reach the water
    Player.prototype.update = function(dt) {
        if (this.y < 11) {
            alert("YOU WIN!");
            this.reset();
        }
        //Calls collsion function
        this.collision();
    };
    //Starting Position for the player and resets game
    Player.prototype.reset = function() {
        this.x = 200;
        this.y = 400;
    };

    //Collision function, compares x and y of enemy and player to determne a collision.
    Player.prototype.collision = function() {
        for (var i = 0; i < allEnemies.length; i++) {
            if (!(allEnemies[i].y + 50 < this.y ||
                    allEnemies[i].y > this.y + 50 ||
                    allEnemies[i].x + 50 < this.x ||
                    allEnemies[i].x > this.x + 50)) {
                alert("Collision!")
                //Resets game after collision
                this.reset();
            }
        }
    }

    Player.prototype.render = function(dt) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    //Controls player movement and distance with allowedKeys
    Player.prototype.handleInput = function(allowedKeys) {
        switch (allowedKeys) {
            case "left":
                if (this.x > 10) {
                    this.x -= 50;
                }
                break;
            case "right":
                if (this.x < 390) {
                    this.x += 50;
                }
                break;
            case "up":
                if (this.y >= 10) {
                    this.y -= 50;
                }
                break;
            case "down":
                if (this.y < 400) {
                    this.y += 50;
                }
                break;
        }
    };
};




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0, 100);
var enemy2 = new Enemy(0, 200);
var enemy3 = new Enemy(0, 300);

var player = new Player(200, 400);

var allEnemies = [enemy1, enemy2, enemy3];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
