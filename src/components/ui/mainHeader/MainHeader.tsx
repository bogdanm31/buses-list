import './main-header.scss';

import { useTimestampContext } from '../../../contexts/TimestampContext';

const MainHeader = () => {
  const {
    timePassedFromMidnight,
    toClockString
  } = useTimestampContext();
  const time = toClockString(timePassedFromMidnight);
  
  return (
    <header className="app-header">
      <div
        className="logo"
        data-testid="logo"
      >
        {/* <img src={logo} alt="" /> */}
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