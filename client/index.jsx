import {createRoot} from "react-dom/client";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {getAll, getRandomQuiz} from "./quizzes";
import React, {useEffect, useState} from "react";
const element = document.getElementById("app");
const root= createRoot(element);
const QUIZ=getAll();

root.render(
    <Application/>
);
function Application()
{
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<FrontPage/>}></Route>
            <Route path="/quiz" element={<DisplayQuiz/>}>  </Route>
            <Route path="/quiz/new" element={<AddNewQuestion />}>  </Route>
            <Route path="/api/questions" element={<ListQuestions />}> </Route>;

        </Routes>
    </BrowserRouter>
}
function FrontPage()
{
        return (<div>
            <h1>
                Quiz
            </h1>
            <li><Link to="/quiz">New Quiz</Link></li>
            <li><Link to="/quiz/new">Make New Quiz</Link></li>
            <li><Link to="/api/questions">Show all questions</Link></li>
        </div>);
}



function useLoader(loadingFunction)
{
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState();
    const [data,setData] = useState();

    async function load(){
        try {
            setLoading(true);
            setData(await loadingFunction());

        }
        catch (error)
        {
            setError(error);
        }
        finally
        {

            setLoading(false);
        }
    }

    useEffect(() => load(), []);
    return {loading,error,data};
}

function ListQuestions() {
    const {loading, error, data} = useLoader(async () => {
        return fetchJSON("/api/questions");})


    const navigate=useNavigate();
    function returnHome(e)
    {
       // e.preventDefault();
        try {
            navigate("/");
        }catch (error)
        {
            console.log(error.toString());
        }
    }
    if(error)
    {
        return (
            <div>
                <h1>Error</h1>
                <h1>{error.toString()}</h1>
            </div>
        );
    }

    if(loading)
    {
        return <div>Still loading...</div>
    }
    return (

    <div>
        <div><button onClick={e => returnHome(e)}>Home</button></div>
        <h1>All questions</h1>

          <div>
              <>
              {data.map((q) => (
                  <div>
                      <h2>{q.question}</h2>
                      <div>{q.answer1}  | {q.answer2}</div>
                      <div>{q.answer3}  | {q.answer4}</div>
                      <div>{q.correctAnswer}</div>
                  </div>
              ))}
              </>
          </div>

      </div>
    );
}

async function fetchJSON(url,options={})
{
    const res = await fetch(url, {
        method: options.method || "get",
        headers: options.json ? {"content-type": "application/json"}:{},
        body: options.json && JSON.stringify(options.json)
    });
    if(!res.ok)
    {
        throw  new Error(`Loading Error:${res.status} -> ${res.statusText}`);
    }
    if(res.status === 200)
    {
        return await res.json();
    }
    //return await res.json();
}

function DisplayQuiz() {


    const quiz=getRandomQuiz();
    quiz.answer=quiz.correctAnswer;

    const navigate=useNavigate();
    function returnHome(e)
    {
        e.preventDefault();
        navigate("/");
    }
    function checkAnswer(e,id,answer)
    {
        e.preventDefault();
        {
            if (id===answer)
            {
                alert("Correct");
                navigate("/quiz");

            } else {
                alert("incorrct try again");
            }
        }

    }
    return (
        <><div>{quiz.question}</div>
            <button  onClick={e => checkAnswer( e,quiz.correctAnswer,1)}>{quiz.answer1}</button>
            <button  onClick={e => checkAnswer( e,quiz.correctAnswer,2)}>{quiz.answer2}</button>
            <button  onClick={e => checkAnswer( e,quiz.correctAnswer,3)}>{quiz.answer3}</button>
            <button  onClick={e => checkAnswer(e, quiz.correctAnswer,4)}>{quiz.answer4}</button>
            <div><button onClick={e => returnHome(e)}>Home</button></div>
        </>
    );
}

function AddNewQuestion()
{
    const [question,setQuestion] = useState("");
    const [answer1,setAns1] = useState("");
    const [answer2,setAns2] = useState("");
    const [answer3,setAns3] = useState("");
    const [answer4,setAns4] = useState("");
    const [correctAnswer,setCorrectAnswer] = useState(1);

    const navigate=useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        await fetchJSON("/api/questions",{
            method:"post",
            json: {question,answer1,answer2,answer3,answer4,correctAnswer},
        });
        //QUIZ.push({question,answer1,answer2,answer3,answer4,correctAnswer});
        setAns1("");
        setAns2("");
        setAns3("");
        setAns4("");
        setQuestion("");
        navigate("/");
    }
    return(
        <form onSubmit={handleSubmit}>
            <>
                <div><label> Question: <input value={question}  onChange={e => setQuestion(e.target.value)}                         /></label></div>
                <div><label> Answer 1: <input value={answer1}      onChange={e => setAns1(e.target.value)}                             /></label></div>
                <div><label> Answer 2: <input value={answer2}      onChange={e => setAns2(e.target.value)}                             /></label></div>
                <div><label> Answer 3: <input value={answer3}      onChange={e => setAns3(e.target.value)}                             /></label></div>
                <div><label> Answer 4: <input value={answer4}      onChange={e => setAns4(e.target.value)}                             /></label></div>
                <div><label> Correct number: <input value={correctAnswer}  onChange={e => setCorrectAnswer(Number(e.target.value))} /></label></div>
                <button>Submit</button>
            </>
        </form>
    );
}
