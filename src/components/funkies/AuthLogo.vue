<template>
	<a target='_blank' rel='noopener' class="logo logo-1" ref="auth_logo"></a>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMotion } from '@vueuse/motion';

const auth_logo = ref<HTMLElement>();

const motion_instance = useMotion(auth_logo, {
	initial: {
		y: -100,
		opacity: 0
	},
	enter: {
		y: 0,
		opacity: 1,
		transition: {
			delay: 500,
			stiffness: 350,
			damping: 20
		}
	},
	leave: {
		y: -100,
		opacity: 0
	}
});

defineExpose({ motion_instance });
</script>

<style scoped>
.logo {
	-webkit-box-flex: 0;
	-ms-flex: 0 0 auto;
	flex: 0 0 auto;
	width: 130px;
	height: 36px;
	background: url(@/assets/images/wordmark/Infonet_Wordmark_Caps_White.svg)
		no-repeat;
	background-size: contain;
}

.logo-1 {
	position: fixed;
	top: 24px;
	left: 50%;
	margin-left: -65px;
	margin-top: 0;
}

@media (min-width: 830px) {
	.logo-1 {
		position: fixed;
		top: 24px;
		left: 24px;
		margin: 0;
	}
}
</style>
