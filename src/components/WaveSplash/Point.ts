import waveUtils from './waveUtils';

const r = 2.15 * Math.cos(Math.PI); // waveAmplitudeFactor

class Point {
	x: number;
	y: number;
	targetX: number;
	targetY: number;
	oscillate: boolean;
	velX: number;
	velY: number;
	angle: number;
	speedUp: number;
	waveRange: number;
	spring: { friction: number; tension: number };
	index: number;
	count: number;

	constructor(pointIdx: number) {
		this.x = -40;
		this.y = -40;
		this.targetX = 0;
		this.targetY = 0;
		this.oscillate = !0;
		this.velX = 0;
		this.velY = 0;
		this.angle = 0;
		this.speedUp = 1.5;
		this.waveRange = 60;
		this.spring = {
			friction: 15,
			tension: waveUtils.POINT_TENSION_DEFAULT
		};
		this.index = pointIdx;
		this.spring.tension =
			waveUtils.POINT_TENSION_DEFAULT * Math.max(0.1, pointIdx / 7) +
			waveUtils.POINT_TENSION_DEFAULT;
		this.count = r * pointIdx;
	}

	updateStatic() {
		this.targetX = this.targetX + 30 * Math.cos(this.angle) * Math.sin(this.count);
		this.targetY = this.targetY + 30 * Math.sin(this.angle) * Math.sin(this.count);
		this.x = this.targetX;
		this.y = this.targetY;
	}

	update(iteration: number) {
		let e;
		let i;
		if (this.speedUp > 0) {
			this.speedUp = Math.max(0, this.speedUp - iteration);
			this.count += iteration * (10 * Math.min(this.speedUp, 1) + 0.4);
		} else {
			this.count += 0.4 * iteration;
		}
		e = waveUtils.applySpringForce(this.targetX, this.x, this.velX, this.spring);
		i = waveUtils.applySpringForce(this.targetY, this.y, this.velY, this.spring);
		this.velX += e * iteration;
		this.velY += i * iteration;

		if (this.oscillate) {
			const a = this.targetX + this.waveRange * Math.cos(this.angle) * Math.sin(this.count);
			const r = this.targetY + this.waveRange * Math.sin(this.angle) * Math.sin(this.count);
			e = waveUtils.applySpringForce(a, this.x, this.velX, this.spring);
			i = waveUtils.applySpringForce(r, this.y, this.velY, this.spring);
			this.velX += e * iteration;
			this.velY += i * iteration;
		}
		this.x += this.velX * iteration;
		this.y += this.velY * iteration;
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = '#fff';
		ctx.fillRect(this.x, this.y, 4, 4);
	}
}

export default Point;
