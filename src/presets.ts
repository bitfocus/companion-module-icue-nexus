import InstanceSkel = require('../../../instance_skel')
import { CompanionPreset } from '../../../instance_skel_types'
import { DeviceConfig } from './config'

export function GetPresetsList(instance: InstanceSkel<DeviceConfig>): CompanionPreset[] {
	const presets: CompanionPreset[] = []
	presets.push({
		category: 'Commands',
		label: `Hello`,
		bank: {
			style: 'text',
			text: 'Hello',
			size: 'auto',
			color: instance.rgb(255, 255, 255),
			bgcolor: instance.rgb(0, 0, 0),
		},
		feedbacks: [],
		actions: [
			{
				action: 'setText',
				options: {
					text: 'hello',
					align: 'left',
					color: '#ffffff',
					bgcolor: '#000000',
				},
			},
		],
	})

	return presets
}
