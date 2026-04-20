<template>
	<Transition>
		<div class='background_container' v-if="show">
			<div style="transform: skewX(-10deg)">
				<div class="raindrop" v-for="(item, idx) in Array(drops).fill(null)" :key="idx" :style="`left: ${2000 * Math.random()}px; animation-delay: -${idx / drops * 1.1}s`"></div>
			</div>
			<div style="transform: skewX(-15deg); opacity: 0.5">
				<div class="raindrop" v-for="(item, idx) in Array(drops).fill(null)" :key="idx" :style="`left: ${2000 * Math.random()}px; animation-delay: -${idx / drops * 1.1}s`"></div>
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
defineProps({
	drops: {
		type: Number,
		default: 24
	},
	show: Boolean
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
	transition: all 1s cubic-bezier(0.4, 0.14, 0.3, 1); /* Carbon motion expressive */
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.background_container {
	-ms-flex-direction: column;
	-webkit-flex-direction: column;
	background: linear-gradient(
		to top,
		rgba(22, 29, 69, 0.4) 0,
		rgba(0, 0, 0, 0.5) 100%
	);
	bottom: 0;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	flex-direction: column;
	left: 0;
	position: fixed;
	right: 0;
	top: 0;

	overflow: hidden;
}

@keyframes rainfall {
	from {
		transform: translateY(-150px);
	}
	to {
		transform: translateY(3000px);
	}
}

.raindrop {
	animation: rainfall 1.1s linear infinite;
	background-color: rgba(255, 255, 255, 0.15);
	height: 150px;
	position: fixed;
	width: 1.5px;
}
</style>
