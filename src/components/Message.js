import React, { useState } from 'react'

function Message({ message }) {
    return (
        <div>
            {
                message ?
                    <div style={{
                        height: '3rem',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition:  '2s',

                    }}>
                    <div style={{
                        height: '3rem',
                        width: '14rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#3A95E4'
                    }}>
                    <h5 style={{ color: 'white', padding: '0px 10px', textAlign: 'center' }}>{message}✅</h5>
                        </div>
                    </div> : null}
        </div>
    )
}

export default Message