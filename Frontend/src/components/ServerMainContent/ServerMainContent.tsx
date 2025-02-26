import { ReactNode } from "react";
import ServerNavPanel from "../ServerNavPanel/ServerNavPanel";

export default function ServerMainContent({children}:{children:ReactNode}) {
  return (
    <>
    <ServerNavPanel/>
    {children}
    </>
  )
}
