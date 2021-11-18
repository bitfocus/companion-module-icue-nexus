import InstanceSkel = require('../../../instance_skel')
import { CompanionConfigField, CompanionSystem } from '../../../instance_skel_types'
import { GetActionsList } from './actions'
import { DeviceConfig, GetConfigFields } from './config'
import { GetPresetsList } from './presets'
import * as Nexus from './nexus'

class ControllerInstance extends InstanceSkel<DeviceConfig> {
	constructor(system: CompanionSystem, id: string, config: DeviceConfig) {
		super(system, id, config)
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 */
	public init(): void {
		this.status(this.STATUS_UNKNOWN)
		this.updateConfig(this.config)

		this.setPresetDefinitions(GetPresetsList(this))
		this.setActions(GetActionsList())
		Nexus.createHIDMonitor()
		Nexus.initNexusDevice()
	}

	/**
	 * Process an updated configuration array.
	 */
	public updateConfig(config: DeviceConfig): void {
		this.config = config

		Nexus.setNexusBrightness(config.brightness || 2)
	}

	/**
	 * Creates the configuration fields for web config.
	 */
	public config_fields(): CompanionConfigField[] {
		return GetConfigFields()
	}

	/**
	 * Clean up the instance before it is destroyed.
	 */
	public destroy(): void {
		try {
			Nexus.destroyMonitor()
			Nexus.destroyDevice()
		} catch (e) {
			// Ignore
		}

		this.debug('destroy', this.id)
		this.status(this.STATUS_UNKNOWN)
		console.log('iCUE Nexus: Plugin destroyed.')
	}
}

export = ControllerInstance
