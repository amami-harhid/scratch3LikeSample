/**
 * Sample23
 * 
 * マウスポインターの座標を フキダシで表示する
 * 
 */

P.preload = async function() {
    this.loadImage(`${HOST}/assets/backdrop.png`,'BackDrop');
    this.loadImage(`${HOST}/assets/cat.svg`,'Cat1');
    this.loadImage(`${HOST}/assets/cat2.svg`,'Cat2');
}

P.prepare = async function() {
    P.stage = new P.Stage("stage");
    P.stage.addImage( P.images.BackDrop );

    P.cat = new P.Sprite("Cat");
    P.cat.setRotationStyle( P.RotationStyle.LEFT_RIGHT );
    P.cat.addImage( P.images.Cat1 );
    P.cat.addImage( P.images.Cat2 );
    P.cat.position = {x: -150, y: 0}
    P.cat.direction = 90;

}


const MessageCat1Think = 'BUBBLE1_THINK';

P.setting = async function() {

    P.stage.whenFlag( async function() {
        await P.wait(1000);
        for(;;) {
            const position = P.mousePosition;
            this.broadcast(MessageCat1Think, `(x,y)=(${Math.ceil(position.x)},${Math.ceil(position.y)})`);          
        }
    });
    P.cat.whenBroadcastReceived(MessageCat1Think, async function(text="") {
        this.say(text);
    });
}
