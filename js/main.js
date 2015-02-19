window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        // Load an image and call it 'logo'.
       game.load.image('ground', 'assets/platform.png');
       game.load.image('background', 'assets/background.png');
       game.load.image('p1','assets/p1.png');
       game.load.image('p2','assets/p2.png');
       game.load.image('p3','assets/p3.png');
       game.load.audio('smash','assets/smash.mp3');
       game.load.spritesheet('player','assets/Victim.png',38,61);
       game.load.image('end','assets/end.png');
       game.load.audio('music','assets/SuperSmashMouthBros-Final.mp3');
    }
    
    var player;
    var p1;
    var p2;
    var p3;
    var initiate1 = 1;
    var initiate2 = 1;
    var initiate3 = 1;
    var platforms;
    var background;
    var cursors;
    var one;
    var two;
    var three;
    var lock = 1;
    var end;
    var effect;
    var music;
    
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        music = game.add.audio('music');
    	music.play();
        effect = game.add.audio('smash',1,true);
        game.add.sprite(0,0,'background');
      	game.physics.startSystem(Phaser.Physics.ARCADE);
     	platforms = game.add.group();
     	platforms.enableBody = true;
     	var ground = platforms.create(0, game.world.height - 64, 'ground');
     	ground.scale.setTo(2,2);
     	ground.body.immovable = true;
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        player = game.add.sprite(30, game.world.height - 94, 'player' );
        player.anchor.setTo( 0.5, 0.5 );
        p1 = game.add.sprite(0,0,'p1');
        p2 = game.add.sprite(267,0,'p2');
        p3 = game.add.sprite(534,0,'p3');
        
        
        // Turn on the arcade physics engine for this sprite.
      	 game.physics.enable( player, Phaser.Physics.ARCADE );
      	 game.physics.enable( p1, Phaser.Physics.ARCADE );
      	 game.physics.enable( p2, Phaser.Physics.ARCADE );
      	 game.physics.enable( p3, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        player.body.collideWorldBounds = true;
        p1.body.collideWorldBounds = true;
        p2.body.collideWorldBounds = true;
        p3.body.collideWorldBounds = true;
       
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var text2 = game.add.text(300,20,'Who to trust?', { fontSize: '16px', fill: '#000'});
        var text = game.add.text(400, game.world.height - 40, 'Please read directions before playing', { fontSize: '8px', fill: '#000' });
        text.anchor.setTo( 0.5, 0.0 );
        
        cursors = game.input.keyboard.createCursorKeys();
        player.animations.add('panic',[1,2,3],5,true);
        one = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        two = game.input.keyboard.addKey(Phaser.Keyboard.W);
        three = game.input.keyboard.addKey(Phaser.Keyboard.E);
        
        game.time.events.add(Phaser.Timer.SECOND * 10, choice, this);
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        game.physics.arcade.overlap(player, p1, death, null, this);
      	game.physics.arcade.overlap(player, p2, death, null, this);
     	game.physics.arcade.overlap(player, p3,death,null,this);
        game.physics.arcade.collide(player,platforms);
        game.physics.arcade.collide(p1,platforms);
        game.physics.arcade.collide(p2,platforms);
        game.physics.arcade.collide(p3,platforms);
        player.body.velocity.x = 0;
        player.animations.play('panic');
        if (cursors.left.isDown && lock != 2)
    	{
        //  Move to the left
        player.body.velocity.x = -300;
 
        
   		}
   		 else if (cursors.right.isDown && lock != 2)
    	{
    	    //  Move to the right
    	    player.body.velocity.x = 300;
 
        }
        if(one.isDown && initiate1 === 2)
        {
        p1.body.velocity.y = 950;
        }
        if(two.isDown && initiate2 === 2)
        {
        p2.body.velocity.y = 950;
        }
        if(three.isDown && initiate3 === 2)
        {
        p3.body.velocity.y = 950;
        }
        //end of update function
    }
    function choice()
    {
    initiate1 = 2;
    initiate2 = 2;
    initiate3 = 2;
    lock = 2;
    }
    function render() 
    {
	game.debug.text("Time until choice: " + game.time.events.duration, 270, 60);

	}
	function death()
	{
	
	player.kill();
	effect.play('',0,1,false);
	game.add.sprite(0,0,'end');
	}
	//end of everything
};
