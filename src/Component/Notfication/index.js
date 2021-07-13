import { notification } from "antd";

export const openNotificationSuccess =(title , description ,time) => {
    notification.success({
      message: title,
      description: description,
      duration	: time,
     
    });
  };  


export const openNotificationErorr =(title , description ,time) => {
    notification.error({
      message: title,
      description: description,  
      duration	: time,
     
    });
  };  

