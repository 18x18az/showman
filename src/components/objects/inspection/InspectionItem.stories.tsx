import { Meta, StoryObj } from "@storybook/react";
import { InspectionItem } from "./InspectionItem";

const meta: Meta<typeof InspectionItem> = {
    component: InspectionItem,
    argTypes: {
        description: {
            control: {
                type: "text",
            },
        },
        rules: {
            control: {
                type: "array",
            },
        },
    }
}

export default meta

type Story = StoryObj<typeof InspectionItem>

export const Primary: Story = {
    args: {
        description: "None of the electronics are from the V5 Beta, VEXplorer, VEXpro, VEX-RCR, VEX IQ, VEX Cortex, or VEX Robotics by Hexbug. This includes the EXP Brain, EXP Controller, EXP battery, and VEX 2-wire Motors.",
        rules: ["R6", "R12"],
    }
}