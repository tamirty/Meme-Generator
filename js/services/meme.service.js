'use strict'

const STORAGE_KEY = 'memeDB'

var gSavedMemes = loadFromStorage(STORAGE_KEY) || []

var gImgs = [
    { id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'imgs/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'imgs/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'imgs/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'imgs/17.jpg', keywords: ['funny', 'cat'] },
    { id: 18, url: 'imgs/18.jpg', keywords: ['funny', 'cat'] },
]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Hello',
            size: 20,
            color: 'blue',
            x: 0,
            y: 0,
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getSavedMemes() {
    return gSavedMemes
}

function getImgById(imgId) {
    return gImgs.find(img => imgId === img.id)
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
}

function decreaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].size <= 20) return
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
}

function addNewLine(canvasWidth) {
    const newLine = {
        txt: 'New Line',
        size: 20,
        color: 'yellow',
        x: canvasWidth / 2,
        y: 50 + gMeme.lines.length * 50,
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)

    if (gMeme.selectedLineIdx >= gMeme.lines.length) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }
}

function switchLine() {
    gMeme.selectedLineIdx++

    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}


function initMeme(canvasWidth) {
    gMeme.lines[0].x = canvasWidth / 2
    gMeme.lines[0].y = 50
}

function getClickedLineIdx(pos) {
    return gMeme.lines.findIndex(line => {
        const width = gCtx.measureText(line.txt).width

        return (
            pos.x >= line.x - width / 2 - 10 && pos.x <= line.x + width / 2 + 10 &&
            pos.y >= line.y - line.size / 2 - 10 && pos.y <= line.y + line.size / 2 + 10
        )
    })
}

function setSelectedLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function addMeme(data) {
    const meme = _createMeme(data)
    gSavedMemes.unshift(meme)
    _savePicsToStorage()
    return meme
}

function _createMeme(data) {
    return {
        id: makeId(),
        createdAt: Date.now(),
        data
    }
}

function removeSavedMeme(memeId) {
    const savedMemeIdx = gSavedMemes.findIndex(meme => memeId === meme.id)
    
    if (savedMemeIdx === -1) return
    
    gSavedMemes.splice(savedMemeIdx,1)

    _savePicsToStorage()
}

function _savePicsToStorage() {
    saveToStorage(STORAGE_KEY, gSavedMemes)
}