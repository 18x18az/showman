import { Metadata } from "next"
import ControlPage from "./control"

export const metadata: Metadata = {
    title: 'Control'
  }

export default function Page (): JSX.Element {
    return <ControlPage />
}