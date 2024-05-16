"use client";
import { Avatar, Card, CardBody, CardHeader, Carousel, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";
function Star() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
			<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
		</svg>
	);
}

function TestimonialCard({ img, rating, feedback, client, title }) {
	return (
		<Card color="transparent" shadow={false} className=" flex h-full p-8">
			<CardBody className="flex h-full flex-col justify-between !p-0">
				<div>
					<div className="mb-2 flex  items-start ">
						{[...Array(rating).keys()].map((el, key) => (
							<Star key={key} />
						))}
					</div>
					<Typography variant="paragraph" className="mb-2 text-sm font-bold text-gri-brand md:text-base">
						" {feedback} "
					</Typography>
				</div>
				<div className="">
					<Typography variant="lead" className="text-base font-medium text-gri-brand md:text-xl">
						&#8212; {client}
					</Typography>
					<Typography variant="paragraph" className="text-sm font-normal text-gri-brand  md:text-base">
						{title}
					</Typography>
				</div>
			</CardBody>
		</Card>
	);
}

export function TestimonialSection() {
	const testimonials = [
		{
			rating: 5,
			feedback:
				"În calitate de client al companiei Human Source timp de 4 ani, pot spune că serviciile și atenția la detalii care ne-au fost oferite sunt exemplare. Sfaturile pe care le primim sunt temeinice, actualizate și livrate cu cel mai înalt profesionalism. Experiența este rentabilă, iar spiritul de echipă al companiei ne-a permis să creștem și să folosim multitudinea de resurse umane oferite, toate cu asigurarea că suntem pe mâini bune.",
			client: "Alex",
			title: "Manager la Tech Solutions SRL",
			img: "https://images.unsplash.com/photo-1611042553365-9b101441c135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
		},
		{
			rating: 5,
			feedback:
				"Echipa Human Resource este un partener de încredere pentru FitPro Gym de mulți ani. Ne-au ajutat să ne documentăm procesele de resurse umane și să eficientizăm procesul de recrutare pentru a se potrivi cu creșterea continuă a companiei noastre. Considerăm echipa Human Source ca o extensie a companiei noastre și suntem siguri că relația noastră va fi una pe termen lung.",
			client: "Diana",
			title: "Director General la FitPro Gym",
			img: "https://images.unsplash.com/photo-1611042553365-9b101441c135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
		},
		{
			rating: 5,
			feedback:
				"Parteneriatul cu Human Source a fost benefic agenției noastre, oferind un mediu de lucru confortabil, sigur și sănătos pentru angajații noștri. Au depășit mereu cerințele noastre fiind întotdeauna disponibili cu o echipă pregătită, informată și care are în vedere toate interesele companiei noastre.",
			client: "Radu",
			title: "Manager HR la Media Solutions Group",
			img: "https://images.unsplash.com/photo-1611042553365-9b101441c135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80",
		},
		{
			rating: 4,
			feedback:
				"Colaborarea noastră cu Human Source ne-a permis să lucrăm la afacerea noastră fără grija procesului de recrutare. Putem spune că au pus în mișcare toate procesele de care am avut nevoie pentru a ne crește afacerea într-un timp record.",
			client: "Laura",
			title: "Antreprenor la NextGen Software Solutions",
			img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
		},
		{
			rating: 4,
			feedback:
				"Am avut plăcerea de a lucra exclusiv cu Human Source în ultimii 3 ani. Consider că Human Source dă dovadă de integritate crescută în această industrie. Procesul de recrutare este transparent și complet. Human Source ne-a ajutat întotdeauna să găsim potrivirea perfectă, fie din punct de vedere tehnic, fie din punct de vedere comportamental, astfel ajutându-ne să ne întregim echipa.",
			client: "Andrei",
			title: "CEO la Digital Dynamics Agency",
			img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMG1lbWJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
		},
		{
			rating: 5,
			feedback:
				"Experiența noastră de lucru cu Human Source a fost foarte pozitivă. Profesionalismul lor a fost neîntrerupt. Echipa excelează în selecția, identificarea și integrarea candidaților. Vă mulțumim că ați făcut din procesul de recrutare o experiență atât de plăcută.",
			client: "Ioana",
			title: "Manager HR la Bright Future Technologies",
			img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMG1lbWJlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
		},
	];

	const duplicatedTestimonials = [...testimonials, ...testimonials];
	const [isHovered, setHovered] = useState(false);
	console.log(isHovered);
	return (
		<section className="container flex w-full flex-col items-center  px-6  md:gap-8 md:px-0 lg:mx-0  ">
			<Carousel
				className="rounded-xl"
				navigation={({ setActiveIndex, activeIndex, length }) => (
					<div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
						{new Array(length).fill("").map((_, i) => (
							<span
								key={i}
								className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
									activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
								}`}
								onClick={() => setActiveIndex(i)}
							/>
						))}
					</div>
				)}
			>
				<img
					src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
					alt="image 1"
					className="h-full w-full object-cover"
				/>
				<img
					src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
					alt="image 2"
					className="h-full w-full object-cover"
				/>
				<img
					src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
					alt="image 3"
					className="h-full w-full object-cover"
				/>
			</Carousel>
			<div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2"></div>
			<div className="relative w-full overflow-hidden ">
				<motion.div
					className="flex px-8 py-8 lg:py-20 "
					animate={{
						x: ["-200%", "0%"],
						transition: {
							ease: "linear",
							duration: 40,
							repeat: Infinity,
						},
					}}
					whileHover={{ transition: { duration: 0 } }}
				></motion.div>
			</div>
		</section>
	);
}

export default TestimonialSection;
