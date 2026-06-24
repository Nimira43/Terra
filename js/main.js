(function () {
  const globe = document.getElementById('globe')
  const wrap = document.getElementById('globeWrap')
  const sparks = document.getElementById('sparksLayer')

  function buildGlobe() {
    globe.innerHTML = ''
    const size = wrap.clientWidth
    const R = size / 2
    const meridianCount = 9
    
    for (let i = 0; i < meridianCount; i++) {
      const angle = (180 / meridianCount) * i
      const ring = document.createElement('div')
      ring.className = 'ring meridian'
      ring.style.width = size + 'px'
      ring.style.height = size + 'px'
      ring.style.marginTop = (-R) + 'px'
      ring.style.marginLeft = (-R) + 'px'
      ring.style.transform = `rotateY(${angle}deg)`
      globe.appendChild(ring)
    }

    const lats = [-75, -50, -25, 0, 25, 50, 75]
    lats.forEach(lat => {
      const rad = lat * Math.PI / 180
      const rr = R * Math.cos(rad)   
      const z = R * Math.sin(rad)
      const ring = document.createElement('div')
      ring.className = 'ring parallel' + (lat === 0 ? ' equator' : '')
      ring.style.width = (rr * 2) + 'px'
      ring.style.height = (rr * 2) + 'px'
      ring.style.marginTop = (-rr) + 'px'
      ring.style.marginLeft = (-rr) + 'px'
      ring.style.transform = `rotateX(90deg) translateZ(${z}px)`
      globe.appendChild(ring)
    })
  }

  buildGlobe()
  window.addEventListener('resize', buildGlobe)

  function spawnSpark() {
    const size = wrap.clientWidth
    const R = size / 2
    const ang = Math.random() * 360
    const start = R * (0.82 + Math.random() * 0.14)
    const dist = size * (0.25 + Math.random() * 0.5)
    const dur = 450 + Math.random() * 500

    const s = document.createElement('div')
    s.className = 'spark'
    s.style.setProperty('--ang', ang + 'deg')
    s.style.setProperty('--start', start + 'px')
    s.style.setProperty('--dist', dist + 'px')
    s.style.animationDuration = dur + 'ms'

    s.addEventListener('animationend', () => s.remove())
    sparks.appendChild(s)
  }

  function sparkLoop() {
    const burst = 1 + Math.floor(Math.random() * 2)
    for (let i = 0; i < burst; i++) spawnSpark()
    const gap = 90 + Math.random() * 260
    setTimeout(sparkLoop, gap)
  }

  sparkLoop()

  const r1 = document.getElementById('readout1')
  const r2 = document.getElementById('readout2')
  const sigStates = ['▓▓▓▓▌░░', '▓▓▓░▌░░', '▓▓▓▓▓▌░', '▓▓▓▓░░░']

  let t = 0
  setInterval(() => {
    t += 1
    const lat = (Math.sin(t / 9) * 41).toFixed(1)
    const lon = ((t * 4) % 360).toFixed(1)
    r1.textContent = `LAT ${lat.padStart(5, ' ')}°  LON ${lon.padStart(5, '0')}°`
    r2.textContent = `ROT ${(360 / 14).toFixed(0)}°/SEC`
  }, 700)

})()
