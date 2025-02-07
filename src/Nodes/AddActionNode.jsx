import  { useEffect, useState } from "react";
import  { Handle} from "react-flow-renderer";
import { MdDelete } from "react-icons/md";
import { Button,} from "antd";
import { VscRunCoverage } from "react-icons/vsc";
import { Card, Flex } from "antd";
// eslint-disable-next-line react/prop-types
const AddActionNode = ({data,deleteAction,handleActionDrop,handleActionDragOver,targetNodeId}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [storedAction, setStoredAction] = useState({ selectedAction: null, formData: null });
    useEffect(() => {
        const savedActionData = JSON.parse(localStorage.getItem("savedActionData")) || [];
        const nodeActionData = savedActionData.find(action => action.node.id === targetNodeId);
        if (nodeActionData) {
            setStoredAction({
                selectedAction: nodeActionData.selectedAction,
                formData: nodeActionData.formData,
            });
        }
    }, [targetNodeId]);

    return (
        <>
            <span>
                 <div style={{
                     backgroundColor: "rgb(199, 220, 252)",
                     paddingLeft: 8,
                     paddingTop: 3,
                     paddingBottom: 3,
                     paddingRight: 8,
                     borderRadius: 16,
                     marginBottom: 7,
                     display: 'inline-block'
                 }}>
                     <Flex gap={2}>
                         <VscRunCoverage color={"rgb(11, 47, 115)"} size={16}/><span
                         style={{
                             fontSize: '14px',
                             color: "rgb(11, 47, 115)",
                             fontWeight: "medium"
                         }}>Then do this</span>
                     </Flex>
                 </div>
            </span>
            <Card
                style={{
                    width: 350,
                    padding: 0,
                    border: "1px dashed #dadada",
                    position: "relative",
                }}
                hoverable
                size="small"
                onDrop={handleActionDrop}
                onDragOver={handleActionDragOver}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div>
                    <Handle type="target" position="top" />
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                          <span style={{fontSize: "14px", color: "#888888"}}>
                          { data.label}

                           </span>
                    </div>
                    {storedAction?.selectedAction?.name && isHovered && (
                        <Button
                            onClick={deleteAction}
                            style={{
                                backgroundColor: "white",
                                border: "none",
                                position: "absolute",
                                top: "5px",
                                right: "10px",
                                padding: 0,
                            }}
                            icon={<MdDelete style={{ color: "red", fontSize: "16px" }} />}
                        />
                    )}
                    <Handle type="source" position="bottom" />
                </div>
            </Card>
        </>
    );
};

export default AddActionNode