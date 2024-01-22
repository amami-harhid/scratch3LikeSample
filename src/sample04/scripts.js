/**
 * Sample04
 * ステージをクリック（タッチ）したときに音を鳴らす（ずっと繰り返し）
 */
P.preload = async function() {
    this.loadImage(`${HOST}/assets/Jurassic.svg`,'Jurassic');
    this.loadSound(`${HOST}/assets/Chill.wav`,'Chill');
}


P.prepare = async function() {
    P.stage = new P.Stage("stage");
    P.stage.addImage( P.images.Jurassic );
}

P.setting = async function() {

    P.stage.whenFlag(async function() {
        // 音を登録する
        this.addSound( P.sounds.Chill, { 'volume' : 100 } );
    });

    // ステージをクリックしたときの動作
    // ２回クリックすると 二重に動作するので注意！
    P.stage.whenClicked(async function () {
        // 「終わるまで音を鳴らす」をずっと繰り返す、スレッドを起動する
        for(;;) {
            // 非同期処理に awaitをつけると、処理が終わるまで待つことができる
            await this.startSoundUntilDone();
        }
    });

}
  