/**
 * Sample22
 * 
 * Scratch3 スピーチの実験
 * 
 * broadcastAndWait()にてお話の終わりを検知させて、連続して音声を出さないように
 * しています。
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
    P.cat = new P.Sprite("Cat", {scale: {x:250,y:250}});
    P.cat.addImage( P.images.Cat );
    P.cat.position.x = -100;
}
P.setting = function() {

    P.stage.whenRightNow(function(){
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
        const words = `なになに？どうしたの？`;
        const properties = {'pitch': 2, 'volume': 100}
        // ずっと繰り返す
        for(;;) {
            // マウスに触ったとき
            if( this.isMouseTouching() ) {
                // メッセージ(SPEECH)を送って待つ
                await this.broadcastAndWait('SPEECH', words, properties, 'male');
                
                // 「送って待つ」を使うことで スピーチが終わるまで次のループに進まないため、
                // 以下の「マウスタッチしない迄待つ」のコードが不要である。
                //await P.Utils.waitUntil( this.isNotMouseTouching, P.Env.pace,  this ); 

            }
        }
    });
    
    // ネコをクリックしたらスピーチする
    P.cat.whenClicked(function(){
        const words = `そこそこ。そこがかゆいの。`;
        const properties = {'pitch': 1.7, 'volume': 500}
        this.broadcast('SPEECH', words, properties, 'female')
    });

    // メッセージ(SPEECH)を受け取ったら スピーチをする
    P.cat.whenBroadcastReceived('SPEECH', async function(words, properties, gender='male', locale='ja-JP') {

        await this.speechAndWait(words, properties, gender, locale);

    });

}
