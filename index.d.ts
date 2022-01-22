import { Exception, Result } from "@zxing/library";
import { Component } from "preact/compat";
import { ComponentChild } from "preact";
interface BarcodeScannerProps {
    active?: boolean;
    formats?: number[];
    onValue?: (value: Result) => void;
    onError?: (err: Exception) => void;
}
export default function BarcodeScanner(props?: BarcodeScannerProps): import("preact").JSX.Element;
export declare class BarcodeScanner2 extends Component<BarcodeScannerProps, {}> {
    videoElement: import("preact").RefObject<any>;
    constructor(props: BarcodeScannerProps);
    render(props: BarcodeScannerProps): ComponentChild;
    startScan(): Promise<void>;
    stopScan(): void;
    componentDidUpdate(previousProps: Readonly<BarcodeScannerProps>): void;
    componentDidMount(): void;
}
export {};
