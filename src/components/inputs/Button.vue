<template>
	<button class="funky_button" :class="{ 'right_margin': right_margin, 'has_shine': has_shine }" :disabled="is_disabled">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

defineProps<{
	right_margin?: boolean;
	has_shine?: boolean;
	is_disabled?: boolean;
	icon?: FunctionalComponent; // TODO unit test icons when we start using that
}>();
</script>

<style scoped>
.funky_button {
	display: inline-block;
	position: relative;
	/* vertical-align: top; */
	margin: 0;
	border: 0;
	outline: 0;
	padding: 0px 15px;
	font-size: 16px;
	font-weight: 400;
	line-height: 40px;
	height: 40px;
	text-align: center;
	white-space: nowrap;
	color: #fff;
	-ms-touch-action: manipulation;
	touch-action: manipulation;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	border-radius: 0.5rem;
	/* width: 100%; */
	width: auto;

	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.funky_button:focus,
.funky_button:hover,
.funky_button:active {
	outline: 0;
}

.funky_button:hover {
	background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
}

.funky_button:active {
	background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
}

/* Material icons */
.material-icons {
	display: inline-block;
	vertical-align: top;
	line-height: inherit;
	font-size: inherit;
}

button {
	appearance: button;
	-webkit-appearance: button;
	text-transform: none;
	font-family: inherit;
	line-height: inherit;
}

button:not(:disabled) {
	cursor: pointer;
}

button:disabled {
	background-color: grey !important;
	cursor: not-allowed;
}

.right_margin {
	margin-right: 0.625em;
}
</style>
