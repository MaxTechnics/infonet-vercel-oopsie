<template>
	<div style="height: 100%">
		<Suspense>
			<InfonetCore />
		</Suspense>
	</div>
</template>

<script setup lang="ts">
import InfonetCore from "@/InfonetCore.vue";
</script>

<style>
@use "@/assets/fonts/DMSans/DMSans" as *;

html,
body,
#app-mount {
	height: 100%;
}

body {
	margin: 0;
	/* Hard coding the dark background primary to remove light mode interference */
	background-color: #202225;
	scrollbar-width: thin;
	scrollbar-color: #4f545c transparent;
	font-family: DMSans;
}

@font-face {
	font-family: DMSans;
	font-weight: 400;
	src: url('@/assets/fonts/DMSans/DMSans-Regular.ttf') format('truetype');
}
@font-face {
	font-family: DMSans;
	font-weight: 400;
	font-style: italic;
	src: url('@/assets/fonts/DMSans/DMSans-Italic.ttf') format('truetype');
}
@font-face {
	font-family: DMSans;
	font-weight: 500;
	src: url('@/assets/fonts/DMSans/DMSans-Medium.ttf') format('truetype');
}
@font-face {
	font-family: DMSans;
	font-weight: 500;
	font-style: italic;
	src: url('@/assets/fonts/DMSans/DMSans-MediumItalic.ttf') format('truetype');
}
@font-face {
	font-family: DMSans;
	font-weight: 700;
	src: url('@/assets/fonts/DMSans/DMSans-Bold.ttf') format('truetype');
}
@font-face {
	font-family: DMSans;
	font-weight: 700;
	font-style: italic;
	src: url('@/assets/fonts/DMSans/DMSans-BoldItalic.ttf') format('truetype');
}

</style>
