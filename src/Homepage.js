import { useContext, useState } from "react";
import styled from "styled-components";
import {Doughnut} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  } from 'chart.js';
import {CurrentSavingsContext} from "./CurrentSavingsContext"

ChartJS.register(ArcElement, Tooltip, Legend );

const Homepage = () => {

const {guestData, setGuestData, dbInfo, setDbInfo, category, setCategory, amount,setAmount, home , setHome , tuition, setTuition , travels, setTravels , emergencyFund , setEmergencyFund , transportation , setTransportation, contentBox, setContentBox} = useContext(CurrentSavingsContext)

        
        let savingsChart = {
            labels: ['Home', 'Emergency Fund', 'Tuition', 'Travels', 'Transportation'],
            datasets: [
                {
                    label: "Categories",
                
                    data: [guestData.Home, guestData.EmergencyFund,guestData.Tuition,guestData.Travels, guestData.Transportation ],
    
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
    


    //creating a function for the form on submit
    const handleSubmit = (e) => {                                      
        e.preventDefault();     
        console.log(typeof Number(amount))                                 //creating variable that will hold an array which will contain our field inputs(all in one)
        console.log(typeof guestData[category])
                             //doing a conditional rendering that states only if all fields are field then print value
        // console.log(inputData, "tis is our inputdata")

//key is a variable out []
        setGuestData({...guestData, [category]:Number(amount) + guestData[category]})
                                                     //spread to return what was originally inputted + new content  
    
                                                            //resetting the inputs to empty "" once values are submitted 
            const inputData = {category, amount}   
            setContentBox((content) => {
                return [...content, inputData]

            }) 
    }
//resetting data on click
    const resetData = () => {
        setGuestData({});
        setContentBox([]);
        setAmount("");
        setCategory("");
    }
// console.log(category)
//    console.log(contentBox, "this is our content")

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
                        <input name="amount" type="text" placeholder="Enter Amount $" className="input" value={amount} onChange={(e)=>setAmount(e.target.value)}  required></input>
                        <button className="formbutton" type="submit">Enter</button>
                        <button onClick={resetData} className="formbutton" type="button">Reset</button>
                    </div>
                </form>


                <div className="contentNchart">

                    <div className="test2">
                        {
                            contentBox.map((item)=> {
                                return(

                                    <div className="outerbox">
                                        <div className="innerbox">
                                            <p className="textbox"><span className="inputtext">Saving category:</span>{item.category}</p>
                                            <p className="textbox"><span className="inputtext">Amount saved:</span>${item.amount}</p>
                                        </div>
                                    </div>
                                    
                                )
                            })
                        }

                    </div>

                        <div className="chart">
                            { 
                                dbInfo &&

                                <Doughnut  data={savingsChart} />
                            }
                            
                        </div>

                    </div>

                </div>
        </MainDiv>
    )
}

//
//imported the cahrt, called it like a component : it takes many props but we will focus on {data} and {options}
const MainDiv = styled.div`
/* .content{

    border: 2px solid red;
} */
max-width: 1000px;
.test2{
    /* border: 1px solid green; */
    position: absolute;
}
.contentNchart{
    /* border: 3px solid red; */
    /* display: flex; */
}
.chart{
    position: relative;
    width: 800px;
    height: 800px;
    left: 350px;
    top: 150px;

}
.inputtext{
    font-weight: bold;
}
.outerbox{
    /* border: 2px solid purple; */
    /* position: absolute; */

}
//these boxes are overlaping when the code below is commented out : fix* use position relative
.innerbox{
    border: 2px solid green;
    position: relative;
    left: -280px;
    width: 350px;
    top: 150px;
    box-shadow: rgba(0, 0, 0, 0.24) 5px 6px 8px;
    border-radius: 5px;  
    


    .textbox{
        padding: 8px;
    }

}
.formbutton{
    height: 42px;
    display: flex;
    justify-content: flex-end;
    /* width: 1460px; */
    border: 1px solid green;
    padding: 10px;
    cursor: pointer;

}
.formbox{
    /* border: 10px solid green; */
    display: flex;
    flex-direction: row;
}
.input{
    /* border: 1px solid black; */
    height: 35px;
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
    height: 40px;
    width: 1450px;
`
export default Homepage;
