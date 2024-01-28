'use client'
import { EmptyPost } from "@/utils/maestro"
import { Button } from "../../primitives/button/Button"
import { useState } from "react"

interface RestButtonProps {
    url: string
    text: string
    pendingText?: string
    className?: string
}

export default function RestButton(props: RestButtonProps): JSX.Element {
    const [pending, setPending] = useState(false)
    const [text, setText] = useState(props.text)

    async function handler() {
        setPending(true)
        if(props.pendingText) {
            setText(props.pendingText)
        }
        await EmptyPost(props.url)
        setText(props.text)
        setPending(false)
    }

    return <Button className={props.className} disabled={pending} onClick={() => {void handler()}}>{text}</Button>
}
