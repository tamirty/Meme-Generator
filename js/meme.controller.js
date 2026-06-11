'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    // addListeners()
    renderGallery()
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function drawImg(imgId, onImgLoaded) {
    const elImg = new Image()
    const img = getImgById(imgId)
    elImg.src = img.url

    elImg.onload = () => {
        coverCanvasWithImg(elImg)
        onImgLoaded()
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
    const meme = getMeme()

    drawImg(meme.selectedImgId, () => {
        meme.lines.forEach(line => {
            drawText(line.txt, 50, 50, line.color,line.size)
        })
    })
}

function drawText(text, x, y, color,size) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    gCtx.fillStyle = color

    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onAddText(ev) {
    const { offsetX, offsetY } = ev
    drawText(gMeme.lines[0].txt, offsetX, offsetY)
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onDownloadImg(elLink) {
    elLink.href = gElCanvas.toDataURL()
    elLink.download = 'meme-2026'
}