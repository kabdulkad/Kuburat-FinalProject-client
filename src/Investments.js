import { useEffect, useState } from "react";
import styled from "styled-components";


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
                <h1>Checkout today's Latest Financial News!</h1>
                <div className="articlebox">
                    {
                        articles.map((article)=> {
                            return <div className="articlediv">

                                            <div>
                                                <p className="headline">{article.headline}</p>
                                                <p className="author">Written by:{article.author}</p>
                                                <a href={article.url} >Click Here to read more!</a>
                                            </div>


                                            <div>
                                                { article.images.length>0 &&
                                                
                                                    <img src={article.images[2].url} alt="content" className="picture"/>
                                                    
                                                    }
                                            </div>



                                

                            </div>
                        })
                    }
                </div>
            </MainDiv>
    

        
    )
}


const MainDiv = styled.div`

h1{
    padding: 20px;
    text-align: center;
}
.picture{
    margin-left: 150px;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.24) 5px 6px 8px;
}
.articlebox{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap:50px;
    /* border: 2px solid red; */
    margin-left: 45px;

}
.articlediv{
    border: 3px solid #439aa4;
    width: 550px;
    height: 350px;
    margin:12px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .headline{
        font-weight: bold;
        padding: 5px;
    }
    .author{
        font-style: italic;
        color: plum;
        padding: 5px;
    }

    .url{
        text-decoration: underline;
        color: blueviolet;
    }
}
`
export default Investment;