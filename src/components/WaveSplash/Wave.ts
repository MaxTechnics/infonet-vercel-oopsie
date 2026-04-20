import Point from './Point';
import waveUtils from './waveUtils';

function d(t: number, e: number, i: number, n: number) { // calculatePoints?
	return e * (i / n) + t;
}

function c() { // calculateRadius
	return Math.min(
		Math.max(
			Math.min(0.8 * window.innerWidth, 0.8 * window.innerHeight),
			waveUtils.MIN_RADIUS
		),
		waveUtils.MAX_RADIUS
	);
}

class Wave {
	points: Point[];
	hasEntered: boolean;
	isFilling: boolean;
	_resizeWave: () => void;
	resizeWave: () => void;
	updateWaveState: (state: number) => void;

	constructor(waveStateFunc: (state: number) => void) { // state should become keyof wavestate
		this.points = [];
		this.hasEntered = false;
		this.isFilling = false;
		this._resizeWave = function() {
			const t = c();
			this.points.forEach(function(e, i) {
				let n = t * Math.cos(waveUtils.TWO_PI * d(0, 0.25, i, 15)) - 40;
				let a = t * Math.sin(waveUtils.TWO_PI * d(0, 0.25, i, 15)) - 40;

				0 !== i ? (a += waveUtils.randomNumber(0, 30) - 15) : (n += waveUtils.randomNumber(0, 30) - 15);
				e.targetX = n;
				e.targetY = a;
				e.angle = Math.atan2(a, n);
			});
		};
		// this.resizeWave = this.resizeWave = (0, n.default)(this._resizeWave, 200)
		this.resizeWave = this.resizeWave = this._resizeWave; // this is probably 200ms debounced
		this.updateWaveState = waveStateFunc;


		for (let a = 0; a <= 15; a++) {
			this.points.push(
				new Point(Math.floor(7.5 - Math.floor(Math.abs(a - 7.5))))
			);
		}
	}

	initialize() {
		this._resizeWave();
	}

	emphasize() {
		this.points.forEach(function(t) {
			return (t.speedUp = 1);
		});
	}

	terminate() {
		this.points = [];
	}

	update(iteration: number) { // timing point i assume
		if (0 !== this.points.length) {
			this.points.forEach(function(pt) {
				return pt.update(Math.min(iteration, 1 / 60));
			});

			if (!this.hasEntered) {
				if (this.points[0].x > 485) {
					this.hasEntered = true;
					this.updateWaveState(waveUtils.WaveStates.ENTERED);
				}
			}

			if (this.isFilling && this.points[0].x > this.points[0].targetX) {
				this.isFilling = false;
				this.updateWaveState(waveUtils.WaveStates.FILLED);
			}
		}
	}

	/**
	 * @param {CanvasRenderingContext2D} lething
	 */
	render(lething: CanvasRenderingContext2D) {
		if (0 !== this.points.length) {
			const points = this.points;
			const firstPoint = points[0];
			const remainingPoints = points.slice(1);
			lething.save();
			lething.beginPath();
			lething.moveTo(firstPoint.x, firstPoint.y);
			remainingPoints.forEach(function(pt, idx) {
				if (null == remainingPoints[idx + 1]) lething.quadraticCurveTo(pt.x, pt.y, pt.x, pt.y);
				else {
					const a = (pt.x + remainingPoints[idx + 1].x) / 2;
					const r = (pt.y + remainingPoints[idx + 1].y) / 2;
					lething.quadraticCurveTo(pt.x, pt.y, a, r);
				}
			});
			lething.lineTo(0, 0);
			lething.closePath();
			lething.fillStyle = '#000';
			lething.globalCompositeOperation = 'destination-in';
			lething.fill();
			lething.restore();
		}
	}

	fill() {
		const that = this;
		const e = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight) + 100;
		const i = c() - 140;
		const n = function(t: Point, e: number, idx: number, n: boolean) { // e is some kind of amplitude
			t.targetX = e * Math.cos(waveUtils.TWO_PI * d(0, 0.25, idx, 15)) - 40;
			t.targetY = e * Math.sin(waveUtils.TWO_PI * d(0, 0.25, idx, 15)) - 40;
			if (n) { // this speeds up the wave when it's pulled in before it bursts to fullscreen
				t.targetX += waveUtils.randomNumber(0, 30) - 15;
				t.targetY += waveUtils.randomNumber(0, 30) - 15;
				t.speedUp = 3;
				t.spring.tension = waveUtils.POINT_TENSION_DEFAULT * Math.random() * 0.5 + waveUtils.POINT_TENSION_DEFAULT;
			}
		};
		this.points.forEach(function(pt, idx) {
			return n(pt, i, idx, true);
		});

		setTimeout(function() {
			that.points.forEach(function(t, i) {
				n(t, e, i, false);
				const a = 1 - t.index / 7.5;
				t.spring.friction += t.spring.friction + t.spring.friction * a;
				t.spring.tension = 0.7 * waveUtils.POINT_TENSION_DEFAULT + 80 * Math.random();
				t.waveRange = 2 * t.waveRange;
			});
			that.isFilling = true;
			that.updateWaveState(waveUtils.WaveStates.FILLING);
		}, 250);
	}
}

export default Wave;
