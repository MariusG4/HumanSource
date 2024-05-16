"use client";
import { Avatar, Card, CardBody, CardHeader, Carousel, Typography, IconButton } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";
import TestimonialCard from "./testimonialCard";
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

	const [isHovered, setHovered] = useState(false);
const [stopped, setStoppedCarouselState] = useState(false);
return (
	<section className="container flex w-full flex-col items-center justify-center  px-6 py-24  md:gap-8 md:px-0 lg:mx-0  ">
		<Carousel
			autoplayDelay={3000}
			autoplay={stopped ? false : true}
			loop={true}
			transition={{ type: "spring", duration: 1 }}
			className="rounded-xl "
			navigation={() => <div></div>}
		>
			{testimonials.map((props, key) => (
				<div key={key} className="flex w-full justify-center">
					{" "}
					<TestimonialCard setStoppedCarouselState={setStoppedCarouselState} {...props} />
				</div>
			))}
		</Carousel>
	</section>
);
}

export default TestimonialSection;
