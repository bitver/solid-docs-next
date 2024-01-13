import { Alert } from "@kobalte/core";
import { Icon } from "solid-heroicons";
import { mergeProps, type JSXElement, Show } from "solid-js";
import {
	lightBulb,
	exclamationCircle,
	puzzlePiece,
	bookOpen,
} from "solid-heroicons/solid";

const styles = {
	info: {
		container:
			"bg-emerald-500/30 border-emerald-500 dark:border-emerald-400 dark:bg-emerald-800/20 dark:border-emerald-900",
		title: "text-emerald-900 dark:text-emerald-300",
	},
	tip: {
		container:
			"bg-violet-800/70 border-violet-700 dark:border-violet-400 dark:bg-violet-800/10 dark:border-violet-900",
		title: "text-violet-900 dark:text-violet-300",
	},
	advanced: {
		container:
			"bg-sky-400/40 border-sky-600 dark:border-sky-400 dark:bg-sky-400/20 dark:border-sky-600",
		title: "text-sky-700 dark:text-sky-300",
	},
	caution: {
		container:
			"bg-amber-400/40 border-amber-600 dark:border-amber-400 dark:bg-amber-400/20 dark:border-amber-600",
		title: "text-amber-900 dark:text-amber-400",
	},
};

const icons = {
	tip: (props: { class?: string }) => (
		<Icon
			path={lightBulb}
			class={`${props.class} fill-violet-500 dark:fill-violet-300`}
		/>
	),
	info: (props: { class?: string }) => (
		<Icon
			path={bookOpen}
			class={`${props.class} fill-emerald-800 dark:fill-emerald-300`}
		/>
	),
	advanced: (props: { class?: string }) => (
		<Icon
			path={puzzlePiece}
			class={`${props.class} fill-sky-700 dark:fill-sky-300`}
		/>
	),
	caution: (props: { class?: string }) => (
		<Icon
			path={exclamationCircle}
			class={`${props.class} fill-amber-500 dark:fill-amber-400`}
		/>
	),
};

export type CalloutProps = {
	title?: string;
	children: JSXElement;
	type?: keyof typeof styles;
};

export function Callout(props: CalloutProps) {
	const mergedProps = mergeProps(
		{ type: "info" as keyof typeof styles },
		props
	);

	let IconComponent = icons[mergedProps.type];

	return (
		<Alert.Root
			class={`my-6 rounded-3xl flex p-4 border w-full ${
				styles[mergedProps.type].container
			}`}
		>
			<IconComponent class={`h-6 w-8 pt-1 flex-none`} />
			<div class={`m-0 pb-1 px-4 w-full ${styles[mergedProps.type].title}`}>
				<Show
					when={props.title}
					fallback={
						<span class="capitalize font-semibold text-xl">
							{props.type || "Info"}:{" "}
						</span>
					}
				>
					<span class="font-semibold text-xl">{mergedProps.title}</span>
				</Show>
				<div class="dark:prose-invert prose pr-7 [&>*:first-child]:mt-1">
					{mergedProps.children}
				</div>
			</div>
		</Alert.Root>
	);
}
