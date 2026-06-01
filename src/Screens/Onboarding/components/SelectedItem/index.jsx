import { Selected, SelectedView } from "../../style"

const SelectedItem = ({ index }) => {
    return <>
        <SelectedView>
            <Selected selected={index === 0 ? true : false}></Selected>
            <Selected selected={index === 1 ? true : false}></Selected>
            <Selected selected={index === 2 ? true : false}></Selected>
        </SelectedView>
    </>
}

export default SelectedItem