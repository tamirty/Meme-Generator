'use strict'

var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
    renderGallery()
    initMeme(gElCanvas.width)
    renderMeme()
}

function addListeners() {
    addMouseListeners()
    // addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function renderMeme() {
    const meme = getMeme()
    renderLineTxt()

    drawImg(meme.selectedImgId, () => {
        meme.lines.forEach((line, idx) => {
            drawText(line.txt, line.x, line.y, line.color, line.size)

            if (idx === meme.selectedLineIdx) drawTextRect(line, line.x, line.y)
        })
    })
}

function renderLineTxt() {
    const meme = getMeme()
    const currLine = meme.lines[meme.selectedLineIdx]
    const elTxtInput = document.querySelector('.txt-input')

    if (!currLine) {
        elTxtInput.value = ''
        return
    }

    elTxtInput.value = currLine.txt
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

function drawText(text, x, y, color, size) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    gCtx.fillStyle = color

    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawTextRect(line, x, y) {
    const width = gCtx.measureText(line.txt).width
    const height = line.size

    gCtx.beginPath()
    gCtx.strokeStyle = 'lightblue'
    gCtx.lineWidth = 2
    gCtx.roundRect(x - width / 2 - 10, y - height / 2 - 10, width + 20, height + 20, 10)

    gCtx.fillStyle = 'lightorange'
    // gCtx.fillRect(x, y, width, height)
    gCtx.stroke()
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

function onAddNewLine() {
    addNewLine(gElCanvas.width)
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onDownloadImg(elLink) {
    elLink.href = gElCanvas.toDataURL()
    elLink.download = 'meme-2026'
}

function getEvPos(ev) {
    return {
        x: ev.offsetX,
        y: ev.offsetY,
    }
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const lineIdx = getClickedLineIdx(pos)

    if (lineIdx === -1) return

    setSelectedLine(lineIdx)
    renderLineTxt()
    renderMeme()
}