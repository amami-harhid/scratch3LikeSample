/**
 * Sample09
 * スプライトのクローンを作る（スプライトをクリックしたらクローンを作る）
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
        this.addSound( P.sounds.Mya, { 'volume' : 20 } );
    });
    P.cat.whenFlag( async function() {
        // ずっと繰り返す( 向きを変え続ける )
        const direction = 1;
        for(;;) {
            this.direction += direction;
        }
    });

    P.cat.whenClicked( async function() {
        P.cat.clone();
    });
    
    P.cat.whenCloned( async function() {
    
        this.scale.x = 50;
        this.scale.y = 50;
        this.effect.color = 50;
        // ずっと繰り返す
        this.setVisible(true); // <--- clone作るとき 非表示にしているので。
        for(;;) {
            this.moveSteps( 10 );
            // 端に触れたら
            if( this.isTouchingEdge()){
                // ミャーと鳴く。
                this.soundPlay()
            }
            // 端に触れたら跳ね返る
            this.ifOnEdgeBounds();
        }

    });

}