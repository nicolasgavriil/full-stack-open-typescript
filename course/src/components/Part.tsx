import type { CoursePart } from "../types.ts";

interface Props {
  key: string;
  coursePart: CoursePart;
}

const Part = ({ coursePart }: Props) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          <b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
          <br />
          <i>{coursePart.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
          <br />
          project exercises {coursePart.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          submit to {coursePart.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <b>{`${coursePart.name} ${coursePart.exerciseCount}`}</b>
          <br />
          <i>{coursePart.description}</i>
          <br />
          required skills: {coursePart.requirements.join(", ")}
        </p>
      );
  }
};

export default Part;
