import type {Metadata} from "next";
import "./globals.css";
export const metadata:Metadata={title:"LotClear — title packet readiness",description:"A fictional workflow for auditing used-car title packets against state-specific demo requirements."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
