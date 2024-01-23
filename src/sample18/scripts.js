/**
 * Sample18
 * 
 * キーボード操作
 * 左矢印、右矢印で、シップが左右に動く。
 * スペースキーで 弾を発射（発射する弾はクローン）
 * 
 */
P.preload = async function() {
    this.loadImage(`${HOST}/assets/Jurassic.svg`,'Jurassic');
    this.loadSound(`${HOST}/assets/Chill.wav`,'Chill');
    this.loadImage(`${HOST}/assets/cross1.svg`,'Cross01');
    this.loadImage(`${HOST}/assets/cross2.svg`,'Cross02');
    this.loadSound(`${HOST}/assets/Pew.wav`,'Pew');
}

P.prepare = async function() {

    P.stage = new P.Stage("stage");
    P.stage.addImage( P.images.Jurassic );

    P.cross = new P.Sprite("Cross");
    P.cross.position.y = -P.stageHeight/2 * 0.6 
    P.cross.addImage( P.images.Cross01 );
    P.cross.addImage( P.images.Cross02 ); // 2番目のコスチューム
    P.cross.setScale(100,100);

}

P.setting = async function() {
    P.stage.whenFlag(async function() {
        this.addSound( P.sounds.Chill, { 'volume' : 20 } );
    });
    P.cross.whenFlag(async function() {
        this.addSound( P.sounds.Pew, { 'volume' : 100 } );
    });
    P.stage.whenFlag(async function() {
        // ずっと繰り返す
        for(;;) {
            await this.startSoundUntilDone();
        }
    });
    P.cross.whenFlag( async function() {
        this.direction = 90;
    });
    P.cross.whenFlag( async function() {
        // ずっと繰り返す
        for(;;) {
            // 右矢印キーがおされたとき
            if(P.getKeyIsDown('RightArrow')){
                this.moveSteps(15);
            }
            // 左矢印キーがおされたとき
            if(P.getKeyIsDown('LeftArrow')){
                this.moveSteps(-15);
            }
        }    
    });
    P.cross.whenFlag( async function() {
        // ずっと繰り返す
        for(;;) {
            // スペースキーが押されたとき
            // （他のキーが押されていてもOK）
            if(P.getKeyIsDown('Space')){
                this.soundPlay();
                const options = {scale:{x:20,y:20},direction:0}
                this.clone(options);
                //次をコメントアウトしているときは キー押下中連続してクローン作る  
                //await P.waitUntil( P.keyboard.isKeyNotPressed.bind(P.keyboard) );
            }
        }    
    });
    // クローンされたときの動作  
    P.cross.whenCloned(function(){
        const c = this; // <--- cross instance;
        const bounds = c.render.renderer.getBounds(c.drawableID);
        const height = Math.abs(bounds.top - bounds.bottom);
        c.position.y += height / 2;
        c.nextCostume();
        c.setVisible(true);
    });
    // クローンされたときの動作  
    P.cross.whenCloned(function(){
        const c = this; // <--- cross instance;
        for(;;) {
            const x = this.position.x;
            const y = this.position.y;
            this.setXY(x,y+15);
            if(this.isTouchingEdge()){
                break;
            }
        }
        this.remove();
    });
    // クローンされたときの動作  
    P.cross.whenCloned(function(){
        const c = this; // <--- cross instance;
        for(;;) {
            this.turnRight(15);
            if(this.isTouchingEdge()){
                break;
            }
        }
        this.remove();
    });
}
