<template>
	<div>
		<FancyImage :image_url="image" :make_visible="show" />
		<Rain :show="show" />
		 <WaveSplash ref="wave" class="wave" />
		<AuthLogo ref="auth_logo" />
		<div class="modal" ref="authbox">
			<div class="modal-container visible">
				<div class="pop-up__title">
					<span class="title" v-once>Infonet niet beschikbaar</span>
				</div>

				<div class="pop-up__subtitle">Door een cyberaanval op een van onze providers (Vercel) besloten we om Infonet tijdelijk offline te halen om voorzorgsmaatregelen te nemen. Infonet zal even niet beschikbaar zijn.</div>
				<div class="pop-up__subtitle">Onze excuses voor het ongemak</div>
				<!-- <Button class="loginButton" @click="teleport">
					<span class="loginText">Reload</span>
				</Button> -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import AuthLogo from '@/components/funkies/AuthLogo.vue';
import Button from '@/components/inputs/Button.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import FancyImage from '@/components/FancyImage.vue';
import image from '@/assets/images/seasonal_bg/fall.png';

import { useKeyModifier } from '@vueuse/core';
import { useMotion } from '@vueuse/motion';
import { useRoute, useRouter } from 'vue-router';
import WaveSplash from '@/components/WaveSplash/WaveSplash.vue';
import Rain from '@/components/funkies/Rain.vue';

const route = useRoute();
const router = useRouter();
const env = import.meta.env;


const auth_logo = ref<typeof AuthLogo>();
const authbox = ref<HTMLElement>();

const error = ref<string | null>(null);
const is_logging_in = ref(false);
const authbox_motion_instance = useMotion(authbox, {
	initial: {
		// scale: 1.05,
		scale: 1.15,
		opacity: 0,
		y: -70
	},
	enter: {
		scale: 1,
		opacity: 1,
		y: 0
	},
	leave: {
		scale: 1.02,
		opacity: 0,
		y: -50,
		transition: {
			duration: 75,
			delay: 100,
			ease: 'ease'
		}
	}
});

// Misc features
const show = ref(false);
const wave = ref<typeof WaveSplash>();
const d = async (time: number) => new Promise(r => setTimeout(r, time));

const teleport = async () => {
	if (wave.value!.$refs.waveAnim) wave.value!.$refs.waveAnim.wave.emphasize();
	await d(750);
	show.value = false;
	auth_logo.value!.motion_instance.leave(() => { });
	authbox_motion_instance.leave(() => { });
	wave.value!.transitionTo(window.location.toString());
	// setTimeout(() => {
	// 	window.location.reload();
	// }, 500);
};

onMounted(() => {
	show.value = true;

	setTimeout(() => {
		teleport();
	}, 30000)
});
</script>

<style scoped>
* {
	font-family: DMSans;
}

.modal {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: opacity 0.3s ease;
	display: flex;
	align-items: center;
	justify-content: center;
}

.modal-container {
	position: absolute;
	padding: 30px 40px;

	border: 1px solid rgba(255, 255, 255, 0.5);
	border-right: 1px solid rgba(255, 255, 255, 0.2);
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);

	overflow-y: auto;
	background-color: transparent;
	color: #dcddde;
	font-family: DMSans;
	width: 500px;
	border-radius: 1rem;
	display: flex;
	flex-direction: column;
	white-space: normal;
}

@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
	.modal-container {
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}
}

@media screen and (max-width: 570px) {
	.modal-container {
		width: 100%;
	}
}

.pop-up__title {
	margin-bottom: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.title {
	font-size: 24px;
	line-height: 30px;
	font-weight: 600;
}



.pop-up__subtitle {
	white-space: normal;
	margin-bottom: 20px;
	font-size: 16px;
	line-height: 20px;
	font-weight: 400;
}


.loginText {
	font-size: 16px;
	line-height: 24px;
	font-weight: 500;
}
</style>
