"use client";

import { Typography } from "@material-tailwind/react";
import { Chip } from "@material-tailwind/react";
import { Fragment } from "react";
interface ITextComponent {
	formattedDate: string;
	textData: [];
	title: string;
	author: { name: string };
	tags: [];
}
const TextComponent = ({ formattedDate, textData, title, tags, author }: ITextComponent) => {
	return (
		<div className="flex flex-col gap-12 text-start">
			<h2>By {author.name}</h2> <span>{formattedDate}</span>
			<div className="py-8">
				<h1>{title}</h1>
			</div>
			<div className="flex flex-col ">
				{textData.map(({ type, children }: { type: string; children: [] }, index) => (
					<Fragment key={index}>
						{children.map(({ text }, index) => (
							<Typography variant={type} key={index} className=" text-start font-light text-gri-brand ">
								{text}
							</Typography>
						))}
					</Fragment>
				))}
			</div>
			<div className="flex w-full items-center justify-center">
				{tags.map(({ name }, index) => (
					<div key={index} className="flex gap-5">
						<Chip className="rounded-full" color="blue-gray" value={`# ${name}`} />
					</div>
				))}
			</div>
		</div>
	);
};

export default TextComponent;