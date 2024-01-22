/**
 * TEST SPEECH
 * 
 * Scratch3 スピーチの実験
 * 
 * 実験では、お話しを broadcast を経由していますが、broadcastAndWait() ではお話しが終わったことがわからないです
 * --> broadcastAndWait()にてお話の終わりを検知できるようにしました！！やったね。
 * 
 * Scratch3のスピーチは 次の仕組みです
 * 
 * https://github.com/scratchfoundation/scratch-vm/blob/develop/src/extensions/scratch3_text2speech/index.js#L742
 *
 * (1) URL を組み立てる
 * (2) fetchして音をGETする
 * (3) 音を soundPlayer に食わせて
 * (4) ピッチや音量を与えて 再生する
 * (5) soundPlayer.play() の中で stop を EMIT している。それを受けて SoundPlayerをdeleteしている。
 * 
 * ■ ja-JP, male, あいうえお 
 * https://synthesis-service.scratch.mit.edu/synth?locale=ja-JP&gender=male&text=%E3%81%82%E3%81%84%E3%81%86%E3%81%88%E3%81%8A
 * 
 */
P.preload = async function() {
    this.loadImage(`${HOST}/assets/backdrop.png`,'BackDrop');
    this.loadImage(`${HOST}/assets/cat.svg`,'Cat');
    this.loadSound(`${HOST}/assets/Chill.wav`,'Chill');
}
P.prepare = function() {
    P.stage = new P.Stage("stage");
    P.stage.addImage( P.images.BackDrop );
    P.cat = new P.Sprite("Cat");
    P.cat.addImage( P.images.Cat );
    P.cat.position.x = -100;
}
P.setting = function() {

    P.stage.whenFlag(function(){
        this.addSound( P.sounds.Chill, { 'volume' : 20 } );
    })
    P.stage.whenFlag(async function() {
        // ずっと繰り返す
        for(;;) {
            await this.startSoundUntilDone();
        }
    });

    // ネコにさわったらスピーチする
    P.cat.whenFlag( async function(){
        this.__waitTouching = false;
        const words = `おっと`;
        const properties = {'pitch': 2, 'volume': 100}
        // ずっと繰り返す
        for(;;) {
            // マウスに触ったとき
            if( this.isMouseTouching() ) {
                // メッセージ(SPEECH)を送って待つ
                this.broadcastAndWait('SPEAK', words, properties, 'male');
                
                // 「送って待つ」ではないので次のループに進ませないように、
                // 「マウスタッチしない迄待つ」をする。
                await P.Utils.waitUntil( this.isNotMouseTouching, P.Env.pace,  this ); 

            }
        }
    });
    
    // ネコをクリックしたらスピーチする
    P.cat.whenClicked(function(){
        const words = `そこそこ`;
        const properties = {'pitch': 1.7, 'volume': 500}
        this.broadcast('SPEAK', words, properties, 'female')
    });

    // メッセージ(SPEECH)を受け取ったら スピーチをする
    P.cat.whenBroadcastReceived('SPEAK', async function(words, properties, gender='male', locale='ja-JP') {

        this.speech(words, properties);

    });

}
