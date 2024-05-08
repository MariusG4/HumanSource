"use client";
import { Avatar, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
function Star() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
			<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
		</svg>
	);
}

function TestimonialCard({ img, rating, feedback, client, title }) {
	return (
		<Card color="transparent" shadow={false} className="p-8">
			<CardHeader color="transparent" floated={false} shadow={false} className="!m-0 !mb-8">
				<Avatar src={img} alt={client} size="xxl" className="h-48 w-48" />
			</CardHeader>
			<CardBody className="!p-0">
				<div className="mb-2 flex items-center">
					{[...Array(rating).keys()].map((el, key) => (
						<Star key={key} />
					))}
				</div>
				<Typography variant="h4" color="blue-gray" className="mb-6 font-bold">
					{feedback}
				</Typography>
				<Typography variant="lead" color="blue-gray" className="font-medium">
					&#8212; {client}
				</Typography>
				<Typography color="gray" className="font-normal">
					{title}
				</Typography>
			</CardBody>
		</Card>
	);
}

export function TestimonialSection() {
	const testimonials = [
		{
			rating: 5,
			feedback: "The time is now for it to be okay to be great. People in this world shun people for being great.",
			client: "Renee Wells",
			title: "Product Designer, Quotient",
			img: "https://images.unsplash.com/photo-1611042553365-9b101441c135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
		},
		{
			rating: 5,
			feedback: "The time is now for it to be okay to be great. People in this world shun people for being great.",
			client: "Renee Wells",
			title: "Product Designer, Quotient",
			img: "https://images.unsplash.com/photo-1611042553365-9b101441c135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
		},
		{
			rating: 5,
			feedback: "The time is now for it to be okay to be great. People in this world shun people for being great.",
			client: "Renee Wells",
			title: "Product Designer, Quotient",
			img: "https://images.unsplash.com/photo-1611042553365-9b101441c135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
		},
		{
			rating: 4,
			feedback: "For being a bright color. For standing out. But the time is now to be okay to be the greatest you.",
			client: "Candice Wu",
			title: "Engineering Manager, Amazon",
			img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
		},
		{
			rating: 3,
			feedback: "Would you believe in what you believe in, if you were the only one who believed it?",
			client: "Olivia Rhye",
			title: "CEO & Founder, Quotient",
			img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMG1lbWJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
		},
		{
			rating: 3,
			feedback: "Would you believe in what you believe in, if you were the only one who believed it?",
			client: "Olivia Rhye",
			title: "CEO & Founder, Quotient",
			img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMG1lbWJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
		},
		{
			rating: 3,
			feedback: "Would you believe in what you believe in, if you were the only one who believed it?",
			client: "Olivia Rhye",
			title: "CEO & Founder, Quotient",
			img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMG1lbWJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
		},
		{
			rating: 3,
			feedback: "Would you believe in what you believe in, if you were the only one who believed it?",
			client: "Olivia Rhye",
			title: "CEO & Founder, Quotient",
			img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMG1lbWJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
		},
	];
	const slideWidth = 250 / testimonials.length;
	const duplicatedTestimonials = [...testimonials, ...testimonials];
	return (
		<div className="relative w-full overflow-hidden ">
			<motion.div
				className="flex px-8 py-8 lg:py-20 "
				animate={{
					x: ["-200%", "0%"],
					transition: {
						ease: "linear",
						duration: 44,
						repeat: Infinity,
					},
				}}
			>
				{duplicatedTestimonials.map((props, key) => (
					<div key={props.client} className="flex-shrink-0" style={{ width: `${slideWidth}%` }}>
						<TestimonialCard key={key} {...props} />
					</div>
				))}
			</motion.div>
		</div>
	);
}

export default TestimonialSection;
