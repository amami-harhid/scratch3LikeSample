/**
 * Sample15
 * スプライト（CAT) は端を越えて進めない。
 * 
 */
P.preload = async function() {
    this.loadImage(`${HOST}/assets/Jurassic.svg`,'Jurassic');
    this.loadSound(`${HOST}/assets/Chill.wav`,'Chill');
    this.loadImage(`${HOST}/assets/cat.svg`,'Cat');
}

P.prepare = async function() {
    P.stage = new P.Stage("stage");
    P.stage.addImage( P.images.Jurassic );

    P.cat = new P.Sprite("Cat");
    P.cat.addImage( P.images.Cat );
    P.cat.direction = 90; // 向きの初期値。
}

// ネコの進む速さ
let steps = 10;

P.setting = async function() {
    
    P.stage.whenRightNow(async function() {
        this.addSound( P.sounds.Chill, { 'volume' : 20 } );
    });
    
    P.stage.whenFlag(async function() {
        for(;;) {
            await this.startSoundUntilDone();
        }
    });
    
    P.cat.whenFlag( async function() {
        // ずっと繰り返す
        for(;;) {
            this.moveSteps(steps);
        }    
    });

    // ネコをクリックしたら、向きが 90度⇒-90度 と反転する。
    P.cat.whenClicked( async function() {
        this.direction *= -1; // マイナス反転
        this.direction += 5; // 少しだけ向きを変える
        //↑ これをすると 端のところで上へ移動していく。
        //この動きは Scratch3 と同じである。
    });
}