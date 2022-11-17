import './main-header.scss';
import logo from '../../../img/logo.svg';
import useTime from "../../../hooks/use-time";

const MainHeader = ({ timestamp }: { timestamp: number }) => {
  const { toClockString } = useTime();
  const time = toClockString(timestamp);
  
  return (
    <header className="app-header">
      <div
        className="logo"
        data-testid="logo"
      >
        <img src={logo} alt="" />
      </div>
      <div
        className="clock biggest-lg fb"
        data-testid="clock"
      >
        { time }
      </div>
    </header>
  );
};

export default MainHeader;