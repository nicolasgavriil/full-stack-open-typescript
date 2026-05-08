interface Props {
  name: string;
}

const Header = (props: Props) => {
  return <h1>{props.name}</h1>;
};

export default Header;
