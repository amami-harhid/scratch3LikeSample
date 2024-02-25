/**
 * Sample26
 * 
 * ブロック崩し
 */
P.preload = async function() {
    this.loadImage('./assets/blueSky.svg','BlueSky');
    this.loadImage('./assets/title.svg','Title');
    this.loadImage('./assets/paddle.svg','Paddle');
    this.loadImage('./assets/button3b.svg','Button3b');
    this.loadImage('./assets/ball.svg','Ball');

    this.loadSound('./assets/boing.wav','Boing');
    this.loadSound('./assets/intro.wav','Intro');
    this.loadSound('./assets/win.wav','Win');
    this.loadSound('./assets/lose.wav','Lose');
    this.loadSound('./assets/jump.wav','Jump');
}

P.prepare = async function() {

    P.stage = new P.Stage("stage");
    P.stage.addImage( P.images.BlueSky );

    P.title = new P.Sprite("title");
    P.title.addImage(P.images.Title);

    P.paddle = new P.Sprite("paddle");
    P.paddle.addImage(P.images.Paddle);
    P.paddle.position = {x: 0, y: -140};
    P.paddle.scale = {x: 100, y: 100};

    P.button3b = new P.Sprite("button3b");
    P.button3b.addImage(P.images.Button3b);
    P.button3b.setVisible(false);
    P.button3b.position.x = 80;

    P.ball = new P.Sprite("ball");
    P.ball.addImage(P.images.Ball);
    P.ball.setVisible(false);
    P.ball.scale = {x:40, y:40};
    P.ball.position = {x:0, y:40};    

    P.monitors = new P.Monitors();
    P.monitors.add('POINT');
    P.monitors.add('TIMER');
    // 名前がJS変数として成立しないとき（ここでは途中にスペースあり), 次のようにして参照できる。
    P.monitors.v.POINT.setPosition( {x: 35, y:15} )
    // 名前がJS変数として成立するならば、日本語を使える。途中に全角スペースは使えない。
    P.monitors.v.TIMER.setPosition( {x: 35, y:45} )

    P.monitors.v.POINT.value = 0;
    P.monitors.v.TIMER.value = 0;
}

P.setting = async function() {

    P.gameOverFlag = false;

    // 100 秒経過したらゲームオーバー
    P.gameOver = function() {
        if( P.gameOverFlag === true){
            return true;
        }
        if( P.monitors.v.TIMER.value < 100 ) {
            return false;
        }
        return true;
    }

    P.stage.whenRightNow(async function() {
        this.addSound( P.sounds.Intro, { 'volume' : 20 } );
    });
    P.stage.whenFlag(async function(){
        await P.wait(2000);
        this.broadcast("GameStart");   

    });

    P.title.whenBroadcastReceived("GameStart", async function() {
        this.setVisible(false);
    });


    P.stage.whenFlag(async function() {
        // ずっと繰り返す
        for(;;) {
            await this.startSoundUntilDone();
            if(P.gameOver()){
                break;
            }
        }
    });
    P.stage.whenFlag(async function() {
        // ずっと繰り返す
        for(;;) {
            await P.wait(1000);
            P.monitors.v.TIMER.value += 1;
            if(P.gameOver()){
                break;
            }
        }
    });
    P.button3b.whenFlag(function(){        
        this.scale = {x:40, y:40};
        this.effect.color = 0;
    })
    P.paddle.whenFlag(async function(){
        this.setVisible(false);
    });
    P.paddle.whenBroadcastReceived("GameStart", async function(){
        this.setVisible(true);
        for(;;){
            // 右矢印キーがおされたとき
            if(P.getKeyIsDown('RightArrow')){
                this.changeX(15)
            }
            // 左矢印キーがおされたとき
            if(P.getKeyIsDown('LeftArrow')){
                this.changeX(-15)
            }
            this.ifOnEdgeBounds();
            let touching = this.getTouchingTarget([P.ball]);
            if( touching.length>0) {
                this.broadcast("PaddleTouch");
            }
            if(P.gameOver()){
                break;
            }
        }        
    
    });

    P.button3b.whenBroadcastReceived("GameStart", async function(){
        this.position.y = 105;
        let color = 0
        this._effect.color = 0
//        console.log('this._effect', this._effect);
        for(let idx in Array(4).fill()){
            this.position.x = -225;
            for(let idx2 in Array(12).fill()){
                this.clone({effect: {"color" : color}}  );
//                this.setEffectsEachProperties({"color" : color});
                this.changeX(39)
            }
            this.changeY(25)
            color += 37.5
//            console.log('this.effect.color(1)',this.effect.color)
//            this.effect.color += 37.5;
//            console.log('this.effect.color(2)',this.effect.color)
        }
        this.broadcast("ButtonSetComplete");   

    });
    P.button3b.whenCloned(async function(){
//        console.log('this._effect', this._effect);
        this.setVisible(true);
        for(;;) {
            let touching = this.getTouchingTarget([P.ball]);
            if( touching.length>0) {
                this.broadcast("ButtonTouch");
                this.remove();
                break;
            }
            if(P.gameOver()){
                break;
            }

        }
    });

    P.ball.whenRightNow(function(){
        this.addSound( P.sounds.Win, { 'volume' : 100 } );
        this.addSound( P.sounds.Lose, { 'volume' : 100 } );
        this.addSound( P.sounds.Jump, { 'volume' : 20 } );

    });

    P.ball.whenBroadcastReceived("PaddleTouch", async function(){
        this.soundPlay(P.sounds.Jump);
//        this.soundSwitch(P.sounds.Jump)
//        this.sounds.play();
        this.changeY(15)
//        let _direction = P.direction(this.direction);
        let _direction = this.direction;
        if( _direction > 0 ) {
            // 20 ～ 70
            this.pointInDerection( P.random(20,70) )
        }else{
            // -70 ～ -20
            this.pointInDerection( P.random(-70,-20) )
        }

    });
    P.ball.whenBroadcastReceived("ButtonTouch", async function(){
        this.soundPlay(P.sounds.Jump);
        P.monitors.v.POINT.value += 1;
//        this.changeY(15)
//        console.log('this.direction=',this.direction)
//        let _direction = P.direction(this.direction);
        let _direction = this.direction;
        if( _direction > 0 ) {
            this.pointInDerection( 180 - _direction )
        }else{
            this.pointInDerection( -(180 + _direction) )
        }

    });
    P.ball.whenBroadcastReceived("ButtonSetComplete", async function(){
        this.setVisible(true)
        
        this.pointToTarget(P.paddle);

        for(;;) {
            this.moveSteps(10);
            this.ifOnEdgeBounds();
            if(this.position.y < -165) {
                this.soundSwitch(P.sounds.Lose.name);
                await this.startSoundUntilDone();
                this.broadcast("GameOver");                
                break;
            }
        }
    });
    P.stage.whenBroadcastReceived("GameOver", async function(){
        P.gameOverFlag = true;
    });

    P.random = function(start, last) {
        return start + Math.random() * (last-start);
    }
    P.direction = function(direction) {
        let _direction = direction % 360;
        if( _direction > 0 ) {
            if( _direction > 180 ) {
                return _direction - 360;
            }else{
                return _direction;
            }
        }else{
            if( _direction < -180 ) {
                return _direction + 360;
            }else{
                return _direction;
            }

        }

    }
}
