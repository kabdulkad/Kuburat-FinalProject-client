import { createContext, useEffect, useState } from "react";


export const CurrentSavingsContext = createContext()



const CurrentSavingsProvider = ({children}) =>{

    const [category, setCategory] = useState("")       
    const [amount, setAmount]=useState("")
    const [dbInfo, setDbInfo] = useState(null)
    const[notes , setNotes] = useState("")



//state when user is NOT signed in
const [guestData , setGuestData]=useState({Home:0 , Tuition:0, Travels:0 , EmergencyFund:0, Transportation:0})

//userData

const [userData , setUserData]=useState({Home:0 , Tuition:0, Travels:0 , EmergencyFund:0, Transportation:0})

//states when user IS signed in
    const [home, setHome]=useState(0)
    const [tuition, setTuition]=useState(0)
    const [travels, setTravels]=useState(0)
    const [emergencyFund, setEmergencyFund]=useState(0)
    const [transportation, setTransportation]=useState(0)

    
    const [contentBox, setContentBox]=useState([]) 
    const [savingList, setSavingList] = useState("")
    
//fetch data from mongodb


const getData = () => {
    fetch("/categories")
        .then((res) => res.json())
        .then(data => {setDbInfo(data.data);
            console.log(data.data)
            setHome(data.data[3].amount)
            setEmergencyFund(data.data[2].amount)
            setTuition(data.data[1].amount)
            setTravels(data.data[0].amount)
            setTransportation(data.data[4].amount)
            // console.log(setHome(data.data[3].amount))
            console.log("hello I've been triggered")
        })


}
useEffect((getData),[]) 
//calling getdata func inside 

const resetChart = () => {
    //do a .patch
    //method path
    
    console.log("hi")
        
    fetch("/categories", {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify()
    }).then((res) => res.json())
        .then(data => console.log(data))
        .catch((err) => err) 
            getData()
            setContentBox([])
            setSavingList("")
        // reseting just making the chart disappear but the data isnt resetting to 0
}
//on every other entry, we get the amounts being displayed
//everytime context update we run the fetch again
    return(

        <CurrentSavingsContext.Provider value={{userData,setUserData,savingList,setSavingList,resetChart,guestData, setGuestData, notes, setNotes, dbInfo,setDbInfo, category, setCategory, amount,setAmount, home , setHome , tuition, setTuition , travels, setTravels , emergencyFund , setEmergencyFund , transportation , setTransportation, contentBox, setContentBox}}>
            {children}
        </CurrentSavingsContext.Provider>
    )
}

export default CurrentSavingsProvider;