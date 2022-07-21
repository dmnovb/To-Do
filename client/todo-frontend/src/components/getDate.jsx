import React from "react";
import '../components/getDate.css'
  
function GetDate() {
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const current = new Date();
    const currentDate = `${months[current.getMonth()]} ${current.getDate()} ${weekdays[current.getDay()]}`
        return (
        <div className="date">
            {currentDate}
        </div>
    )
}







export default GetDate;