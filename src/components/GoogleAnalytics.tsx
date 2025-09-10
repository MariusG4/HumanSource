'use client';

import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script 
        src="https://www.googletagmanager.com/gtag/js?id=G-0JCCSY2M2D"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0JCCSY2M2D');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;