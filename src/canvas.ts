import { createCanvas, Canvas } from 'canvas'

const canvas = createCanvas(640, 48)
const ctx = canvas.getContext('2d')
clearCanvas()

export { canvas }
export function clearCanvas(): void {
	ctx.fillStyle = 'black'
	ctx.fillRect(0, 0, 640, 48)
}
export function fillCanvas(text: string, align: string, color = '#FFFFFF', bgColor = '#000000'): Canvas {
	clearCanvas()
	ctx.fillStyle = bgColor
	ctx.fillRect(0, 0, 640, 48)
	ctx.fillStyle = color
	ctx.textAlign = align as CanvasTextAlign
	let textXaxis = 10
	switch (align) {
		case 'center':
			textXaxis = 320
			break
		case 'right':
			textXaxis = 630
			break
	}
	ctx.font =
		"40px 'Hiragino Kaku Gothic Pro', 'WenQuanYi Zen Hei', '微軟正黑體', '蘋果儷中黑', Helvetica, Arial, sans-serif"
	ctx.fillText(text, textXaxis, 40)
	return canvas
}
