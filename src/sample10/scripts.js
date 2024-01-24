/**
 * Sample10
 * スプライトのクローンを作る（スプライトに触ったらクローンを作る）
 * クローンされたら動きだす（端に触れたらミャーとないて折り返す）
 */
P.preload = async function() {
    this.loadImage(`${HOST}/assets/Jurassic.svg`,'Jurassic');
    this.loadSound(`${HOST}/assets/Chill.wav`,'Chill');
    this.loadImage(`${HOST}/assets/cat.svg`,'Cat');
    this.loadSound(`${HOST}/assets/Cat.wav`,'Mya');
}

P.prepare = async function() {
    P.stage = new P.Stage("stage");
    P.stage.addImage( P.images.Jurassic );

    P.cat = new P.Sprite("Cat");
    P.cat.position.x = 200;
    P.cat.position.y = 150;
    P.cat.addImage( P.images.Cat );
}

P.setting = async function() {

    P.stage.whenRightNow(async function() {
        this.addSound( P.sounds.Chill, { 'volume' : 50 } );
    });
    P.stage.whenFlag(async function() {
        for(;;) {
            await this.startSoundUntilDone();
        }
    });
    P.cat.whenRightNow( async function() {
        // 音を登録する
        this.addSound( P.sounds.Mya, { 'volume' : 5 } );
    });
    P.cat.whenFlag( async function() {
        // ずっと繰り返す
        for(;;) {
            this.direction += 1;
        }    
    });
    P.cat.whenFlag( async function() {
        // ずっと繰り返す
        for(;;) {
            if( this.isMouseTouching() ) {
                this.clone();
            }
            // マウスタッチしないまで待つ
            await P.Utils.waitUntil( this.isNotMouseTouching, P.Env.pace,  this ); 
        }
    });
    P.cat.whenCloned(async function(){
        // 'this' is cloned instance;
        this.position.x = 100;
        this.position.y = -100;
        this.scale.x = 50;
        this.scale.y = 50;
        this.effect.color = 50;
        this.setVisible(true); // <--- clone作るとき 非表示にしているので。
    });
    P.cat.whenCloned(async function(){
        this.life = 1000; // <--- およそ1000msecでクローン自動死亡する 
    });

    P.cat.whenCloned(async function(){
        // ずっと繰り返す
        for(;;) {
            this.moveSteps( 10 );
            // 端に触れたら
            this.isTouchingEdge(function(){
                // ミャーと鳴く。
                this.soundPlay()
            });
            this.ifOnEdgeBounds();
        }
    });

}