import { useEffect, useState } from 'react';
import './App.css'
import Csvg from './assets/cantilever.svg'

function App() {

  const [expiryTime, setExpiryTime] = useState("20 dec 2023 18:00:00");
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: "",
    countdownHours: "",
    countdownlMinutes: "",
    countdownSeconds: "",
  });

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor(
        (remainingDayTime % (1000 * 60)) / 1000
      );

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(false);
      }
    }, 1000);
  };

  useEffect(() => {
    countdownTimer();
  });

  console.log(countdownTime)

  return (
    <div className='w-full h-[100dvh] bg-primary-100 flex flex-col items-start md:flex-row md:items-center justify-between'>

      <div className='w-full md:w-3/5 flex items-start justify-start flex-col space-y-5 p-8 z-10'>
        <p className='text-xl md:text-2xl text-white uppercase'>the Future of real estate investment and development</p>
        <p className='text-4xl md:text-8xl text-cyellow-100 w-full body-font font-cinzel'>
          WEBSITE COMING SOON
        </p>
        <p className='text-xl md:text-2xl text-white'>BE THE FIRST TO KNOW WHEN IT’S READY.</p>
      </div>

      <div 
        style={{
          background: `url(${Csvg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          objectFit: "contain",
          backgroundPosition: 'right'
        }}
        className='h-full md:min-h-[120dvh] w-full md:w-2/5 flex items-center justify-end absolute md:relative text-yellow-600'
      >
        <div className='absolute left-0 pl-8 pt-28 md:pt-0 md-pl-0 opacity-100 md:left-2/3 flex items-center justify-center flex-col text-white'>
          <p className='text-xl md:text-2xl'>Ready in</p>
          <div className='text-6xl md:text-8xl font-bold text-cyellow-100 flex items-center space-x-2'>
            <span>{countdownTime?.countdownDays ?? '...'}</span>
            {/* <span>{countdownTime?.countdownHours}</span>
            <span>{countdownTime?.countdownlMinutes}</span>
            <span>{countdownTime?.countdownSeconds}</span> */}
          </div>
          <p className='text-2xl md:text-4xl text-cyellow-100'>Days</p>
        </div>
      </div>

    </div>
  )
}

export default App
