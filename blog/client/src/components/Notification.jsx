const Notification = ({ message }) => {
    if (!message) {
      return null;
    } else {
      return <div className='notification'>{message}</div>
    }
  }
  
  export default Notification