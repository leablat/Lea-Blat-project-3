
// import "./header.css" DONT USE IT
import css from "./header.module.css"
interface IProps {
    text: string;
    color?: string;
}
export function Header(props: IProps) {
    const { text, color = "orange" } = props;
    return <h1 className={css.borderUgly} style={{ color: color }} >
        {text}
    </h1>
}

// export default vs export

