
import * as React from 'react';
import ReactModal = require('react-modal');
import { render } from 'react-dom';
import { Config } from '../resources';
const xButton = require('../images/ui/x.png');

export class ModalRenderer {

    private isOpen: boolean;
    private text: string;

    constructor(isOpen: boolean, text: string) {
        this.isOpen = isOpen;
        this.text = text;
    }

    public setText(newText: string) {
        this.text = newText;
    }

    public setOpenAndRerender = (isOpen: boolean) => {
        this.isOpen = isOpen;
        this.render();
    }

    private render = () => {
        render(React.createElement(E, { text: this.text, open: this.isOpen, closeFunc: () => this.setOpenAndRerender(false) }), document.getElementById('modal'));
    }
}

interface Props {
    open: boolean;
    closeFunc: () => void;
    text?: string;
}

interface State {
}

export default class E extends React.Component<Props, State> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactModal
                style={{
                    content: {
                        borderRadius: "0px",
                        backgroundColor: '#a77600',
                        borderWidth: 8,
                        borderColor: "#402f08",
                        padding: "16px",
                    }
                }}
                appElement={document.getElementById('modal')}
                isOpen={this.props.open}>
                <div style={{ float: "right", height: Config.exitButtonSize, position: "fixed", right:"24px", top: "24px" }}>
                            <a style={{ }}>
                                <img height={Config.exitButtonSize} width={Config.exitButtonSize} src={xButton} alt="my image" onPointerUp={this.props.closeFunc} />
                            </a>
                        </div>
                    <div style={{ borderRadius: "16px", borderStyle: "solid", borderWidth: "4px", minHeight: "95%", backgroundColor: "#896000", borderColor: "#402f08", display: "flex"}}>
                        <p style={{padding: "16px", margin: "0px", fontSize: 20, flex:1}}>
                            {this.props.text}
                        </p>
                    </div>
            </ReactModal>
        );
    }
}