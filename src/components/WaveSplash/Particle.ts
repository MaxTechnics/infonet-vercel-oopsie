import waveUtils from './waveUtils';

const particleColors = ['#7d8187', '#18191c', '#8fa2df', '#4f545c'];

class Particle {
	size: number;
	depth: number;
	positionMultiplier: number;
	color: string;
	offscreenX: number;
	offscreenY: number;
	x: number;
	y: number;

	constructor() {
		this.size = waveUtils.randomNumber(2, 3);
		this.depth = waveUtils.randomNumber(1, 4);
		this.positionMultiplier = this.depth / 4;
		this.color = particleColors[4 - this.depth];
		this.offscreenX = waveUtils.MAX_RADIUS + this.size;
		this.offscreenY = waveUtils.MAX_RADIUS + this.size;
		this.x = waveUtils.randomNumber(-this.size, this.offscreenX);
		this.y = waveUtils.randomNumber(-this.size, this.offscreenY);
	}

	checkBounds() {
		if (this.x > this.offscreenX) {
			this.x = -this.size;
		} else if (this.y > this.offscreenY) {
			this.y = -this.size;
		} else if (this.x < -this.size) {
			this.x = this.offscreenX;
		} else if (this.y < -this.size) {
			this.y = this.offscreenY;
		}
	}

	update(xAxis: number, yAxis: number) {
		this.checkBounds();
		this.y += yAxis * this.positionMultiplier;
		this.x += xAxis * this.positionMultiplier;
	}

	render(ctx: CanvasRenderingContext2D, alpha: number) {
		ctx.beginPath();
		ctx.globalAlpha = alpha * this.depth / 4;
		ctx.arc(this.x, this.y, this.size, 0, waveUtils.TWO_PI, true);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.globalAlpha = 1;
	}
}

export default Particle;
