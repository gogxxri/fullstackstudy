
import style from "./Second.module.css";

function Button({size}) {
    if (size === "big") {
        return <button className={`${style.big} ${style.button}`}>큰 버튼</button>
    } else {
        return <button className={`${style.small} ${style.button}`}>작은 버튼</button>
    }
}

export default Button;
