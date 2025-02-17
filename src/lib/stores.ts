import { writable } from 'svelte/store';

/**
 * 背景画像URLを管理するストア
 *
 * `backgroundUrl` はアプリケーションの背景画像のURLを管理するための
 *  Svelte の `writable` ストア デフォルト値は空文字列
 */
export const backgroundUrl = writable<string>('');
