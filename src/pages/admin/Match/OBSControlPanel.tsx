import { talos } from "../../../ws";
import { useEffect, useState } from 'react';
import { IPath, IOBSConfig } from '@18x18az/rosetta';

interface ScenePanelProps {
    lastMessagePath: IPath | null
    lastMessageBody: any
}

const OBSControlPanel = (props: ScenePanelProps) => {

    const [checked, setChecked] = useState(false);
    const [checked2, setChecked2] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        let payload: IOBSConfig = {
            setManual: !checked,
            isConnected: props.lastMessageBody.isConnected,
            attemptReconnect: false
        };
        talos.post(["obs"], payload);
    }

    const handleChange2 = () => {
        setChecked2(!checked2);
        let payload = !checked2;
        talos.post(["hold"], payload);
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

    useEffect( ()=> {
        talos.get(['hold']);
    }, [checked2]);

    return(
        <div className="matchAdmin">
            <label>Manual Scene Control </label>
            <input type="checkbox" checked={checked} onChange={handleChange} />
            <br></br>
            <label>Hold For Score </label>
            <input type="checkbox" checked={checked2} onChange={handleChange2} />
            <br></br>
            <button onClick={reconnect}>Reconnect to OBS Server</button>
        </div>
    );
};

export default OBSControlPanel;