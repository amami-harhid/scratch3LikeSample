/**
* Sample07
* スプライトを 動かす ( 端に触れたら )
*/
P.preload = async function() {
   this.loadImage(`${HOST}/assets/Jurassic.svg`,'Jurassic');
   this.loadSound(`${HOST}/assets/Chill.wav`,'Chill');
   this.loadImage(`${HOST}/assets/cat.svg`,'Cat');
}

P.prepare = async function() {
   P.stage = new P.Stage("stage");
   P.stage.addImage( P.images.Jurassic );
   P.cat = new P.Sprite("Cat");
   P.cat.addImage( P.images.Cat );
}

P.setting = async function() {

   P.stage.whenRightNow(async function() {
       // 音を登録する
       this.addSound( P.sounds.Chill, { 'volume' : 50 } );
   });
   P.stage.whenFlag(async function() {
       // 「終わるまで音を鳴らす」をずっと繰り返す、スレッドを起動する
       this.startThread( async function() {
           for(;;) {
               await this.startSoundUntilDone();
           }
       });
   });

   P.cat.whenFlag( async function() {
       this.direction = (Math.random()-0.5) * 180;
       // 「終わるまで音を鳴らす」をずっと繰り返す、スレッドを起動する
       this.startThread( async function() {
           const steps = 10;
           const stepsNearing = 1
           const stageWidthHalf = P.stageWidth/2; // half size
           const stageHeightHalf = P.stageHeight/2; // half size
           const isNearing = function(me) {
               const _near = 65/100;
               if(Math.abs(me.position.x) > stageWidthHalf * _near ) return true;
               if(Math.abs(me.position.y) > stageHeightHalf * _near) return true;
               return false;
           }
           for(;;) {
               if( isNearing(this) ) {
                   // nearing
                   this.ifOnEdgeBounds();
                   this.moveSteps( stepsNearing );
               }else{
                   this.moveSteps( steps );
               }
           }
       });

   });
}