
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
        render(React.createElement(E, { text: this.text, open: this.isOpen, closeFunc: () => this.setOpenAndRerender(false) }), document.getElementById('root'));
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
                        backgroundColor: 'lightGrey',
                        borderWidth: 0,
                    }
                }}
                appElement={document.getElementById('root')}
                isOpen={this.props.open}>
                <div style={{width: "100%", height:Config.exitButtonSize}}>
                    <a style={{ float: "right" }}>
                        <img height={Config.exitButtonSize} width={Config.exitButtonSize} src={xButton} alt="my image" onClick={this.props.closeFunc} />
                    </a>
                </div>
                <p>
                    {this.props.text}
                </p>
            </ReactModal>
        );
    }
}