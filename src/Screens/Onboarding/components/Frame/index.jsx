import { FrameModel, ViewImage } from "../../style"

const Frame = ({ messages, index }) => {
    return <>
        <ViewImage>
            <FrameModel 
                source={messages[index].image}
                resizeMode="contain"
            />
        </ViewImage>
    </>
}

export default Frame