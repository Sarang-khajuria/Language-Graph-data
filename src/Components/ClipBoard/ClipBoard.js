import React from 'react';
import './clipBoard.css';
const ClipBoard = () => {

  let inputReference = React.useRef()
  const [text, setText] = React.useState('');
  const [isError, setError] = React.useState(false);
  const apiText = React.useRef('');

  const copyToClipBoard =() => {
    inputReference.current.focus();
    inputReference.current.select();
    document.execCommand('copy')
  }

  const copyToClipBoardAPI = () => {
    let data = apiText.current;
    let i  = data.indexOf('?q=');

    if(i==-1){
      setError(true)
    } else {
      let str = data.slice(i+3);
      navigator.clipboard.writeText(str);
      setError(false)
      setText(str);
    }
  }


  return(
    <div className="copy">
      <section>
        <label>Copy anything to clipBoard</label>
        <input type="text" id="clipBoard" className='input' ref={inputReference}/>
        <button onClick={copyToClipBoard}>Copy to clipBoard</button>
      </section>
      <section>
        <label>Copy query params to clipBoard</label>
        <input type="text" id="clipBoardAPI" onChange={(e) => apiText.current = e.target.value} className='input'/><span className="param"> Copied Text: {text}</span>
        {isError ? <div class='error'>The entered data does not have API params</div> : null}
        <button onClick={copyToClipBoardAPI}>Copy API Params to clipBoard</button>
      </section>
    </div>)
}

export default ClipBoard;