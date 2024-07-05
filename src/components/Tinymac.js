import React from 'react';
import styled from 'styled-components';
import { Editor } from '@tinymce/tinymce-react';

function Tinymac({ title, editorRef, onChange, defaultValue }) {
    const handleEditorChange = (content) => {
        if (onChange) {
            onChange(content);
        }
    };

    return (
        <StyledTyny>
            <p>{title}</p>
            <div>
                <Editor
            initialValue={defaultValue}
                    onInit={(evt, editor) => {
                        if (editorRef.current) {
                            editorRef.current = editor;
                        }
                    }}
                    onEditorChange={handleEditorChange} // Call the onChange prop
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

export default Tinymac;
