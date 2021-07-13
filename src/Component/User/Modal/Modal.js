import React from 'react';
import '../Modal/Modal.css'

function Modal(props) {
    const { isModalVisible } = props;
    return (
        <div className={isModalVisible ? "modal" : "modal display-none"}>
                <div className="modal__overlay"></div>  
        </div>
    );
}

export default Modal;