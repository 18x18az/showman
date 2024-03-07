import { FormEventHandler } from "react";
import { Label } from "./label";
import { RadioGroupItem as BaseItem } from "./radio-group";

interface RadioGroupItemProps {
    label: string;
    value: string;
}

export function RadioGroupItem(props: RadioGroupItemProps) {
    return <div className="flex items-center space-x-2">
        <BaseItem id={props.value} value={props.value} />
        <Label htmlFor={props.value}>{props.label}</Label>
    </div>
}