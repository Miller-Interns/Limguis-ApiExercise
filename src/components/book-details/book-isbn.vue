<template>
	<div
		v-if="industryIdentifiers && industryIdentifiers.length > 0"
		class="mt-8 border-t border-gray-300 pt-8"
	>
		<h2 class="mb-4 text-2xl text-black font-medium">ISBN</h2>
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
</template>

<script setup lang="ts">
	import type { IndustryIdentifier } from '@/types';

	defineProps<{
		industryIdentifiers?: IndustryIdentifier[];
	}>();
</script>
