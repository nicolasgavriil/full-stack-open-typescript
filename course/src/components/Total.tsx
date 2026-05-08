interface Props {
  totalExercises: number;
}

const Total = (props: Props) => {
  return <p>Number of exercises {props.totalExercises}</p>;
};

export default Total;
