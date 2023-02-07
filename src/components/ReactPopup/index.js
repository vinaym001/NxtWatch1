import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import './index.css'

const ReactPopUp = () => (
  <div className="popup-container">
    <Popup modal>
      <>
        <button type="button">Cancel</button>
      </>
    </Popup>
  </div>
)
export default ReactPopUp
