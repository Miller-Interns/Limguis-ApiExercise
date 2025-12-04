<template>
	<div
		class="home min-h-screen flex flex-col items-center justify-center bg-gray-50"
	>
		<div class="text-center space-y-6 p-8">
			<h1 class="title text-5xl font-bold text-gray-900 mb-4">
				Google Books Finder
			</h1>
			<p class="description text-lg text-gray-600 max-w-md mx-auto">
				Search and browse books using the Google Books API.
			</p>
			<Button
				@click="$router.push({ name: RouterName.Books })"
				class="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Browse Books
			</Button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import Button from 'primevue/button';
	import { RouterName } from '@/router';

	const $router = useRouter();
</script>
