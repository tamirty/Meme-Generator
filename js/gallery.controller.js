'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()

    const strHtmls = imgs.map(img => `
    <img src="${img.url}" alt="" onclick="onImgSelect(${img.id})">
    `)

    elGallery.innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}