"use client";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Link from "next/link";

const BreadComponent = ({ params }: { params: { lang: string; slug: string } }) => {
	return (
		<Breadcrumbs>
			<Link className="text-gri-brand" href={`/${params.lang}`}>
				Home
			</Link>
			<Link className="text-gri-brand" href={`/${params.lang}/blog`}>
				Bloguri
			</Link>
			<Link className="text-red-600" href={`${params.lang}/blog/${params.slug}`}>
				{params.slug}
			</Link>
		</Breadcrumbs>
	);
};

export default BreadComponent;