import ProgressBar from "@ramonak/react-progress-bar";

const Progress = () => {
  return (
        <div className='w-full'>
        <ProgressBar completed={'50'} height="1" bgColor="lightgreen" customLabel=" " />    
        </div>
      );
  
}

export default Progress