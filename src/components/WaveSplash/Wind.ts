function calculateForce(current: number, previous: number) {
	return Math.max(Math.min((current - previous) / 30, 1), -1);
}

class Wind {
	resistance: number;
	px: number;
	py: number;
	x: number;
	y: number;
	forceX: number;
	forceY: number;
	handleMouseMove: (e: MouseEvent) => void;

	constructor() {
		this.resistance = 0.98;
		this.px = 0;
		this.py = 0;
		this.x = 0;
		this.y = 0;
		this.forceX = 0;
		this.forceY = 0;
		this.handleMouseMove = (e) => {
			this.x = e.clientX;
			this.y = e.clientY;
		};
	}

	initialize() {
		window.addEventListener('mousemove', this.handleMouseMove);
	}

	terminate() {
		window.removeEventListener('mousemove', this.handleMouseMove);
	}

	update() {
		if (this.x !== this.px && this.y !== this.py) {
			this.forceX += calculateForce(this.x, this.px);
			this.forceY += calculateForce(this.y, this.py);
			this.px = this.x;
			this.py = this.y;
		}

		if (this.forceX !== 0) {
			this.forceX = this.forceX * this.resistance;
		}
		if (this.forceY !== 0) {
			this.forceY = this.forceY * this.resistance;
		}
	}

	render() { }
}

export default Wind;
