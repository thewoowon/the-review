import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "THE REVIEW",
  openGraph: {
    title: "THE REVIEW - 독후감에 지친 당신을 위한, 리뷰의 리뷰",
    description: "팀 토로카의 작품, THE REVIEW",
    images: [
      {
        url: "https://thereview.club/opengraph-image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE REVIEW - 독후감에 지친 당신을 위한, 리뷰의 리뷰",
    description: "팀 토로카의 작품, THE REVIEW",
    images: ["https://thereview.club/opengraph-image"],
    creator: "@the_review",
  },
  metadataBase: new URL("https://thereview.club/"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth antialiased [font-feature-settings:'ss01']">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
