/**
 * Sample19
 * 
 * 吹き出し(SAY, THINK)
 * 
 */
P.preload = async function() {
    this.loadImage(`${HOST}/assets/Jurassic.svg`,'Jurassic');
    this.loadImage(`${HOST}/assets/cat.svg`,'Cat1');
    this.loadImage(`${HOST}/assets/cat2.svg`,'Cat2');
}

P.prepare = async function() {
    P.stage = new P.Stage("stage");
    P.stage.addImage( P.images.Jurassic );

    P.cat1 = new P.Sprite("Cat1");
    P.cat1.addImage( P.images.Cat1 );
    P.cat1.addImage( P.images.Cat2 );
    P.cat1.direction = 75;

    P.cat2 = new P.Sprite("Cat2");
    P.cat2.addImage( P.images.Cat1 );
    P.cat2.addImage( P.images.Cat2 );
    P.cat2.direction = 115;
    P.cat2.position = {x: -20, y: -120}

}

const bubble = {'type': 'say', 'text': "abcdefg", 'exit': false};
const bubbleTextArr = [
    "ABCDEFG",
    "HIJKLMNOPQRSTU VWXYZ",
    "私はねこ",
];
const bubble2 = {'type': 'think', 'text': "かきくえばぁかねがなるなりほうりゅうじ", 'exit': false};
const bubbleTextArr2 = [
    "かきくえばぁ鐘がなるなり法隆寺",
    "💚こんにちは💚",
    "あなたもねこだね",
    "★こんばんは★",
];
P.setting = async function() {

    P.cat1.whenFlag( async function() {
        for(;;) {
            this.ifOnEdgeBounds();
            this.moveSteps(1);
        }
    });
    P.cat2.whenFlag( async function() {
        for(;;) {
            this.ifOnEdgeBounds();
            this.moveSteps(1);
        }
    });
    P.cat1.whenFlag( async function() {
        await P.wait(100)
        for(;;) {
            this.nextCostume();
            await P.wait(100)
        }
    });
    P.cat2.whenFlag( async function() {
        await P.wait(100)
        for(;;) {
            this.nextCostume();
            await P.wait(100)
        }
    });
    P.cat1.whenFlag( async function() {
        for(;;) {
            for(;;) {
                this.setScale(this.scale.x - 2, this.scale.y - 2);
                if(this.scale.x < 50) break;
            }
            for(;;) {
                this.setScale(this.scale.x + 2, this.scale.y + 2);
                if(this.scale.x > 150) break;
            }
        }
    });
    P.cat1.whenFlag( async function() {
        let counter = 0
        for(;;) {
            const text = bubbleTextArr[ Math.ceil(Math.random() * bubbleTextArr.length) - 1 ]
            if( this.ifOnEdgeBounds() ) {
                counter += 1;
                counter = counter % 2;
            }
            if( counter == 0 ) {
                this.say(text);
            }else{
                this.think(text);
            }
            if( bubble.exit === true) {
                this.say();
                break;
            }
            await P.wait(500)
        }

    });
    P.cat2.whenFlag( async function() {
        let scale = {x: 60, y:60}; // <-- フキダシのサイズ用（ Scratch3 の機能にはない ）
        for(;;) {
            const text = bubbleTextArr2[ Math.ceil(Math.random() * bubbleTextArr2.length) - 1 ]
            this.think(text, {scale:scale});
            if( bubble2.exit === true) {
                this.say();
                break;
            }
            await P.wait(500)
        }

    });

    P.cat1.whenFlag( async function() {
        await P.wait(20*1000); // 20秒たったらバブルループを終わらせる。
        bubble.exit = true;
    });

    P.cat2.whenFlag( async function() {
        await P.wait(20*1000); // 20秒たったらバブルループを終わらせる。
        bubble2.exit = true;
    });
}
