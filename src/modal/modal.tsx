
import * as React from 'react';
import ReactModal = require('react-modal');
import { render } from 'react-dom';
import { Config } from '../resources';
import { TextAlignProperty } from 'csstype';
import { Supplier } from 'java8script';
const xButton = require('../images/ui/x.png');
const skullImage = require('../images/skull.png');
const swordImage = require('../images/sword.png');
const potionImage = require('../images/potion.png');
const coinImage = require('../images/coin.png');
const heartUIImg = require('../images/ui/heart.png');
const swordUIImage = require('../images/ui/sword.png');
const threeImage = require('../images/numbers/3.png');

interface Styles {
    p: {
        padding: string,
        margin: string,
        fontSize: number,
        flex: number,
        textAlign: TextAlignProperty,
    },
    h1: {
        textAlign: TextAlignProperty,
    },
    holder: {
        width: string,
    }
    imgHolder: {
        width: string,
        textAlign: TextAlignProperty,
    }
    cardImg: {
        width: number,
    }
}

const styles: Styles = {
    p: { padding: "16px", margin: "0px", fontSize: 20, flex: 1, textAlign: "center" },
    h1: { textAlign: "center" },
    holder: {
        width: "100%"
    },
    imgHolder: {
        width: "100%",
        textAlign: "center"
    },
    cardImg: {
        width: 100
    }
}

export class ModalRenderer {

    private isOpen: boolean;
    private static singleton;

    public static get(): ModalRenderer {
        if(!this.singleton) {
            this.singleton = new ModalRenderer(false);
        }
        return this.singleton;
    }

    private constructor(isOpen: boolean) {
        this.isOpen = isOpen;
    }

    public upgradeMaxGridModal(currentMax: number, price: number, onClick: Supplier<void>) {
        const innerStuff = (<div style={styles.holder}>
            <h1 style={styles.h1}>Increase Max Grid</h1>
            <h2 style={styles.h1}>Price to Upgrade: {price}</h2>
            <h2 style={styles.h1}>Current Max: {currentMax}</h2>
            <p style={styles.p}>Progress to a harder challenge, increase the max grid size you can reach, both in story mode or set to practice in the options.</p>
            <div style={styles.h1}>            
                <button onClick={this.onClickAndClose(onClick)}>BUY</button>
            </div>
        </div>);
        this.setOpenAndRerender(true, innerStuff);
    }

    private onClickAndClose(onclick: Supplier<void>): Supplier<void> {
        return () => {
            onclick();
            this.setOpenAndRerender(false);
        }
    }

    public introModal() {
        const innerStuff = (<div >
            <h1 style={styles.h1}>Introduction</h1>
            <p style={styles.p}>Welcome to Skeleton Flip!</p>
            <p style={styles.p}>Flip cards, find coins, drink potions and kill skeletons. The goal of the game is to flip all the cards on the board without running out of hearts.</p>
            <p style={styles.p}>In Story Mode, you progress through increasingly larger and larger grids, you can unlock larger grid sizes and harder difficulties by collecting coins and unlocking upgrades.</p>
            <p style={styles.p}>If Story Mode is disabled, you may choose to practice any grid size you like.</p>
        </div>);
        this.setOpenAndRerender(true, innerStuff);
    }

    public howToPlayModal() {
        const innerStuff = (<div>
            <h1 style={styles.h1}>How To Play</h1>
            <p style={styles.p}>The top right of the game screen shows your health (<img width={20} src={heartUIImg} alt="heart" />) and current attack (<img width={20} src={swordUIImage} alt="sword" />). If you run out of health you lose!</p>
            <div style={styles.imgHolder}>
                <img width={styles.cardImg.width} src={threeImage} alt="three" />
            </div>
            <p style={styles.p}>The numbers on the outer edges of the grid indicate how many skeletons are hiding in that row or column.</p>
            <p style={styles.p}>Tap cards inside the grid to flip them over. Remember you need to flip every card in the grid to advance, so choose your path wisely!</p>
        </div>);
        this.setOpenAndRerender(true, innerStuff);
    }

    public cardModal() {
        const innerStuff = (<div style={styles.holder}>
            <h1 style={styles.h1}>Cards</h1>
            <div style={styles.imgHolder}>
                <img width={styles.cardImg.width} src={skullImage} alt="skull" />
            </div>
            <p style={styles.p}>Oh no! Flipping over a skeleton card will hurt you, taking away one health unless you have a sword to defend yourself.</p>

            <div style={styles.imgHolder}>
                <img width={styles.cardImg.width} src={swordImage} alt="sword" />
            </div>
            <p style={styles.p}>Sweep Low! Flipping over a sword card will add to your attack count, no need to fear the next skeleton you flip over, the sword will take care of it!</p>

            <div style={styles.imgHolder}>
                <img width={styles.cardImg.width} src={potionImage} alt="potion" />
            </div>
            <p style={styles.p}>Tastes like Strawberry! Flipping over a potion card will heal any wounds that you have taken from those nasty skeletons.</p>

            <div style={styles.imgHolder}>
                <img width={styles.cardImg.width} src={coinImage} alt="coin" />
            </div>
            <p style={styles.p}>Take that to the bank! Flipping over a coin card will add to your riches, if you complete a level you will keep the coins you found and can use them for upgrades.</p>
        </div>);
        this.setOpenAndRerender(true, innerStuff);
    }

    public textModal(title: string, text: string) {
        const innerStuff = (<div style={styles.holder}>
            <h1 style={styles.h1}>{title}</h1>
            <p style={styles.p}>
                {text}
            </p>
        </div>);
        this.setOpenAndRerender(true, innerStuff);
    }

    private setOpenAndRerender = (isOpen: boolean, innerStuff?: any) => {
        this.isOpen = isOpen;
        this.render({
            innerStuff: innerStuff,
            open: this.isOpen,
            closeFunc: () => this.setOpenAndRerender(false)
        });
    }

    private render = (props: Props) => {
        render(<E {...props} />,
            document.getElementById('modal')
        );
    }
}

interface Props {
    open: boolean;
    closeFunc: () => void;
    innerStuff?: any;
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
                <div style={{ float: "right", height: Config.exitButtonSize, position: "fixed", right: "24px", top: "24px" }}>
                    <a style={{}}>
                        <img height={Config.exitButtonSize} width={Config.exitButtonSize} src={xButton} alt="exit" onPointerUp={this.props.closeFunc} />
                    </a>
                </div>
                <div style={{ borderRadius: "16px", borderStyle: "solid", borderWidth: "4px", minHeight: "95%", backgroundColor: "#896000", borderColor: "#402f08", display: "flex" }}>
                    {this.props.innerStuff}
                </div>
            </ReactModal>
        );
    }
}