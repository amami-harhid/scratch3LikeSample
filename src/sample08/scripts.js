/**
 * Sample08
 * スプライトを 動かす( 端に触れたら ミャーと鳴く)
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
        this.addSound( P.sounds.Mya, { 'volume' : 100 } );
    });

    P.cat.whenFlag( async function() {
        this.direction = (Math.random()-0.5) * 180;
    });
    
    P.cat.whenFlag( async function() {
        // 「終わるまで音を鳴らす」をずっと繰り返す
        this.startThread( async function() {
            for(;;) {
                this.moveSteps( 10 );
                // 端に触れたら
                if( this.isTouchingEdge()){
                    // ミャーと鳴く。
                    this.soundPlay()
                };
                this.ifOnEdgeBounds();
            }
        });

    });
}