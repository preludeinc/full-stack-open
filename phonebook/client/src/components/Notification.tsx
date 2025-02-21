const Notification = ({ message } : { message: string }) => {
    if (!message) {
      return null;
    } else {
      return <div className="error">{message}</div>
    }
  }
  
  export default Notification