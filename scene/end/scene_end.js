class SceneEnd extends ZedScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            let s = new SceneBegin(game)
            game.replaceScene(s)
        })
        let g = new ZedImage(this.game, 'go')
        g.x = 100
        g.y = 150
        this.addElement(g)
    }
    draw() {
        super.draw()
        let context = this.game.context
        context.font = '16px serif'
        context.fillStyle = '#FFFFFF'
        context.textAlign = 'center'
        this.game.context.fillText('游戏结束，按 r 重新开始', this.game.width / 2, 280)
    }
    update() {
        super.update()
    }
}