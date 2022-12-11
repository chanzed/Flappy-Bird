class SceneMain extends ZedScene {
    constructor(game) {
        super(game)

        // 加入 bg
        let bg = new ZedImage(game, 'bg')
        this.bg = bg
        this.addElement(bg)
        //加入水管
        this.pipe = new Pipes(game)
        this.addElement(this.pipe)

        // 加入分数
        this.score = new Score(game)
        this.addElement(this.score)

        // 循环移动地面
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            let g = new ZedImage(game, 'ground')
            g.x = i * 20
            g.y = 500
            this.addElement(g)
            this.grounds.push(g)
        }

        let bird = new ZedAnimation(game)
        this.birdSpeed = 2
        this.bird = bird
        this.addElement(bird)
        bird.x = 100
        bird.y = 200
        this.addElement(bird)
        this.setupInputs()
        this.skipCount = 5
    }
    setupInputs() {
        // this.game.registerAction('a', (keyStatus) => {
        //     this.bird.move(-this.birdSpeed, keyStatus)
        // })
        // this.game.registerAction('d', (keyStatus) => {
        //     this.bird.move(this.birdSpeed, keyStatus)
        // })
        this.game.registerAction('w', (keyStatus) => {
            if (!this.running()) {
                return
            }
            if (keyStatus === 'down') {
                this.bird.jump()
            } else {
                this.bird.quitJump()
            }
        })
    }
    debug() {
        // this.birdSpeed = config.bird_speed.value
    }
    goal() {
        this.score.updateScore()
    }
    gameOver() {
        let scene = new SceneEnd(this.game)
        this.pipe.stop()
        this.bird.quitJump()
        this.game.replaceScene(scene, this.bird, ...this.grounds, this.score, this.pipe, this.bg, )
    }

    die() {
        if (this.bird.y + this.bird.h > this.grounds[0].y) {
            return true
        }
        for (let i = 0; i < this.pipe.pipes.length; i++) {
            let p = this.pipe.pipes[i]
            if (this.bird.collide(p)) {
                return true
            }
        }
        return false
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
        if (this.die()) {
            this.gameOver()
        }
        // 判断是否得分
        for (let i = 0; i < this.pipe.pipes.length; i += 2) {
            let p = this.pipe.pipes[i]
            if (p.x + p.w < this.bird.x && !p.hasCounted) {
                this.goal()
                p.hasCounted = true
            }
        }
    }
}