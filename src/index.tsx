import {BrowserMultiFormatReader, BarcodeFormat} from "@zxing/browser"
import {DecodeHintType, Exception, Result} from "@zxing/library"
import {Component, createRef, useEffect, useRef} from "preact/compat";
import {MutableRef} from "preact/hooks";
import {ComponentChild} from "preact";

interface BarcodeScannerProps {
    active?: boolean,
    formats?: number[],
    onValue?: (value: Result) => void,
    onError?: (err: Exception) => void
}
export default function BarcodeScanner(props: BarcodeScannerProps = {active: false, formats: [BarcodeFormat.QR_CODE]}) {
    const videoElement: MutableRef<HTMLVideoElement | null> = useRef(null);

    const startScan = async () => {
        const codeReader = new BrowserMultiFormatReader(new Map([[DecodeHintType.POSSIBLE_FORMATS, props.formats]]));
        const devices = (await navigator.mediaDevices.enumerateDevices()).filter(val => val.kind === "videoinput" && val.label.search(/ir\s/i) === -1);
        if (devices.length === 0) {
            throw new Error("No input device connected")
        }
        if (videoElement.current) {
            const device = devices.find(value => value.label.includes("facing back"));
            codeReader.decodeFromVideoDevice((device ?? devices[0]).deviceId, videoElement.current, (result, err) => {
                if (result && props.onValue) {
                    props.onValue(result);
                }
                if (err && props.onError) {
                    props.onError(err);
                }
            });
        }
    }
    const stopScan = () => (videoElement.current?.srcObject as MediaStream)?.getTracks().forEach(track => track.stop())
    useEffect(() => {
        props.active ? startScan() : stopScan()
    }, [props.active]);

    return <>{props.active && <video ref={videoElement} />}</>;
}


export class BarcodeScanner2 extends Component<BarcodeScannerProps, {}>{

    videoElement = createRef()

    constructor(props: BarcodeScannerProps) {
        super(props);
        this.props = props;
    }

    render(props: BarcodeScannerProps): ComponentChild {
        return <>{props.active && <video ref={this.videoElement} />}</>;
    }


    async startScan()  {
        const codeReader = new BrowserMultiFormatReader(new Map([[DecodeHintType.POSSIBLE_FORMATS, this.props.formats]]));
        const devices = (await navigator.mediaDevices.enumerateDevices()).filter(val => val.kind === "videoinput" && val.label.search(/ir\s/i) === -1);
        if (devices.length === 0) {
            throw new Error("No input device connected")
        }
        if (this.videoElement.current) {
            const device = devices.find(value => value.label.includes("facing back"));
            codeReader.decodeFromVideoDevice((device ?? devices[0]).deviceId, this.videoElement.current, (result, err) => {
                if (result && this.props.onValue) {
                    this.props.onValue(result);
                }
                if (err && this.props.onError) {
                    this.props.onError(err);
                }
            });
        }
    }

    stopScan() {
        (this.videoElement.current?.srcObject as MediaStream)?.getTracks().forEach(track => track.stop())
    }

    componentDidUpdate(previousProps: Readonly<BarcodeScannerProps>) {
        this.props.active ? this.startScan() : this.stopScan()
    }

    componentDidMount() {
        this.props.active ? this.startScan() : this.stopScan()
    }


}