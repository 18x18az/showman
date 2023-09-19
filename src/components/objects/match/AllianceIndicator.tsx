import {motion} from 'framer-motion'

interface AllianceIndicatorProps {
    alliance: 'red' | 'blue'
    teams: string[]
}

export function AllianceIndicator(props: AllianceIndicatorProps): JSX.Element {
    const side = props.alliance === 'red' ? 'left-0' : 'right-0'
    const rounding = props.alliance === 'red' ? 'rounded-r-xl' : 'rounded-l-xl'
    const border = props.alliance === 'red' ? 'border-l-4 border-red-9 pl-4' : 'border-r-4 border-blue-9 pr-4'

    return <div className={`h-48 flex flex-col justify-center fixed bottom-0 ${side}`}>
        <motion.div
        className={`px-4 py-2 flex flex-col justify-center mb-8 bg-gray-600 bg-opacity-30 ${rounding}`}
        initial={{backgroundColor: 'rgba(0,0,0,0)'}}
        animate={{backgroundColor: 'rgba(39,39,39,0.6)'}}
        transition={{delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
        >
        <motion.div className={`${border}`}
        initial={{opacity: 0, height: 0}}
        animate={{opacity: 1, height: 'auto'}}
        transition={{type: "spring", stiffness: 100, damping: 20 }}
        >
        {props.teams.map(team => {
            return <motion.div
                className={`text-6xl text-white`}
                key={team}
                initial={{opacity: 0, letterSpacing: '-0.5em'}}
                animate={{opacity: 1, letterSpacing: '0'}}
                transition={{ delay: 0.31, type: "spring", stiffness: 100, damping: 20 }}
                >{team}</motion.div>
        })}
        </motion.div>
    </motion.div>
    </div>
    
}