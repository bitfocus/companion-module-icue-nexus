import * as hid from 'node-hid'
import * as usbDetect from 'usb-detection'
import { CanvasRenderingContext2D } from 'canvas'

const vid = 0x1b1c
const pid = 0x1b8e
const width = 640
const height = 48
let _brightness = 2

let device: hid.HID | undefined
let connected = false

export function destroyMonitor(): void {
	usbDetect.stopMonitoring()
}

export function createHIDMonitor(): void {
	usbDetect.startMonitoring()
	usbDetect.on('add:' + vid.toString() + ':' + pid.toString(), () => {
		console.log('iCUE Nexus: Nexus attached to USB interface')
		setTimeout(() => {
			initNexusDevice()
		}, 1500)
	})
	usbDetect.on('remove:' + vid.toString() + ':' + pid.toString(), destroyDevice)
	usbDetect.on('change:' + vid.toString() + ':' + pid.toString(), () => {
		setTimeout(() => {
			initNexusDevice()
		}, 1500)
	})
}

export function initNexusDevice(): void {
	if (device) {
		device.close()
		connected = false
	}
	console.log('iCUE Nexus: Trying to init device.')
	try {
		device = new hid.HID(vid, pid)
		connected = true
		console.log('iCUE Nexus: Device connected.')
		setNexusBrightness(_brightness)
		// eslint-disable-next-line no-empty
	} catch (e) {}
}

export function destroyDevice(): void {
	if (device) {
		console.log('iCUE Nexus: Disconnecting...')
		setNexusBrightness(0)
		device.close()
		device = undefined
		connected = false
	}
}
export function isConnected(): boolean {
	return connected
}

export function setNexusBrightness(brightness: number): void {
	_brightness = brightness
	if (!connected) {
		console.log('iCUE Nexus: not connected.')
		return
	}
	if (brightness > 4) {
		brightness = 4
	} else if (brightness < 0) {
		brightness = 0
	}
	const data = new Uint8Array([
		3,
		1,
		[0, 4, 12, 16, 64][Math.floor(brightness)],
		1,
		120,
		0,
		192,
		3,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
		0,
	])
	device?.sendFeatureReport(Buffer.from(data))
}

export function setNexusImage(canvasCtx: CanvasRenderingContext2D): void {
	if (!connected) {
		console.log('iCUE Nexus: not connected.')
		return
	}
	const imageData = canvasCtx.getImageData(0, 0, width, height).data
	if (imageData.length !== width * height * 4) {
		throw new Error('Incoming Image Data Length Mismatch')
	}
	const data = Buffer.alloc(1024)
	data[0] = 2
	data[1] = 5
	data[2] = 31
	data[3] = 0
	data[4] = 0
	data[5] = 0
	data[6] = 248
	data[7] = 3
	for (let i = 0; i <= 120; i++) {
		data[4] = i
		if (i != 120) {
			data[3] = 0
			data[6] = 248
		} else {
			data[3] = 1
			data[6] = 192
		}
		let num = 0
		let num2 = i * 254
		while (num < 255 && num2 < 30720) {
			data[8 + num * 4] = imageData[num2 * 4 + 2]
			data[8 + num * 4 + 1] = imageData[num2 * 4 + 1]
			data[8 + num * 4 + 2] = imageData[num2 * 4]
			data[8 + num * 4 + 3] = 255
			num++
			num2++
		}
		device?.write(data)
	}
}
