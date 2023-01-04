import { IPath } from "@18x18az/rosetta";
import OBSControlPanel from "./OBSControlPanel";

interface MatchControlProps {
    lastMessagePath: IPath | null
    lastMessageBody: any
}

export const MatchControl = (props: MatchControlProps) => {
    document.title = "Match Control"
    return(
        <div>
            <OBSControlPanel
                lastMessageBody={props.lastMessageBody}
                lastMessagePath={props.lastMessagePath}
            />
        </div>
    );
}