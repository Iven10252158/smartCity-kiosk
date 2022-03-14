import store from '../store'

let socket = null

export const connectSocket = (id) => {
  const WS_BASE = `${process.env.VUE_APP_WS_BASE}` // 192.168.1.176:8080/ws/'
  const WS_PORT = id
  const WS_ADDRESS = `${WS_BASE}${WS_PORT}`
  console.log('WS_ADDRESS', WS_ADDRESS)
  socket = new WebSocket(WS_ADDRESS)

  socket.onopen = () => { // 連線(onopen)
    store.dispatch('ws/onOpen')
    console.log('websocket connected!!', id)
    if (socket.readyState === 1) {
      socket.send(JSON.stringify({ command: `get_status ${id}` }))
    }
  }
  socket.onmessage = (msg) => { // 監聽訊息(onmessage)
    store.dispatch('ws/handWsRes', JSON.parse(msg.data))
    // console.log('onmessage:', id, JSON.parse(msg.data))
  }
  socket.onerror = (err) => { // 監聽錯誤(onerror)
    console.log('error', err)
  }
}
