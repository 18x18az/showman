import { Meta } from "@storybook/react";
import { AllianceIndicator } from "./AllianceIndicator";

const meta: Meta<typeof AllianceIndicator> = {
    component: AllianceIndicator,
    argTypes: {
        alliance: {
        control: {
            type: "select",
            options: ["red", "blue"],
        },
        },
        teams: {
        control: {
            type: "array",
        },
        },
    },
    };

export default meta;

export const VRC = {
    args: {
        alliance: "red",
        teams: ["127C", "6030J"],
    },
}

export const Blue = {
    args: {
        alliance: "blue",
        teams: ["5090X", "8800T"],
    }
}

export const VEXU = {
    args: {
        alliance: "red",
        teams: ["PYRO"],
    },
}