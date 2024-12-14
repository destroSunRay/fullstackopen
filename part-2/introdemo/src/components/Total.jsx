const Total = ({ parts }) => {
  return (
    <p>
      <b>
        total of {parts.reduce((acc, part) => acc + part.exercises, 0)}{" "}
        exercises
      </b>
    </p>
  );
};

export default Total;
