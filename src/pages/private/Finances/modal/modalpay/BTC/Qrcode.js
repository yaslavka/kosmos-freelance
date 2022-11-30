import QRCode from 'react-qr-code'

const QRCodes =({value}) =>{
  return<div className={'qrcode'}><QRCode value={value}/></div>
}
export default QRCodes
