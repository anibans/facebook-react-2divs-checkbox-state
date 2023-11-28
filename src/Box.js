import { useState } from "react";



export default function Box() {
  const [leftBoxState, setLeftBoxState] = useState(0);
  const [rightBoxState, setRightBoxState] = useState(5);

  const handleClick = (direction)=>{
    //if left, check checked boxes in right
    let boxSide = direction === "right" ? "left" : "right"

    const myBoxes = (document.getElementsByClassName(boxSide+"-rectangle"))[0].children
    let alterFromBox = 0
    Object.keys(myBoxes).forEach((key,index)=>{
        if(myBoxes[index].type !== undefined && myBoxes[index].type === "checkbox" && myBoxes[index].checked === true){
            myBoxes[index].checked = false
            alterFromBox += 1
        }
    })
    if(direction === "left"){
        setLeftBoxState((prevState)=>{
            return prevState + alterFromBox
        })
        setRightBoxState((prevState)=>{
            return prevState - alterFromBox
        })
    }else{
        setLeftBoxState((prevState)=>{
            return prevState - alterFromBox
        })
        setRightBoxState((prevState)=>{
            return prevState + alterFromBox
        })
    }
}

  return (
    <div className={`container`}>
      <Rectangle direction="left" boxStateNumber={leftBoxState} />
      <Arrow direction="left" onClick={handleClick} />
      <Arrow direction="right" onClick={handleClick} />
      <Rectangle direction="right" boxStateNumber={rightBoxState} />
    </div>
  );
}



const InputCheckBox = (props) => {
  return (
    <>
      <input
        key={`${props.side}-${props.count}`}
        type={`checkbox`}
        id={`check-${props.side}${props.count}`}
        name={`check-${props.side}${props.count}`}
      />
      <label htmlFor={`check-${props.side}${props.count}`}>
        Checkbox {props.count}
      </label>
      <br />
    </>
  );
};

const Arrow = (props) => {
  return <button onClick={()=>props.onClick(props.direction)}>{props.direction} Arrow
  </button>;
};

const Rectangle = (props) => {
  let side = props.direction === "right" ? "r" : "l";
  const myBox = Array(props.boxStateNumber)
    .fill()
    .map((obj, index) => {
      return <InputCheckBox side={side} count={index + 1} />;
    });
  return (
    <div className={`rectangle ${props.direction}-rectangle`}>{myBox}</div>
  );
};
