class Score {
    constructor(game) {
        this.game = game
        this.numbers = []
        this.score = 0
    }

    setNumbers() {
        let a = String(this.score).split('')
        for (let i = 0; i < a.length; i++) {
            let name = 's' + a[i]
            let s = new ZedImage(this.game, name)
            s.x = 180 + 30 * i
            s.y = 20
            this.numbers.push(s)
        }
    }
    updateScore() {
        this.score += 1
    }
    draw() {
        for (let s of this.numbers) {
            s.draw()
        }
    }

    update() {
        this.numbers = []
        this.setNumbers()
    }
}