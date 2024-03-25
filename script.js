const heightRangeCM = [
  [150, 56.5, 93.5],
  [151, 57, 94.5],
  [152, 57.5, 95],
  [153, 58, 95.5],
  [154, 58.5, 96.3],
  [155, 59, 97],
  [156, 59.8, 97.5],
  [157, 60.3, 98.3],
  [158, 60.8, 98.8],
  [159, 61.3, 99.5],
  [160, 62, 100.3],
  [161, 62.3, 101.3],
  [162, 62.8, 101.8],
  [163, 63.3, 102.5],
  [164, 63.8, 103.3],
  [165, 64.3, 103.5],
  [166, 64.8, 108],
  [167, 65.3, 108.5],
  [168, 67, 110],
  [169, 68, 110.8],
  [170, 68.5, 111.3],
  [171, 69, 112],
  [172, 69.5, 112.8],
  [173, 69.5, 113.3],
  [174, 70, 113.8],
  [175, 70, 114],
  [176, 70.3, 114.3],
  [177, 70.5, 114.8],
  [178, 71, 115],
  [179, 71.3, 115.5],
  [180, 71.5, 115.8],
  [181, 71.5, 116.5],
  [182, 72, 116.8],
  [183, 72.5, 117.5],
  [184, 72.8, 118],
  [185, 73.5, 118.5],
  [186, 74, 119.3],
  [187, 74.5, 120],
  [188, 75, 120.3],
  [189, 75.5, 120.8],
  [190, 76, 122],
  [191, 77, 122.3],
  [192, 77.5, 123],
  [193, 78, 123.5],
  [194, 78.3, 123.8],
  [195, 79, 124.3],
  [196, 79.3, 124.8],
  [197, 79.8, 125.3],
  [198, 80, 125.5],
  [199, 80.3, 125.8],
  [200, 81, 126.3],
  [201, 82, 126.5],
  [202, 82.5, 127.3],
  [203, 83, 128],
  [204, 83.3, 128.3],
  [205, 84, 128.5]
]

const heightRangeIn =  [
["5'0", 22.5, 36.5],
["5'1", 23, 37],
["5'2", 23, 37,5],
["5'3", 23.5, 38],
["5'4", 24, 39],
["5'5", 24.5, 39.5],
["5'6", 25, 40.5],
["5'7", 25, 41],
["5'8", 25.5, 41.5],
["5'9", 26, 42.5],
["5'10", 26.5, 43],
["5'11", 27, 43.5],
["6'0", 27, 44],
["6'1", 27.5, 44.5],
["6'2", 28, 44.5],
["6'3", 28.5, 46],
["6'4", 28.5, 47],
["6'5", 29, 47.5],
["6'6", 29, 48],
["6'7", 29.5, 49],
["6'8", 30, 49.5]
]

const legs = document.getElementById("desk__legs")
const deskTop = document.getElementById("desk__top")
const input = document.getElementById("height")
const inputIn = document.getElementById("height-in")
const indicator = document.getElementById("indicator")
const indicatorBox = document.getElementById("indicator__box")
const deskDisplay = document.getElementById("desk__control__display")


let minHeight = 0
let maxHeight = 0
let type = 0 // sitting
let units = "cm"

document.getElementById("units").addEventListener("change", e => {
  units = e.target.value
  if (units === "cm") {
    showDeskHeight(input.value, type, units)
    inputIn.style.display = "none"
    input.style.display = "block"
  } else {
    showDeskHeight(inputIn.value, type, units)
    inputIn.style.display = "block"
    input.style.display = "none"
  }
}
)

document.getElementById("height-in").addEventListener("change", e => {
  showDeskHeight(e.target.value, type, units)
})

document.getElementById("type").addEventListener("change", e => {
  e.target.value === "standing" ? type = 1 : type = 0
  units === "cm" ? showDeskHeight(input.value, type, units) : showDeskHeight(inputIn.value, type, units)
})

document.getElementById("height").addEventListener("input", (e) => {
  if (e.target.value >= 150 && e.target.value <= 205) {
    showDeskHeight(e.target.value, type, units)
  }
})

const showDeskHeight = (person_height, type, units) => {
  console.log(units)
  if (units === "cm") {
    minHeight = 56.5
    maxHeight = type === 1 ? heightRangeCM.find(sub => sub[0] === parseInt(person_height))[2] : heightRangeCM.find(sub => sub[0] === parseInt(person_height))[1]  
  } else {
    minHeight = 22.5
    maxHeight = type === 1 ? heightRangeIn.find(sub => sub[0] === person_height)[2] : heightRangeIn.find(sub => sub[0] === person_height)[1]  
  }
  
  let diffHeight = maxHeight * 349 / minHeight - 349
  let scale = ((maxHeight * 349 / minHeight) * 100 / 349) / 100
  legs.style.transform = `scaleY(${scale})`
  deskTop.style.marginTop = `-${diffHeight}px`

  indicatorBox.style.height = `${scale * 100}%`
  deskDisplay.innerText = maxHeight.toFixed(1)
  indicator.innerText = maxHeight.toFixed(1)
}



