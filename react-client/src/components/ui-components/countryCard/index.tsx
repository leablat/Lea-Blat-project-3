// image, countryName, region
import { Card } from 'primereact/card';
interface IProps {
    name: string,
    flag: string,
    region: string
}
export function CountryCard(props: IProps) {
    const header = (
        <img alt="Card" src={props.flag} />
    );

    return <Card title={props.name} header={header} style={{ width: "300px" }}>
        <span>{props.region}</span>
    </Card>

}
