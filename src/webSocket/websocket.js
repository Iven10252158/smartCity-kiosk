import store from '../store'

let socket = null
let socketTouch = null

export const connectSocket = (id) => {
  const WS_BASE = `${process.env.VUE_APP_WS_BASE}` // 192.168.1.176:8080/ws/'
  const WS_PORT = id
  const WS_ADDRESS = `${WS_BASE}${WS_PORT}`
  socket = new WebSocket(WS_ADDRESS)

  socket.onopen = () => { // 連線(onopen)
    store.dispatch('ws/onOpen')
    console.log('websocket connected!!')
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

export const connectSocketTouch = () => {
  socketTouch = new WebSocket('ws://192.168.1.151:5678/ws/') // 192.168.1.151:5678
  socketTouch.onopen = () => { // 連線(onopen)
    store.dispatch('cursorState/onOpen')
    if (socketTouch.readyState === 1) {
      console.log('connectSocketTouch connected!!')
    // socket.send(JSON.stringify({ command: `get_status ${id}` }))
    }
  }
  socketTouch.onmessage = (msg) => { // 監聽訊息(onmessage)
    store.dispatch('cursorState/handWsRes', JSON.parse(msg.data))
    console.log('onmessage:', JSON.parse(msg.data))
  }
  socketTouch.onerror = (err) => { // 監聽錯誤(onerror)
    console.log('error', err)
  }
}
