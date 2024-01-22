/**
 * Sample14
 * スプライト（CAT) ポインターを追いかける
 * ステージの外に出てもマウスを追いかける（ウィンドウの外は監視できない）
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
    P.cat.position.x = 0;
    P.cat.position.y = 0;
    P.cat.addImage( P.images.Cat );
}

P.setting = async function() {
    P.stage.whenFlag(async function() {
        this.addSound( P.sounds.Chill, { 'volume' : 50 } );
    });
    P.stage.whenFlag(async function() {
        for(;;) {
            await this.startSoundUntilDone();
        }
    });
    P.cat.whenFlag( async function() {
        // 1秒まつ
        await P.wait(1000);
        // ずっと繰り返す
        for(;;) {
            // ステージの外のマウスポインターを含む。引数がないときは ステージの外のマウスポインターの動きは無視される。
            this.pointToMouse( P.Sprite.Global );
            this.moveSteps(10);
        }    
});
}