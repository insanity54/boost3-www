export function game() {
  return {
    remainingTimeMs: 60000,
    roundTimeMs: 60000,
    gameTimer: null,
    async init() {
      this.gameTimer = setTimeout(() => {
        this.tick()
      }, 500)
      Alpine.store("offer").getUnclaimed()
    },
    tick() {
      if (this.remainingTimeMs < 1) {
        console.log(`tick`)
        Alpine.store("offer").getUnclaimed()
      } else {
        this.remainingTimeMs = this.remainingTimeMs - 500
        setTimeout(() => {
          this.tick()
        }, 500)
      }
    }
  };
}

