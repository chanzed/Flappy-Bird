
class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = config.pipe_space.value
        this.pipeGutter = 200
        this.columnOfPipe = 3
        this.deltaX = 5
        for (let i = 0; i < this.columnOfPipe; i++) {
            let p1 = new ZedImage(game, 'pipe')
            p1.flipY = true
            p1.hasCounted = false
            p1.x = 500 + i * this.pipeGutter
            let p2 = new ZedImage(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-300, -100)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.pipeSpace = config.pipe_space.value
    }
    update() {
        for (let i = 0; i < this.pipes.length; i += 2) {
            let p1 = this.pipes[i]
            let p2 = this.pipes[i+1]
            p1.x -= this.deltaX
            p2.x -= this.deltaX
            if (p1.x < -100) {
                p1.x += this.pipeGutter * this.columnOfPipe
                p1.hasCounted = false
            }
            if (p2.x < -100) {
                p2.x += this.pipeGutter * this.columnOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    stop() {
        this.deltaX = 0
    }
    draw() {
        let context = this.game.context
        for (const p of this.pipes) {
            context.save()

            let w2 = p.w / 2
            let h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            let scaleX = p.flipX ? -1 : 1
            let scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)
            context.restore()
        }
    }
}