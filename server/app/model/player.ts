const players: Array<Player> = []
class Player {
  name: string | undefined
  id: string | undefined
  opponentId: string | undefined
  constructor(name?: string, id?: string, opponentId = '') {
    this.id = id
    this.name = name
    this.opponentId = opponentId
  }
  /**
   * getId
   */
  public getId() {
    return { name: this.name, id: this.id }
  }
  /**
   * setOpponent
   */
  public setOpponentId(id: string) {
    players.forEach((player: Player) => {
      if (player.id === id) {
        player.opponentId = this.id
        this.opponentId = player.id
      }
    })
  }
}

export { Player, players }
