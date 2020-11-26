import LOGO from "../../../public/logo.png";

export default function UILogo({ size, ...rest }) {
  return <img src={LOGO} width={size} {...rest} />;
}
