import { createContext, useEffect, useState } from "react";

//creating the context in which values can be used throughout 
export const CurrentSavingsContext = createContext()



const CurrentSavingsProvider = ({children}) =>{

//usetate for category input
const [category, setCategory] = useState("")  
//usetate for amount input     
const [amount, setAmount]=useState("")
//usetate that will fetch all savings data from database
const [dbInfo, setDbInfo] = useState(null)
//usetate for notes input
const[notes , setNotes] = useState("")



//usestate when user is NOT signed in
const [guestData , setGuestData]=useState({Home:0 , Tuition:0, Travels:0 , EmergencyFund:0, Transportation:0})

//state when user IS signed in

const [userData , setUserData]=useState({Home:0 , Tuition:0, Travels:0 , EmergencyFund:0, Transportation:0})

//content that includes all input data
const [contentBox, setContentBox]=useState([]) 

//all previous savings list data
const [savingList, setSavingList] = useState("")
    


//fetch data from mongodb

const getData = () => {
    fetch("/categories")
        .then((res) => res.json())
        .then(data => {setDbInfo(data.data);
            console.log(data.data)
        })


}
useEffect((getData),[]) 
//calling getdata func inside 

//Function that will allow user to reset savings info : chart and savings content boxes
//patch used to update and delete data from the BE directly
const resetChart = () => {
    
    console.log("hi")
        
    fetch("/categories", {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify()
    }).then((res) => res.json())
        .then(data => {console.log(data)
            setContentBox([])
            setUserData({Home:0 , Tuition:0, Travels:0 , EmergencyFund:0, Transportation:0})
            setSavingList("")
        })
        .catch((err) => err) 

}

    return(

        <CurrentSavingsContext.Provider value={{userData,setUserData,savingList,setSavingList,resetChart,guestData, setGuestData, notes, setNotes, dbInfo,setDbInfo, category, setCategory, amount,setAmount, contentBox, setContentBox}}>
            {children}
        </CurrentSavingsContext.Provider>
    )
}

export default CurrentSavingsProvider;