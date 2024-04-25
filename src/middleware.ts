import { NextResponse, userAgent } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "i18n.config";

function getLocale(request: NextRequest): string | undefined {
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	// @ts-ignore locales are readonly
	const locales: string[] = i18n.locales;
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	const locale = matchLocale(languages, locales, i18n.defaultLocale);
	return locale;
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	);

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request);

		if (locale === i18n.defaultLocale) {
			return NextResponse.rewrite(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url));
		}

		return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, request.url));
	}
	  const url = request.nextUrl;
		const res = NextResponse.next();
		const { browser } = userAgent(request);
		const browserName = browser.name === browser.name ? browser.name : "undefined";

		request.nextUrl.searchParams.set("browser", browserName as string);
		// add the CORS headers to the response
		res.headers.append("Access-Control-Allow-Credentials", "true");
		res.headers.append("Access-Control-Allow-Origin", "https://backend.humansource.ro/api/graphql"); // replace this your actual origin
		res.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
		res.headers.append(
			"Access-Control-Allow-Headers",
			"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
		);

		return NextResponse.rewrite(url);
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
