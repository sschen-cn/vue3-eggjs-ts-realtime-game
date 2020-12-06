export default {
  parseMsg(action: string, payload = {}, metadata = {}) {
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata)

    return {
      meta,
      data: {
        action,
        payload,
      },
    }
  },
}
