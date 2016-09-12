// 游戏入口函数主模块
define(function(require, exports, module) {
    var Sky = require('./sky.js');
    var Bird = require('./bird.js');
    var Land = require('./land.js');
    var Pipe = require('./pipe.js');
    var getImgs = require('./getImg.js');
    // console.log(Sky);
    function main(ctx,cvs) {
        getImgs(function(imgObj) {
            // 先初始化天空类
            // 创建两个天空实例
            Sky.init(ctx, cvs, imgObj.sky);
            var sky = new Sky(0, 0);
            var sky2 = new Sky(imgObj.sky.width, 0);

            // 初始化鸟类
            Bird.init(ctx, cvs, imgObj.bird);
            var bird = new Bird(50, 50, 50, 50);
            bird.bind();

            // 初始化大地类，创建四个大地实例
            Land.init(ctx, cvs, imgObj.land);
            var land = new Land(imgObj.land.width * 0, cvs.height - imgObj.land.height);
            var land2 = new Land(imgObj.land.width * 1, cvs.height - imgObj.land.height);
            var land3 = new Land(imgObj.land.width * 2, cvs.height - imgObj.land.height);
            var land4 = new Land(imgObj.land.width * 3, cvs.height - imgObj.land.height);

            // 初始化管道类，创建xx个管道实例
            Pipe.init(ctx, cvs, imgObj.pipeDown, imgObj.pipeUp);
            var pipe = new Pipe(200 + imgObj.pipeDown.width * 3 * 0);
            var pipe2 = new Pipe(200 + imgObj.pipeDown.width * 3 * 1);
            var pipe3 = new Pipe(200 + imgObj.pipeDown.width * 3 * 2);
            var pipe4 = new Pipe(200 + imgObj.pipeDown.width * 3 * 3);
            var pipe5 = new Pipe(200 + imgObj.pipeDown.width * 3 * 4);
            var pipe6 = new Pipe(200 + imgObj.pipeDown.width * 3 * 5);

            var timer = setInterval(function() {

                // 小鸟中心点x轴和Y轴坐标
                var birdCoreX = bird.x + bird.w / 2;
                var birdCoreY = bird.y + bird.h / 2;
                // 判断小鸟有没有飞出画布或撞向大地，有则游戏结束
                if (birdCoreY < 0 ||
                    birdCoreY > (cvs.height - imgObj.land.height) ||
                    ctx.isPointInPath(birdCoreX, birdCoreY)) {
                    clearInterval(timer);
                }

                // 清除画布
                ctx.clearRect(0, 0, cvs.width, cvs.height);

                // 绘制天空
                sky.draw();
                sky.update();
                sky2.draw();
                sky2.update();

                // 绘制管道，绘制前先把之前的路径清除掉，防止路径的累加。
                ctx.beginPath();
                pipe.draw();
                pipe.update();
                pipe2.draw();
                pipe2.update();
                pipe3.draw();
                pipe3.update();
                pipe4.draw();
                pipe4.update();
                pipe5.draw();
                pipe5.update();
                pipe6.draw();
                pipe6.update();

                // 绘制大地
                land.draw();
                land.update();
                land2.draw();
                land2.update();
                land3.draw();
                land3.update();
                land4.draw();
                land4.update();

                // 绘制小鸟
                bird.draw();
                bird.update();
            }, 1000 / 60);
        });
    };
    // 暴露
    exports.main = main;  
    // main函数的指针给到了exports对象的属性main属性上;在入口函数处接收到的参数main是指代exports对象，需要用mian.main方式调用
    // module.exports = main;
});