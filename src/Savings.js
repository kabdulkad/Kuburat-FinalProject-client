    import { useContext, useEffect, useState } from "react";
    import styled from "styled-components";
    import {Doughnut} from "react-chartjs-2";
    import { Chart as ChartJS, ArcElement, Tooltip, Legend,  } from 'chart.js';
    import {CurrentSavingsContext} from "./CurrentSavingsContext"
    import { useAuth0 } from "@auth0/auth0-react"
    
    
    ChartJS.register(ArcElement, Tooltip, Legend );
    
    
    
    const Savings = () => {
    
        // const [savingList, setSavingList] = useState("")
        const {user, isAuthenticated, isLoading } =useAuth0()
        const {userData, setUserData,savingList,setSavingList,resetChart,notes, setNotes, dbInfo, setDbInfo, category, setCategory, amount,setAmount, home , setHome , tuition, setTuition , travels, setTravels , emergencyFund , setEmergencyFund , transportation , setTransportation, contentBox, setContentBox} = useContext(CurrentSavingsContext)
    // console.log(dbInfo)
    
        //uesr chart for savings info
        
            let userChartData = {
                labels: ['Home', 'Emergency Fund', 'Tuition', 'Travels', 'Transportation'],
                datasets: [
                    {
                        label: "Categories",
                        data: [userData.Home, userData.EmergencyFund, userData.Tuition, userData.Travels, userData.Transportation ],
                        // data: [home, emergencyFund , tuition, travels , transportation],
    
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
            
                        ],
                        borderWidth: 1,
                    },
                    ],
                };
    //renders all the previous savings data
    
    useEffect(() =>{
        console.log(user)
        if(user){
            fetch("/savings/list",  {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({"email":user.email})
            })
                        .then((res) => res.json())
                        .then(data=> {
                            let savingsObj={Home:0 , Tuition:0, Travels:0 , EmergencyFund:0, Transportation:0}
                            setSavingList(data.data)
                            data.data.forEach(item => {
                            //    console.log(item.category)
                            //    console.log(savingsObj[item.category])
                               savingsObj={...savingsObj, [item.category]: item.amount + savingsObj[item.category] } 
                            });
                            console.log(savingsObj)
                            setUserData(savingsObj)
                        })
                        .catch(err => console.log(err))


        }
                
    },[user])

    // console.log(savingList)
    // console.log(userData)

        const handleSubmit = (e) => {                                      //creating a function for the form on submit
            e.preventDefault();    
            // console.log(category,amount)                                 //creating variable that will hold an array which will contain our field inputs(all in one)
    
            const inputData = {category, amount , notes}                          //doing a conditional rendering that states only if all fields are field then print value
            // console.log(inputData, "tis is our inputdata")
    
            //1st fetch gets all the data populated, 2nd fetch updates amount per category and 3rd fetch populates all previous data
            fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({inputData,email:user.email})
            }).then((res) => res.json())
                .then(data => console.log(data))
                .catch((err) => err)        
    
                setContentBox((content) => {
                    return [...content, inputData]
                })
                setUserData({...userData, [category]:userData[category] + Number(amount)})
                console.log(typeof amount)
                console.log(typeof userData[category])
    
            if (category && amount && notes) {
                // fetch("/categories")
                // .then((res) => res.json())
                // .then(data => {setDbInfo(data.data);
                //     console.log(data.data,"this is 83")
                //     setHome(data.data[3].amount)
                //     setEmergencyFund(data.data[2].amount)
                //     setTuition(data.data[1].amount)
                //     setTravels(data.data[0].amount)
                //     setTransportation(data.data[4].amount)
                // })
        
            
                // setCategory("");                
                // setAmount("");
            }
            // resetChart();
    
        }
    
        return(
        
            <MainDiv>
    
            <h1>CALCULATE YOUR SAVINGS HERE!</h1>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="formbox">
    
                        <Select name="category" type="text"  className="dropdown"  onChange={(e)=>setCategory(e.target.value)} required>
    
                            <option value="">Choose a Savings Category</option>
                            <option>Home</option>
                            <option>EmergencyFund</option>
                            <option>Tuition</option>
                            <option>Travels</option>
                            <option>Transportation</option>
    
                        </Select>
                        <div>
    
                        </div>
                        <input name="amount" type="text" placeholder="Enter Amount $" className="input" value={amount} onChange={(e)=>setAmount(e.target.value)}  required></input>
                    
                    </div>
                        <input name="notes" type="text" placeholder="Notes:" className="notesdiv" value={notes} onChange={(e)=>setNotes(e.target.value)}  required></input>
                        <div className="buttons">
                            <button className="formbutton" type="submit">Enter</button>
                            <button onClick={resetChart} className="formbutton" type="submit">Reset</button>
    
                        </div>
    
                </form>
    
            
                <div className="contentNchart">
    
                    <div className="test2">
                    
                        {
                            contentBox.map((item)=> {
                                return(
                                    
                                    <div className="outerbox">
                                        <div className="newdata">
                                            <p className="textbox"><span className="inputtext">Saving category:</span>{item.category}</p>
                                            <p className="textbox"><span className="inputtext">Amount saved:</span>${item.amount}</p>
                                            <p className="textbox"><span className="inputtext">Notes:</span>{item.notes}</p>
                                        </div>
                                    </div>
                                
                                )
                            })
                        }
    
                    </div>
                    <div >
    
                        {
                            savingList &&
    
                            savingList.map((item) => {
                                return (
    
                                    <div >
                                        <div className="olddata">
                                            <p className="textbox"><span className="inputtext">Saving category:</span>{item.category}</p>
                                            <p className="textbox"><span className="inputtext">Amount saved:</span>${item.amount}</p>
                                            <p className="textbox"><span className="inputtext">Notes:</span>{item.notes}</p>
                                        </div>
                                    </div>
                                
                                )
    
    
                            })
                        }
    
                    </div>

                    <div className="chart">
                            {
                                dbInfo &&
    
                            
    
                                <Doughnut  data={userChartData} />
                            }
                        
                    </div>
    
                    </div>
    
                </div>
        </MainDiv>
        )
    }
    
    const MainDiv = styled.div`
    /* .content{
    
        border: 2px solid red;
    } */
    
    
    .buttons{
        /* border:1px solid pink; */
        display: flex;
        justify-content: flex-end;
    }
    .notesdiv{
        width: 969px;
        height: 60px;
        border: 3px solid green;
    }
    
    .test2{
        /* border: 1px solid green; */
        position: absolute;
    }
    .contentNchart{
        /* border: 3px solid red; */
        display: flex;
        flex-direction: row;
    }
    .chart{
        position: relative;
        width: 800px;
        height: 800px;
        left: 300px;
        top: 100px;
    
    }
    .inputtext{
        font-weight: bold;
    }
    .outerbox{
        /* border: 2px solid purple; */
        /* position: absolute; */
    
    }
    //these boxes are overlaping when the code below is commented out : fix* use position relative
    
    .olddata{
    
        border: 4px solid orange;
        position: relative;
        left: -380px;
        width: 350px;
        top: 100px;
        box-shadow: rgba(0, 0, 0, 0.24) 5px 6px 8px;
        border-radius: 5px;  
    
    
    
        .textbox{
            padding: 8px;
        }
    
    
    }
    .newdata{
        border: 4px solid pink;
        position: relative;
        left: 100px;
        width: 350px;
        top: 100px;
        box-shadow: rgba(0, 0, 0, 0.24) 5px 6px 8px;
        border-radius: 5px;  
    
    
    
        .textbox{
            padding: 8px;
        }
    
    }
    .formbutton{
        height: 42px;
        display: flex;
        border: 3px solid green;
        padding: 10px;
        cursor: pointer;
        width: 60px;
        text-align: center;
        color: black;
    }
    .formbox{
        /* border: 10px solid green; */
        display: flex;
        flex-direction: row;
    }
    .input{
        border: 3px solid green;
        height: 38px;
        width: 1450px;
    
    }
    /* .dropdown{
        height: 40px;
        width: 1450px;
    } */
    padding: 460px;
    
    h1{
        margin-top: -400px;
        padding: 30px;
        text-align: center;
    }
    `
    const Select = styled.select`
        height: 46px;
        width: 1450px;
        border: 3px solid green;
    `
    export default Savings