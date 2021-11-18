import { CompanionActions, CompanionActionEvent } from '../../../instance_skel_types'
import { fillCanvas } from './canvas'
import { setNexusImage } from './nexus'

export function GetActionsList(): CompanionActions {
	const actions: CompanionActions = {
		setText: {
			label: 'Set Text',
			description: 'Update Nexus Text',
			options: [
				{
					type: 'textinput',
					label: 'Text',
					id: 'text',
					default: 'Hello',
					tooltip: 'The text you want to display on iCUE Nexus',
				},
				{
					type: 'dropdown',
					label: 'Text align',
					id: 'align',
					default: 'left',
					tooltip: 'Select text align style',
					choices: [
						{ id: 'left', label: 'Left' },
						{ id: 'right', label: 'Right' },
						{ id: 'center', label: 'Center' },
					],
					multiple: false,
					minChoicesForSearch: 0,
				},
				{
					type: 'textinput',
					label: 'Text Color',
					id: 'color',
					default: '#FFFFFF',
					tooltip: 'The text color',
					regex: '/^#?[0-9A-Fa-f]{6}$/',
				},
				{
					type: 'textinput',
					label: 'Background Color',
					id: 'bgcolor',
					default: '#000000',
					tooltip: 'The background color',
					regex: '/^#?[0-9A-Fa-f]{6}$/',
				},
			],
			callback: (action: CompanionActionEvent) => {
				const _img = fillCanvas(
					action.options.text as string,
					action.options.align as string,
					action.options.color as string,
					action.options.bgcolor as string
				)
				setNexusImage(_img.getContext('2d'))
			},
		},
	}

	return actions
}
