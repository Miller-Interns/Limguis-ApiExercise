<template>
	<div class="mt-8 border-t border-gray-300 pt-8">
		<h2 class="mb-4 text-2xl text-black font-medium">ISBN</h2>
		<div v-if="hasIdentifiers">
			<ul class="list-none p-0">
				<li
					v-for="identifier in industryIdentifiers"
					:key="identifier.type"
					class="mb-2 text-gray-600 text-sm"
				>
					{{ identifier.type }}: {{ identifier.identifier }}
				</li>
			</ul>
		</div>
		<div v-else class="text-center py-8">
			<svg
				class="mx-auto h-12 w-12 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
				/>
			</svg>
			<h3 class="mt-2 text-sm font-medium text-gray-900">
				No ISBN Information Available
			</h3>
			<p class="mt-1 text-sm text-gray-500">
				This book does not have ISBN information provided.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import type { IndustryIdentifier } from '@/types';

	const props = defineProps<{
		industryIdentifiers?: IndustryIdentifier[];
	}>();

	const hasIdentifiers = computed(
		() => props.industryIdentifiers && props.industryIdentifiers.length > 0
	);
</script>
