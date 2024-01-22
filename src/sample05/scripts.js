/**
 * Sample05
 * ステージをクリック（タッチ）したときに音を鳴らす（ずっと繰り返し）
 * 再度クリックしたときに音を止める。
 * 自前でクリック制御をしないといけない。
 * クリック制御に使う変数のスコープに留意すること！。
 */
P.preload = async function() {
    this.loadImage(`${HOST}/assets/Jurassic.svg`,'Jurassic');
    this.loadSound(`${HOST}/assets/Chill.wav`,'Chill');
}


P.prepare = async function() {
    P.stage = new P.Stage("stage");
    P.stage.addImage( P.images.Jurassic );
}

// グローバル変数として定義
let stopFlag = true;

P.setting = async function() {

    P.stage.whenFlag(async function() {
        // 音を登録する
        this.addSound( P.sounds.Chill, { 'volume' : 100 } );
    });

    // ステージをクリックしたときの動作
    P.stage.whenClicked(async function () {

        // ↓ グローバルスコープにて定義している変数
        if( stopFlag == true) {
            stopFlag = false;
            for(;;) {
                await this.startSoundUntilDone();
                if( stopFlag == true) {
                    break;
                }
            }
        } else {
            stopFlag = true;
            this.soundStop(); // 鳴っている音を止める。
        }
    })

}