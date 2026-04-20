<template>
	<div v-if="reducedMotion" class="fallbackImage" :class="{ 'visible': isVisible }"></div>
	<canvas v-else class="canvas" ref="lefunky" />
</template>

<script lang="ts">
import Blobs from './Blobs';
import Particles from './Particles';
import Wave from './Wave';
import waveUtils from './waveUtils';

type WaveChild = {
	update(iteration: any): void;
	fill(): void;
	terminate(): void;
	initialize(): void;
	render(context: CanvasRenderingContext2D): void;
}

let children: WaveChild[] = [];

export default {
	name: 'WaveAnimation',
	props: {
		waveState: Number
	},
	data: (vm): {
		canvas: null | HTMLCanvasElement,
		canvasContext: null | CanvasRenderingContext2D,
		width: number,
		height: number,
		ratio: number,
		_lastTick: number,
		_isPlaying: boolean,
		_reqAnimId: null | number,
		wave: Wave,
		reducedMotion: boolean,
		_pauseTimeout: number | NodeJS.Timeout | undefined
	} => ({
		canvas: null,
		canvasContext: null,
		width: 0,
		height: 0,
		// children: [],
		ratio: 0,
		// eslint-disable-next-line vue/no-reserved-keys
		_lastTick: 0,
		// eslint-disable-next-line vue/no-reserved-keys
		_isPlaying: false,
		// eslint-disable-next-line vue/no-reserved-keys
		_reqAnimId: null,

		// @ts-expect-error
		wave: new Wave(vm.updateWaveState), // wave class
		// children: [
		// 	new Blobs(),
		// 	new Particles(),
		// 	vm.wave
		// ],

		reducedMotion: false,

		// eslint-disable-next-line vue/no-reserved-keys
		_pauseTimeout: undefined
	}),
	computed: {
		isVisible() {
			return this.waveState! >= waveUtils.WaveStates.ENTERED; // WaveState is never undefined! INITIAL = 0
		}
	},
	methods: {
		setCanvas() {
			const el = this.$refs.lefunky as HTMLCanvasElement;
			if (null != el) {
				this.canvas = el;
				this.canvasContext = this.canvas.getContext('2d');
				const deviceRatio = window.devicePixelRatio || 1;
				// Expeting error because TS does not recognize any of the backingStorePixelRatios as valid.
				// @ts-expect-error
				const backingStoreRatio = this.canvasContext.webkitBackingStorePixelRatio || // @ts-expect-error
					this.canvasContext.mozBackingStorePixelRatio || // @ts-expect-error
					this.canvasContext.msBackingStorePixelRatio || // @ts-expect-error
					this.canvasContext.oBackingStorePixelRatio || // @ts-expect-error
					this.canvasContext.backingStorePixelRatio ||
					1;

				this.ratio = deviceRatio / backingStoreRatio;
				this.resizeCanvas();
			}
		},
		resizeCanvas() {
			this.width = window.innerWidth;
			this.height = window.innerHeight;

			if (this.canvas != null && this.canvasContext != null) {
				this.canvas.width = this.width * this.ratio;
				this.canvas.height = this.height * this.ratio;
				this.canvas.style.width = this.width + 'px';
				this.canvas.style.height = this.height + 'px';
				this.canvasContext.scale(this.ratio, this.ratio);
			}

			this.width <= 485 ? this.pause() : this.play(); // 485 again from cssfunc
			this.wave.resizeWave();
			this.renderAnimation();
		},
		handleVisibilityChange() {
			document.hidden ? this.delayedPause() : this.play();
		},
		play() {
			clearTimeout(this._pauseTimeout);
			this._isPlaying || ((this._isPlaying = true), this.run());
		},
		pause() {
			clearTimeout(this._pauseTimeout);
			this._isPlaying = false;
			window.cancelAnimationFrame(this._reqAnimId!);
			this._reqAnimId = null;
			this.advanceTransitionalState();
		},
		delayedPause() {
			clearTimeout(this._pauseTimeout);
			this._pauseTimeout = setTimeout(this.pause, 4e3);
		},
		updateWaveState(e: number) { // Todo this needs to become keyof wavestate
			// this.props.updateWaveState(e);
			// this.dummywavestate = e;
			console.log('emits updatewavestate with val', e);
			this.$emit('updateWaveState', e);
		},
		handleWaveEmphasize() {
			this.wave.emphasize();
		},
		run() {
			if (this._isPlaying) {
				if (0 === this._lastTick) {
					this._lastTick = Date.now();
					this._reqAnimId = requestAnimationFrame(this.run);
				} else {
					const now = Date.now();

					for (
						// remainingTime represents the time elapsed between animation frames. It is calculated as the difference between
						// the current time (obtained using Date.now()) and the time of the previous frame (this._lastTick).
						// The value is divided by 1e3 (1000) to convert it from milliseconds to seconds. It is also
						// limited to a maximum value of 1/120 * 8 (or 1/15) seconds using Math.min to prevent large time
						// gaps between frames. This ensures that the animation progresses smoothly even if there are delays or hiccups in rendering.
						// gpt
						let remainingTime = Math.min((now - this._lastTick) / 1e3, 1 / 120 * 8);
						remainingTime > 0;
					) {
						// iterationInterval represents the time interval for each iteration within the loop.
						// It is set to either 'elapsed' or a maximum value of 1/120 seconds, whichever is smaller.
						// This value ensures that each iteration of the loop updates the animation by a consistent amount of time.
						// By dividing the animation into smaller intervals, it allows for finer control and smoother animation transitions.
						// gpt
						const deltaTime = remainingTime < 1 / 120 ? remainingTime : 1 / 120;
						this.updateAnimation(deltaTime);
						remainingTime -= deltaTime;
					}
					this.renderAnimation();
					this._lastTick = now;
					this._reqAnimId = requestAnimationFrame(this.run);
				}
			}
		},
		initialize() {
			console.log(children);
			children.forEach(function(child) {
				return child.initialize();
			});
			this.bindEvents();
			this.resizeCanvas();
			if (document.hidden) {
				this.delayedPause();
			}
		},
		terminate() {
			this.pause();
			this.unbindEvents();
			children.forEach(function(child) {
				return child.terminate();
			});
		},
		bindEvents() {
			window.addEventListener('resize', this.resizeCanvas, false);
			window.addEventListener('blur', this.delayedPause, false);
			window.addEventListener('focus', this.play, false);
			document.addEventListener('visibilitychange', this.handleVisibilityChange, false);
		},
		unbindEvents() {
			window.removeEventListener('resize', this.resizeCanvas, false);
			window.removeEventListener('blur', this.delayedPause, false);
			window.removeEventListener('focus', this.play, false);
			document.removeEventListener('visibilitychange', this.handleVisibilityChange, false);
		},
		advanceTransitionalState() {
			const e = this.waveState;
			if (e === waveUtils.WaveStates.INITIAL || e === waveUtils.WaveStates.FILLING) {
				this.updateWaveState(e + 1);
			}
		},
		waveFill() {
			if (this._isPlaying) {
				children.forEach(function(child) {
					return child.fill();
				});
			} else {
				this.updateWaveState(waveUtils.WaveStates.FILLED);
			}
		},
		updateAnimation(iteration: number) { // this is what i assume to be a wavestate // this is not the wave state!
			children.forEach(function(child) {
				return child.update(iteration);
			});
		},
		renderAnimation() {
			const ctx = this.canvasContext;
			const PRIMARY_DARK_630 = '#2f3136';
			if (ctx != null) {
				ctx.fillStyle = PRIMARY_DARK_630;
				ctx.fillRect(0, 0, this.width, this.height);
				children.forEach(function(child) {
					return child.render(ctx);
				});
			}
		}
	},
	watch: {
		waveState: {
			handler(newState, oldState) {
				if (newState === waveUtils.WaveStates.FILLING && newState !== oldState) {
					this.waveFill();
				}
			},
			immediate: true
		}
	},
	mounted() {
		this.setCanvas();
		children = [
			new Blobs(),
			new Particles(),
			this.wave
		];
		this.initialize();
	},
	beforeUnmount() {
		this.terminate();
	}
};
</script>

<style scoped>
.canvas {
	-webkit-transform: translateZ(0);
	transform: translateZ(0);
}

.canvas,
.fallbackImage {
	position: fixed;
	top: 0;
	left: 0;
	pointer-events: none;
}

.fallbackImage {
	width: 100%;
	height: 85%;
	min-width: 780px;
	min-height: 780px;
	max-width: 1000px;
	max-height: 1000px;
	background: url('@/assets/images/component_assets/WaveSplash/wave_fallback.png') 0 0 / contain
		no-repeat;
	border: none;
	opacity: 0;
	-webkit-transition: opacity 0.4s ease;
	transition: opacity 0.4s ease;
}

.visible {
	opacity: 1;
}
</style>
