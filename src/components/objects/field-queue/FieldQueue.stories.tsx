import { Meta } from "@storybook/react";
import { FieldQueue } from "./FieldQueue";

const meta: Meta<typeof FieldQueue> = {
    component: FieldQueue,
    argTypes: {
        red: {
        control: {
            type: 'array'
        }
        },
        blue: {
        control: {
            type: 'array'
        }
        },
        title: {
        control: {
            type: 'text'
        }
        }
    }
}

export default meta

export const Primary = {
    args: {
        red: ['127C', '54321Z'],
        blue: ['5090X', '5090Z'],
        title: 'Qualification Match 27'
    }
}