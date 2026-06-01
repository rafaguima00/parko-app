import { BoldMessage, NotBoldMessage, TextView } from "../../style"

const Message = ({ firstWord, rest }) => {
    return <>
        <TextView>
            <NotBoldMessage>
                <BoldMessage>{firstWord}</BoldMessage>
                {" "}{rest.join(" ")}
            </NotBoldMessage>
        </TextView>
    </>
}

export default Message