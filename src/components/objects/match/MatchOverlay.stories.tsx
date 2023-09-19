import { Meta } from "@storybook/react";
import { MatchOverlay } from "./MatchOverlay";

const meta: Meta<typeof MatchOverlay> = {
    component: MatchOverlay,
    argTypes: {
        redTeams: {
            control: {
                type: "array",
            },
        },
        blueTeams: {
            control: {
                type: "array",
            },
        },
    },
};

export default meta;

export const Primary = {
    args: {
        redTeams: ["127C", "6030J"],
        blueTeams: ["5090X", "8800T"],
    },
}