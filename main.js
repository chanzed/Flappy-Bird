const enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        let k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        }
    })
}
const __main = () => {

    let images = {
        //
        ground: './img/ground.png',
        b1: './img/bird1.png',
        b2: './img/bird2.png',
        b3: './img/bird3.png',
        bg: './img/bg.png',
        pipe: './img/p2.png',
        s0: './img/source/source0.png',
        s1: './img/source/source1.png',
        s2: './img/source/source2.png',
        s3: './img/source/source3.png',
        s4: './img/source/source4.png',
        s5: './img/source/source5.png',
        s6: './img/source/source6.png',
        s7: './img/source/source7.png',
        s8: './img/source/source8.png',
        s9: './img/source/source9.png',
        go: './img/gameover.png',
        title: './img/message.png',

    }
    // let scene = Scene(game)
    let game = ZedGame.instance(40, images, function(game) {
        let s = new SceneBegin(game)
        game.runWithScene(s)

    })
    // 从配置文件生成 HTML 控件
    insertControls()
    // 绑定事件
    bindEvents()
    enableDebugMode(game,true)


}
__main()