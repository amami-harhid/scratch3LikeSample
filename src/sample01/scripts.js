/**
 * Sample01
 * 画像をロードして ステージに表示する
 */
P.preload = async function() {
    this.loadImage(`${HOST}/assets/Jurassic.svg`,'Jurassic');
    // ↑ 
    // 第二パラメータは名前である。
    // 名前は Javascript の変数名 として使える文字列でないといけない。
    // P.images へ Jurassic の名前で 画像データを作り出す
    // P.images.Jurassic として参照できる。
    
}

P.prepare = async function() {
    P.stage = new P.Stage();
    P.stage.addImage( P.images.Jurassic );
}