/**
 * GITHUB 
 */
const HOST = 'https://amami-harhid.github.io/scratch3LikeJsTrial/web';

/**
 * Sample02
 * 画像をロードして フラグクリック時に ステージに表示する
 */
P.preload = async function() {
    this.loadImage(`${HOST}/assets/Jurassic.svg`,'Jurassic');
}

P.prepare = async function() {
    P.stage = new P.Stage();
}

P.setting = async function() {
    // フラグクリック時のステージの動作
    // ↓ stage の whenFlag() を定義する
    P.stage.whenFlag(function() {
        // フラグが押されたときにイメージを追加する
        // ⇒ フラグが押された後に背景を表示する
        this.addImage( P.images.Jurassic );
    });
}