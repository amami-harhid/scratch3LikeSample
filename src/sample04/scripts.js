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

    P.stage.whenRightNow(async function() {
        // 音を登録する
        this.addSound( P.sounds.Chill, { 'volume' : 100 } );
    });

    // ステージをクリックしたときの動作
    // ずっと繰り返しの途中で 再度クリックすると 実行中スレッドを停止させ あたらしいスレッドを開始する
    // これは Scratch3 と同じ動作である。
    P.stage.whenClicked(async function () {
        // 「終わるまで音を鳴らす」をずっと繰り返す
        for(;;) {
            // 非同期処理に awaitをつけると、処理が終わるまで待つことができる
            await this.startSoundUntilDone();
        }
    });

}
  