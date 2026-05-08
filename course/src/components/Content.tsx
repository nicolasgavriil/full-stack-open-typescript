import type { CoursePart } from "../types.ts";
import Part from "./Part.tsx";

interface Props {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: Props) => {
  return (
    <div>
      {courseParts.map((cP) => (
        <Part key={cP.name} coursePart={cP} />
      ))}
    </div>
  );
};

export default Content;
