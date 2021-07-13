import React, { useState } from 'react';
import Loading from '../Loading/Loading';
function HookLoading(props) {
    const [isVisibale , setIsVisibale] = useState(false);
    
    return (
        [isVisibale? <Loading/> : false, ()=> setIsVisibale(false) , ()=>setIsVisibale(true)]
    );
}

export default HookLoading;