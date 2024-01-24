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

    P.stage.whenRightNow(async function() {
        // 音を登録する
        this.addSound( P.sounds.Chill, { 'volume' : 100 } );
    });

    // ステージをクリックしたときの動作
    // ずっと繰り返しの途中で 再度クリックすると 実行中スレッドを停止させ あたらしいスレッドを開始する
    // スレッドを停止したとしても再生中の音は止まらないことを実証するためのコードを書く。
    // 再度クリックで 音の再生を始めないときは、再生中の音は終わるまでなり続ける。(実証のためには ★の行をコメントアウトしてください)
    // 再度クリックで 音の再生を始めるときは 再生中の音は中断されて新しく音が鳴り始める。
    // この動作は Scratch3 と同じである。
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
            // 音が鳴っている最中に音を止める。--> 音が止まる。
            //this.soundStop();  // ( ★ )
        }
    })

}