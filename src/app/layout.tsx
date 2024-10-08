import "~/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ReactQueryClientProvider } from "./providers/reactQueryClientProvider";
import Body from "./components/Body";

export const metadata: Metadata = {
  title: "CAT",
  description: "Catastrophic Apocalypse Tracker",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ReactQueryClientProvider>
          <MantineProvider defaultColorScheme="dark">
            <Notifications />
            <Body>{children}</Body>
          </MantineProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
