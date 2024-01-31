/**
 * Sample24
 * 
 * 弾発射数をモニター表示
 * 左矢印、右矢印で、シップが左右に動き、スペースキーで 弾を発射（発射する弾はクローン）
 * 発射した数をモニター表示する。
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

    P.monitors = new P.Monitors();
    P.monitors.add('発射数');
    P.monitors.add('位置');
    // 名前がJS変数として成立しないとき（ここでは途中にスペースあり), 次のようにして参照できる。
    P.monitors.v.発射数.setPosition( {x: 35, y:15} )
    // 名前がJS変数として成立するならば、日本語を使える。途中に全角スペースは使えない。
    P.monitors.v.位置.setPosition( {x: 35, y:45} )

    P.monitors.v.発射数.value = 0;
    P.monitors.v.位置.value = `${P.cross.position.x},${P.cross.position.y}`;
//    P.monitors.automatic();


}

P.setting = async function() {

    P.stage.whenRightNow(async function() {
        this.addSound( P.sounds.Chill, { 'volume' : 20 } );
    });
    P.cross.whenRightNow(async function() {
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
            P.monitors.v.位置.value = `${this.position.x},${this.position.y}`;
        }    
    });
    P.cross.whenFlag( async function() {
        // ずっと繰り返す
        for(;;) {
            // スペースキーが押されたとき
            // （他のキーが押されていてもOK）
            if(P.getKeyIsDown('Space')){
                this.soundPlay();
                this.clone();
                //次をコメントアウトしているときは キー押下中連続してクローン作る  
                //await P.waitUntil( P.keyboard.isKeyNotPressed.bind(P.keyboard) );
            }
        }    
    });
    // クローンされたときの動作  （モニター表示）
    P.cross.whenCloned(function(){
        // 発射数をインクリメントする
        
        P.monitors.v.発射数.value += 1;

        const c = this; // <--- cross instance;
        const bounds = this.render.renderer.getBounds(c.drawableID);
        const height = Math.abs(bounds.top - bounds.bottom);
        this.position.y += height / 2;
    });
    // クローンされたときの動作  
    P.cross.whenCloned(function(){
        this.scale = {x:20, y:20};
        this.direction = 0;
        this.nextCostume();
        this.setVisible(true);
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
