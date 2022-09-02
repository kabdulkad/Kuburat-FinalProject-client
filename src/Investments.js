import { useEffect, useState } from "react";
import styled from "styled-components";
// import {link} from "react-dom"
import { Link } from "react-router-dom";

const Investment = () => {
    const [articles, setArticles] = useState("")
    const URL = "https://data.alpaca.markets/v1beta1/news?start=2021-12-28T00:00:00Z&end=2021-12-31T11:59:59Z&symbols=AAPL,TSLA"


const options = {
	method: 'GET',
	headers: {
		'Apca-Api-Key-Id': 'PK9QZBQR28PXT77HT4U7',
		'Apca-Api-Secret-Key': 'MNmbdQxtd4KY84GcnhQDmk6Dtwx6hnAcN9RIlyZg'
	}
};
useEffect(()=> {
    fetch(`${URL}`, options)
        .then(response => response.json())
        .then(data => setArticles(data.news))
        .then(data => console.log(data,"this is data"))
        .catch(err => console.error(err));


},[])


    return(
        articles && 

            <MainDiv >
                <div className="articlebox">
                    {
                        articles.map((article)=> {
                            return <div className="articlediv">
                                        <p className="headline">{article.headline}</p>
                                        <p className="author">{article.author}</p>
                                        <p>{article.url}</p>
                                        <a href={article.url}>Click Here to read more!</a>
                                        {/* <NavLink></NavLink> */}

                                        { article.images.length>0 &&
                                        
                                            <img src={article.images[2].url} alt="content" />
                                            
                                            }

                                        {console.log(article, "this is art")}

                            </div>
                        })
                    }
                </div>
            </MainDiv>
     

        
    )
}


const MainDiv = styled.div`
.articlebox{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap:50px;

}
.articlediv{
    border: 1px solid black;
    width: 550px;
    height: 350px;
    .headline{
        font-weight: bold;
    }
    .author{
        font-style: italic;
        color: plum;
    }

    .url{
        text-decoration: underline;
        color: blueviolet;
    }
}
`
export default Investment;