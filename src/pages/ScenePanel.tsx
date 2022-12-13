import { useEffect } from 'react';
import { IPath } from '@18x18az/rosetta';

interface ScenePanelProps {
    lastMessagePath: IPath | null
    lastMessageBody: any
}

const ScenePanel = (props: ScenePanelProps) => {

    useEffect( ()=> {

    }, []);
    return(
        <div>
            <label>owo</label>
        </div>
    );
};

export default ScenePanel;