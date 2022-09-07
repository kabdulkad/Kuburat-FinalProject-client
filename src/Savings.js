    import { useContext, useEffect, useState } from "react";
    import styled from "styled-components";
    import {Doughnut} from "react-chartjs-2";
    import { Chart as ChartJS, ArcElement, Tooltip, Legend,  } from 'chart.js';
    import {CurrentSavingsContext} from "./CurrentSavingsContext"
    import { useAuth0 } from "@auth0/auth0-react"
    
    
    ChartJS.register(ArcElement, Tooltip, Legend );
    
    
    
    const Savings = () => {
    
        const {user, isAuthenticated, isLoading } =useAuth0()
        const {userData, setUserData,savingList,setSavingList,resetChart,notes, setNotes, dbInfo, category, setCategory, amount,setAmount, contentBox, setContentBox} = useContext(CurrentSavingsContext)

    
        //uesr chart for savings info
        
            let userChartData = {
                labels: ['Home', 'Emergency Fund', 'Tuition', 'Travels', 'Transportation'],
                datasets: [
                    {
                        label: "Categories",
                        data: [userData.Home, userData.EmergencyFund, userData.Tuition, userData.Travels, userData.Transportation ],
                        // data: [home, emergencyFund , tuition, travels , transportation],
    
                        backgroundColor: [
                            'rgba(64,224,208,0.5)',
                            'rgba(224, 15, 118, 0.5)',
                            'rgba(221, 39, 245, 0.5)',
                            'rgba(255,140,0,0.5)',
                            'rgba(255,105,180,0.5)',
                        ],
                        borderColor: [
                            'rgba(64,224,208,1)',
                            'rgba(224, 15, 118, 0.6)',
                            'rgba(221, 39, 245, 1)',
                            'rgba(255,140,0,1)',
                            'rgba(255,105,180,1)',
            
                        ],
                        borderWidth: 1,
                    },
                    ],
                };
    //the fetch below renders all the previous savings data
    
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
                            savingsObj={...savingsObj, [item.category]: item.amount + savingsObj[item.category] } 
                            });
                            setUserData(savingsObj)
                        })
                        .catch(err => console.log(err))


        }
                
    },[user])

     //creating a function for the form on submit

        const handleSubmit = (e) => {                                     
            e.preventDefault();    
            
            //creating variable that will hold an array which will contain our field inputs(all in one)
    
            const inputData = {category, amount , notes}                     
    
            //fetch gets all the new savings data populated
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
                            <button onClick={resetChart} className="formbutton" type="button">Reset</button>
    
                        </div>
    
                </form>
    
            <div className="titlediv">

                <span className="title1">Previous Savings Data</span> <span className="title2">New Savings Data</span><span className="chart1">Savings Chart</span>
            </div>
                <div className="contentNchart">
                    <div className="contentbox">
                    
                        {
                            contentBox.map((item)=> {
                                return(
                                    
                                    
                                        <div className="newdata">
                                            <p className="textbox"><span className="inputtext">Saving category:</span>{item.category}</p>
                                            <p className="textbox"><span className="inputtext">Amount saved:</span>${item.amount}</p>
                                            <p className="textbox"><span className="inputtext">Notes:</span>{item.notes}</p>
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
    padding: 460px;

    .title1{
        margin-left: -20px;
    }

    .title2{
        margin-left: -230px;
    }
    .titlediv{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 1300px;
        margin-left: -300px;
        padding: 30px;
        font-size: 20px;
        font-style:italic;
        font-weight:bold;
    }
    .buttons{
        display: flex;
        justify-content: flex-end;
    }
    .notesdiv{
        width: 969px;
        height: 60px;
        border: 3px solid #803453;;
    }
    
    .contentbox{
        position: absolute;
    }
    .contentNchart{
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

    .olddata{
    
        border: 4px solid #102A49;
        position: relative;
        left: -380px;
        width: 350px;
        top: 100px;
        box-shadow: rgba(0, 0, 0, 0.24) 5px 6px 8px;
        border-radius: 5px;  
        gap: 50px;
    
    
    
        .textbox{
            padding: 8px;
        }
    
    
    }
    .newdata{
        border: 4px solid #803453;
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
        display: flex;
        flex-direction: row;
    }
    .input{
        border: 3px solid #803453;
        height: 38px;
        width: 1450px;
    
    }

    
    h1{
        margin-top: -400px;
        padding: 30px;
        text-align: center;
        font-family: cursive;
    }
    `
    const Select = styled.select`
        height: 46px;
        width: 1450px;
        border: 3px solid #803453;
    `
    export default Savings