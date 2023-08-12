import React, {useRef} from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';
function Tinymac({title}) {
    const editorRef = useRef();
    return (
        <StyledTyny>
            <p>{title}</p>
            <div>
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                />
            </div>
        </StyledTyny>
    )
}
const StyledTyny = styled.div`
width: 70%;
margin: 1.5rem 1rem;
display: flex;
justify-content: space-between;
`

export default Tinymac