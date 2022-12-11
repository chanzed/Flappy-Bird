class ZedLabel extends ZedScene {
    constructor(game, text) {
        super(game)
        this.text = text
    }

    draw() {
        this.game.context.fillText(this.text,200, 150)
    }
    update() {

    }
}