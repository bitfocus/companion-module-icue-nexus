import { SomeCompanionConfigField } from '../../../instance_skel_types'

export interface DeviceConfig {
	brightness?: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			type: 'dropdown',
			label: 'Brightness',
			id: 'brightness',
			default: 2,
			choices: [
				{ id: 1, label: '1' },
				{ id: 2, label: '2' },
				{ id: 3, label: '3' },
				{ id: 4, label: '4' },
			],
		} as SomeCompanionConfigField,
	]
}
