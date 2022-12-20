import { talos } from "../ws";
import { useEffect, useState } from 'react';
import { IPath, IOBSConfig } from '@18x18az/rosetta';

interface ScenePanelProps {
    lastMessagePath: IPath | null
    lastMessageBody: IOBSConfig
}

const OBSControlPanel = (props: ScenePanelProps) => {

    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        let payload: IOBSConfig = {
            setManual: !checked,
            isConnected: props.lastMessageBody.isConnected,
            attemptReconnect: false
        };
        talos.post(["obs"], payload);
    }

    const reconnect = () => {
        setChecked(!checked);
        console.log("reconnecting!")
        let payload: IOBSConfig = {
            setManual: !checked,
            isConnected: props.lastMessageBody.isConnected,
            attemptReconnect: true
        };
        talos.post(["obs"], payload);
    }

    useEffect( ()=> {
        talos.get(['obs']);
    }, [checked]);

    return(
        <div>
            <label>Manual Scene Control </label>
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <br></br>
            <button onClick={reconnect}>Reconnect to OBS Server</button>
        </div>
    );
};

export default OBSControlPanel;