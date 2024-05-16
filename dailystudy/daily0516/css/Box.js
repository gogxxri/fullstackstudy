import style from "./First.module.css";

function Box({size}) {
    if (size === "big") {
        return <div className={`${style.big} ${style.box}`}>큰 박스</div>
    } else {
        return <div className={`${style.small} ${style.box}`}>작은 박스</div>
    }
}

export default Box;
