<template>
	<div class="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="bg-white rounded-lg shadow-sm p-12 text-center">
				<h1 class="text-5xl font-bold text-gray-900 mb-6">BookHub</h1>
				<p class="text-lg text-gray-600 max-w-md mx-auto mb-4">
					Discover, explore, and download books with detailed information,
					related works, and multiple editions all in one place.
				</p>
				<Button @click="$router.push({ name: RouterName.Books })">
					Browse Books
				</Button>

				<p class="text-xs text-gray-500 mt-10">Powered by Google Books API</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import Button from 'primevue/button';
	import { RouterName } from '@/router';

	const $router = useRouter();
</script>
