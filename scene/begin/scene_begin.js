class SceneBegin extends ZedScene {
    constructor(game) {
        super(game)
        // 加入 bg
        let bg = new ZedImage(game, 'bg')
        this.addElement(bg)
        // 加入标题
        let title = new ZedImage(game, 'title')
        title.x = 100
        title.y = 150
        this.addElement(title)
        // 循环移动地面
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            let g = new ZedImage(game, 'ground')
            g.x = i * 20
            g.y = 500
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 5
        this.setupInputs()
    }
    setupInputs() {
        this.game.registerAction('k', () => {
            if (!this.running()) {
                return
            }
            let s = new SceneMain(this.game)
            this.game.replaceScene(s)
        })
    }

    update() {
        super.update()
        // 地面移动
        this.skipCount -= 1
        let offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 5
            offset = 20
        }
        for (let i = 0; i < 30; i++) {
            let g = this.grounds[i]
            g.x += offset
        }
    }

    draw() {
        super.draw()
        let context = this.game.context
        context.font = '16px serif'
        context.fillStyle = '#FFFFFF'
        context.textAlign = 'center'
        this.game.context.fillText('按 k 开始游戏，按 p 暂停，按 w 起跳', this.game.width / 2, 230)
    }
}