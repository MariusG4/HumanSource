import { Button, Typography } from "@material-tailwind/react";

import { useRouter } from "next/navigation";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoDocumentAttachOutline } from "react-icons/io5";

interface ICasetaServicii {
	titlu: string;
	descriere: string;
	textButon: string;
	icon: string;
	href: string;
	params: { lang: string; country: string };
}

const CasetaServicii = ({ titlu, descriere, textButon, icon, href, params }: ICasetaServicii) => {
	const router = useRouter();
	return (
		<div
			className="group container flex  w-full max-w-[500px]  flex-col items-center justify-between gap-4 rounded-[10px] bg-alb-site px-4 py-8  text-center transition-all duration-300 hover:drop-shadow-xl md:h-[335px]  "
			id="caseta-servicii"
		>
			<div className="flex h-1/6 w-full items-center justify-center text-rosu-brand">
				{icon === "leasing" && <HiOutlineUserGroup className="h-8 w-8" />}
				{icon === "payroll" && <IoDocumentAttachOutline className="h-8 w-8" />}
				{icon === "recrutare" && <AiOutlineUsergroupAdd className="h-8 w-8" />}
			</div>
			<Typography variant="h3" className=" font-normal   text-gri-brand">
				{titlu}
			</Typography>
			<Typography variant="paragraph" className=" h-3/6 font-light text-gri-brand opacity-60">
				{descriere}
			</Typography>
			<div className="h-1/6">
				<Button
					onClick={() => router.push(`${params.lang}/${href}`)}
					className="rounded-[8px] border border-alb-site bg-transparent px-6 py-4 text-[#B21E23] shadow-none transition-all   duration-500 
					  hover:shadow-none group-hover:border-rosu-brand
			"
				>
					<Typography variant="paragraph" className="font-bold normal-case ">
						{textButon}
					</Typography>
				</Button>
			</div>
		</div>
	);
};

export default CasetaServicii;
