import blobimg from '@/assets/images/component_assets/WaveSplash/blobs.png';
import waveUtils from './waveUtils';

class Blobs {
	img: HTMLImageElement | null;
	loaded: boolean;
	isFilled: boolean;
	alpha: number;
	mx: number;
	my: number;
	x: number;
	y: number;
	velX: number;
	velY: number;
	targetX: number;
	targetY: number;
	spring: { friction: number; tension: number };
	handleMouseMove: (e: MouseEvent) => void;

	constructor() {
		this.img = null;
		this.loaded = false;
		this.isFilled = false;
		this.alpha = 0;
		this.mx = 0;
		this.my = 0;
		this.x = 0;
		this.y = 0;
		this.velX = 0;
		this.velY = 0;
		this.targetX = 40;
		this.targetY = 40;
		this.spring = { friction: 60, tension: 100 };
		this.handleMouseMove = (e) => {
			const i = e.clientX;
			const n = e.clientY;
			this.targetX = i / window.innerWidth * 20 + 20;
			this.targetY = n / window.innerWidth * 20 + 20;
		};
	}

	initialize() {
		const that = this;
		this.img = new Image();
		this.img.onload = function() {
			that.loaded = true;
		};
		// this.img.src = require('@/assets/images/Wave/blobs.png');
		this.img.src = blobimg;
		this.bind();
	}

	bind() {
		window.addEventListener('mousemove', this.handleMouseMove, false);
	}

	unbind() {
		window.removeEventListener('mousemove', this.handleMouseMove, false);
	}

	terminate() {
		this.img = null;
		this.loaded = false;
		this.isFilled = false;
		this.alpha = 0;
		this.unbind();
	}

	update(iteration: number) {
		if (this.loaded) {
			if (!this.isFilled && this.alpha < 1) {
				this.alpha = Math.min(1, this.alpha + iteration);
			} else if (this.isFilled && this.alpha > 0) {
				this.alpha = Math.max(0, this.alpha - 3 * iteration);
			}
			this.velX += waveUtils.applySpringForce(
				this.targetX,
				this.x,
				this.velX,
				this.spring
			) * iteration;
			this.velY += waveUtils.applySpringForce(
				this.targetY,
				this.y,
				this.velY,
				this.spring
			) * iteration;
			this.x += this.velX * iteration;
			this.y += this.velY * iteration;
		}
	}

	render(ctx: CanvasRenderingContext2D) {
		if (null != this.img && this.loaded) {
			ctx.save();
			ctx.globalCompositeOperation = 'source-atop';
			ctx.globalAlpha = this.alpha;
			ctx.drawImage(this.img, this.x + 20, this.y + 20);
			ctx.restore();
		}
	}

	fill() {
		this.isFilled = true;
	}
}

export default Blobs;
