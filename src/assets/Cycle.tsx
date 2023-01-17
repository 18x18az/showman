interface CycleTimeProps {
    cycleTime: number | null
}

export function CycleTime(props: CycleTimeProps){
    if(props.cycleTime === null){
        return <div/>
    }

    const minutes = Math.floor(props.cycleTime);
    const secondsNumber = Math.round((props.cycleTime % 1) * 60)
    const seconds = String(secondsNumber).padStart(2, '0');
    return(
        <div className="cycleTime">
            Cycle: {minutes}:{seconds}
        </div>
    )
}