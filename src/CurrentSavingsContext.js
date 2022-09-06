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
            console.log("hello I've been triggered")
        })


}
useEffect((getData),[]) 
//calling getdata func inside 

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
            // getData()
        // reseting just making the chart disappear but the data isnt resetting to 0
}
console.log(savingList)
console.log(contentBox)

    return(

        <CurrentSavingsContext.Provider value={{userData,setUserData,savingList,setSavingList,resetChart,guestData, setGuestData, notes, setNotes, dbInfo,setDbInfo, category, setCategory, amount,setAmount, contentBox, setContentBox}}>
            {children}
        </CurrentSavingsContext.Provider>
    )
}

export default CurrentSavingsProvider;