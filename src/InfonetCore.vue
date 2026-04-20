<template>
	<RouterView v-slot="{ Component }">
    	<template v-if="Component">
    		<Suspense timeout="100">
      			<component :is="Component" />
        	</Suspense>
        </template>
	</RouterView>
</template>
