const Die = (props) => {
    return (
        <div
            className={`die ${props.selected && `selected`}`}
            onClick={() => props.selectDice(props.id, props.value)}>
            {props.value}
        </div>
    );
};
export default Die;
