'use strict'

var gImgs = [{ id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] },
{ id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] },
{ id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] },
]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel'
            ,
            size: 20,
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function setLineTxt() {

}

function getImgs() {
    return gImgs
}

function getImgById(imgId) {
    return gImgs.find(img => imgId === img.id)
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
    renderMeme()
}
