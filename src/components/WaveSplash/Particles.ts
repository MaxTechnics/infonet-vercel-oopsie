import Particle from './Particle';
import Wind from './Wind';

class Particles {
	particles: Particle[];
	wind: Wind;
	alpha: number;
	isFilled: boolean;
	loadInTimer: NodeJS.Timeout | null;

	constructor() {
		this.particles = [];
		this.wind = new Wind();
		this.alpha = 0;
		this.isFilled = !1;
		this.loadInTimer = null;
	}

	initialize() {
		const that = this;
		this.particles = [];
		this.wind.initialize();
		this.loadInTimer = setTimeout(function() {
			for (let e = 0; e < 75; e++) that.particles.push(new Particle());
		}, 250);
	}

	terminate() {
		this.particles = [];
		this.wind.terminate();
		if (null != this.loadInTimer) clearTimeout(this.loadInTimer);
	}

	update(iteration: number) {
		const that = this;
		if (this.particles.length !== 0) {
			if (!this.isFilled && this.alpha < 1) {
				this.alpha = Math.min(1, this.alpha + iteration);
			} else if (this.isFilled && this.alpha > 0) {
				this.alpha = Math.max(0, this.alpha - 3 * iteration);
			}
			this.wind.update();
			this.particles.forEach(function(particle) {
				return particle.update(
					10 * that.wind.forceX * iteration,
					10 * Math.min(that.wind.forceY, -0.001) * iteration - 0.1
				);
			});
		}
	}

	render(ctx: CanvasRenderingContext2D) {
		const e = this;
		if (0 !== this.particles.length) {
			ctx.save();
			ctx.globalCompositeOperation = 'source-atop';
			this.particles.forEach(function(particle) {
				return particle.render(ctx, e.alpha);
			});
			ctx.restore();
		}
	}

	fill() {
		this.isFilled = true;
	}
}

export default Particles;
