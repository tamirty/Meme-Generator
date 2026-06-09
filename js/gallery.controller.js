'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()

    const strHtmls = imgs.map(img => `
    <img src="${img.url}" alt="" onclick="coverCanvasWithImg(this)">`
    )

    elGallery.innerHTML = strHtmls.join('')

}

function omImgSelect() {

}