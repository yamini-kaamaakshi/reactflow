import {useFilterStore} from "../Nodes/AddTriggerNode.jsx";
import {BsFunnelFill} from "react-icons/bs";


const FilterIcon = ({id, sourceX, sourceY, targetX, targetY, selectedTriggerName}) => {
    const edgePath = `M${sourceX},${sourceY}L${targetX},${targetY}`;
    const iconX = (sourceX + targetX) / 2 - 12;
    const iconY = (sourceY + targetY) / 2 - 12;
    const { iconColor } = useFilterStore();

    const selectedTriggerData = localStorage.getItem("selectedTrigger");
    const parsedTrigger = selectedTriggerData ? JSON.parse(selectedTriggerData) : null;
    const hasFilters = parsedTrigger?.hasFilters === true

    return (
        <g>
            <path
                id={id}
                className="react-flow__edge-path"
                d={edgePath}
                style={{ stroke: "#000", strokeWidth: 2 }}
            />
            {selectedTriggerName && hasFilters && (
                <foreignObject x={iconX} y={iconY} width="24" height="24">
                    <BsFunnelFill style={{ fontSize: "24px", color: iconColor }} />
                </foreignObject>
            )}
        </g>
    );
};

export default FilterIcon;