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

function drawImg(imgId,onImgLoaded) {
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
        drawText(meme.lines[0].txt, 50, 50)
    })
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'orange'

    gCtx.fillStyle = 'lightsteelblue'

    gCtx.font = '45px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function onAddText(ev) {
    const { offsetX, offsetY } = ev
    drawText(gMeme.lines[0].txt, offsetX, offsetY)
}