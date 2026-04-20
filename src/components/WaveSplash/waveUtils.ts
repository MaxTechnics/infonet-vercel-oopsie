type WaveSpring = {
	tension: number;
	friction: number;
}

export default {
	NOOP: function() { },
	MIN_RADIUS: 780,
	MAX_RADIUS: 1e3,
	TWO_PI: 2 * Math.PI,
	POINT_TENSION_DEFAULT: 150,
	WaveStates: {
		INITIAL: 0,
		ENTERED: 1,
		FILLING: 2,
		FILLED: 3
	},
	randomNumber: (min: number, max: number) => {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
	applySpringForce: (target: number, position: number, velocity: number, spring: WaveSpring) => { // originally t, e, i, n(spring)
		return spring.tension * (target - position) - spring.friction * velocity;
	}
};
