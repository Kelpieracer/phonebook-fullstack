// popup.tsx

import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

/**
 * "General purpose" error popup
 */
const PopUp = ({ title, main, button, show, okButton, okCallBack }:
    { title: string, main: JSX.Element, button: string, show: boolean, okButton?: string, okCallBack?: () => void }) => {
    const [buttonPressed, setButtonPressed] = useState(false)

    /**
     * This is needed to make sure the popup is removed correctly
     */
    const handleClick = () => {
        setButtonPressed(true)
    }
    if (!show && buttonPressed) {
        setButtonPressed(false)
    }

    return (
        <Modal show={show && !buttonPressed} onHide={handleClick}>
            <Modal.Header closeButton >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {main}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleClick}>{button}</Button>
                {okButton ? <Button variant="secondary" onClick={okCallBack}>{okButton}</Button> : <></>}
            </Modal.Footer>
        </Modal>
    )
}

export default PopUp