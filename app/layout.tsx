import React from 'react'
import QueryProvider from "@/providers/query-providers";
import type { Metadata } from "next";
import { montserrat, poppins } from "@/utils/font";
import "./globals.css";
import { loadNavigationData } from '@/hooks/init/init';
import { BackgroundProvider } from '@/components/layout-partials/background-context';
import AppShell from '@/components/layout-partials/app-shell';
import Ads from '@/components/home-partials/advertisements/ads';
import Script from 'next/script';

export const metadata: Metadata = {
    metadataBase: new URL("https://dostv.ph"),
    title: "DOSTv: Science For The People",
    keywords: [
        "DOSTv",
        "DOST Philippines",
        "science Philippines",
        "technology Philippines",
        "innovation",
        "science for the people",
        "DOST programs",
        "Filipino science shows",
    ],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    description:
        "DOSTV brings science closer to every Filipino. It showcases programs, stories, and innovations from the Department of Science and Technology.",
    openGraph: {
        title: "DOSTv",
        description:
            "DOSTV brings science closer to every Filipino. It showcases programs, stories, and innovations from the Department of Science and Technology.",
        images: [
            {
                url: "/storage/images/logos/dostv.png",
                width: 1200,
                height: 630,
                alt: "DOSTV Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "DOSTv",
        description:
            "DOSTV brings science closer to every Filipino.",
        images: ["/storage/images/logos/dostv.png"],
    },
    icons: {
        icon: "/storage/images/logos/logo.png",
    },
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const mounts = await loadNavigationData();
    return (
        <html lang="en" className={`${montserrat.variable} ${poppins.variable}`}>
            <body className="h-screen max-w-7xl overflow-hidden font-montserrat">
                <QueryProvider>
                    <Ads ads={mounts.advertisements} />
                    <BackgroundProvider>
                        <div className="fixed inset-0 -z-20" style={{ background: "var(--app-bg)" }}>
                            <div className="absolute inset-0" style={{ background: "var(--app-radial)" }} />
                        </div>
                        <div
                            className="relative z-10 h-screen w-screen backdrop-blur-sm border"
                            style={{
                                background: "var(--shell-bg)",
                                borderColor: "var(--shell-border)",
                            }}
                        >
                            <AppShell mounts={mounts}>
                                {children}
                            </AppShell>
                        </div>
                    </BackgroundProvider>
                </QueryProvider>

                <Script id="smicos-token" strategy="afterInteractive">
                    {` window.__pb_access_token = "6ab75e3f-ecbd-44e5-b720-e9fdf394452c";`}
                </Script>
                <Script id="smicos-widget" strategy="afterInteractive">
                    {`(function() { const div = document.createElement('div'); 
                        div.id = 'PurpleBugIncSmicosWidget';
                        document.body.append(div);

                        const stylesheet = document.createElement('link'); 
                        stylesheet.rel = 'stylesheet';
                        stylesheet.href = 'https://app.smicos.com/widget/index.css';
                        document.head.append(stylesheet);

                        const script = document.createElement('script'); 
                        script.type = 'text/javascript'; 
                        script.defer = true;
                        script.src = 'https://app.smicos.com/widget/index.js';
                        document.head.append(script);
                        })();
                    `}
                </Script>
            </body>
        </html>
    )
}
