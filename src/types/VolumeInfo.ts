import type { IndustryIdentifier } from './IndustryIdentifier';

export interface VolumeInfo {
	title: string;
	subtitle?: string;
	authors?: string[];
	description?: string;
	publishedDate?: string;
	pageCount?: number;
	categories?: string[];
	imageLinks?: {
		thumbnail: string;
	};
	industryIdentifiers?: IndustryIdentifier[];
}
