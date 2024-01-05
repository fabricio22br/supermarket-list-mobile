import { Dimensions, PixelRatio } from 'react-native'

const figmaWitdth = 390

const px = valuePx => {
  const widthPercent = (valuePx / figmaWitdth) * 100
  const screenWidth = Dimensions.get('window').width
  return PixelRatio.roundToNearestPixel(
    (screenWidth * parseFloat(widthPercent)) / 100
  )
}

export { px }
