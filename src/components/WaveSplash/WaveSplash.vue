<template>
	<WaveAnimation @updateWaveState="updateWaveState" v-if="showWaveAnimation" :waveState="stateOfWave" ref="waveAnim" />
	<div v-else class="mobileWave"></div>
</template>

<script lang="ts">
import WaveAnimation from './WaveAnimation.vue';
import waveUtils from './waveUtils';

export default {
	name: 'WaveSplash',
	components: {
		WaveAnimation
	},
	data: (vm): {
		showWaveAnimation: boolean,
		stateOfWave: number, // needs to become keyof wavestates
		route: null | string
	} => ({
		showWaveAnimation: vm.calculateShowWaveAnimation(),
		stateOfWave: waveUtils.WaveStates.INITIAL,
		route: null
	}),
	methods: {
		updateWaveState(newState: number) { // this has to be one of the wavestates probably
			console.log('received updatewavestate with val', newState);
			this.stateOfWave = Math.max(this.stateOfWave, newState);
		},
		transitionTo(goto: string) {
			this.route = goto;
			this.stateOfWave = Math.max(this.stateOfWave, waveUtils.WaveStates.FILLING);
		},
		handleResize() {
			this.showWaveAnimation = this.calculateShowWaveAnimation();
		},
		calculateShowWaveAnimation() {
			return window.innerWidth > 485; // Responsive width mobile from a css to js function with param '485px'
		}
	},
	watch: {
		stateOfWave: {
			handler(newState, oldState) {
				if (this.route && newState === waveUtils.WaveStates.FILLED && newState !== oldState) {
					// this.$router.replace({ path: this.route });
					window.location.reload();
				}
			},
			immediate: true
		}
	},
	mounted() {
		window.removeEventListener('resize', this.handleResize);
		window.addEventListener('resize', this.handleResize);
	},
	beforeUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
};

</script>

<style scoped>
.mobileWave {
	position: fixed;
	left: 0;
	top: 0;
	width: 100vh;
	height: 100vh;
	background: url('@/assets/images/component_assets/WaveSplash/mobile-wave.png') 0 0 / cover
		no-repeat fixed;
	pointer-events: none;
}
</style>
