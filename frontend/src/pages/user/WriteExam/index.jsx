import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../../apicalls/exams";
import { addReport } from "../../../apicalls/reports";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import Instructions from "./Instructions";

function WriteExam() {
  const [examData, setExamData] = React.useState(null);
  const [questions = [], setQuestions] = React.useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = React.useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState({});
  const [result = {}, setResult] = React.useState({});
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState("instructions");
  const [secondsLeft = 0, setSecondsLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const { user } = useSelector((state) => state.users);
  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        examId: params.id
      });
      dispatch(HideLoading());
      if (response.success) {
        setQuestions(response.data.questions);
        setExamData(response.data);
        setSecondsLeft(response.data.duration);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculateResult = async () => {
    try {
      let correctAnswers = [];
      let wrongAnswers = [];

      questions.forEach((question, index) => {
        if (question.correctOption === selectedOptions[index]) {
          correctAnswers.push(question);
        } else {
          wrongAnswers.push(question);
        }
      });

      let verdict = "Pass";
      if (correctAnswers.length < examData.passingMarks) {
        verdict = "Fail";
      }

      const tempResult = {
        correctAnswers,
        wrongAnswers,
        verdict
      };
      setResult(tempResult);
      dispatch(ShowLoading());
      const response = await addReport({
        exam: params.id,
        result: tempResult,
        user: user._id
      });
      dispatch(HideLoading());
      if (response.success) {
        setView("result");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const startTimer = () => {
    let totalSeconds = examData.duration;
    const intervalId = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds = totalSeconds - 1;
        setSecondsLeft(totalSeconds);
      } else {
        setTimeUp(true);
      }
    }, 1000);
    setIntervalId(intervalId);
  };

  useEffect(() => {
    if (timeUp && view === "questions") {
      clearInterval(intervalId);
      calculateResult();
    }
  }, [timeUp]);

  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }
  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>
        <h1 className="text-center">{examData.name}</h1>
        <div className="divider"></div>

        {view === "instructions" && (
          <Instructions
            examData={examData}
            setView={setView}
            startTimer={startTimer}
          />
        )}

        {view === "questions" && (
          <div className="container">
            <div className="flex space-between d-flex head">
              <div className="timer">
                <span className="textTime">{formatTime(secondsLeft)} Min.</span>
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-12 ">
                <h1
                  className="text-2xl"
                  // style={{
                  //   boxShadow: " 4px 3px 6px 0px black",
                  //   borderRadius: "10px"
                  // }}
                >
                  {selectedQuestionIndex + 1} :{" "}
                  {questions[selectedQuestionIndex].name}
                </h1>
              </div>

              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => (
                  <div
                    className={`col-md-6 d-flex `}
                    style={{ borderRadius: "20px", marginTop:"50px"}}
                    key={index}
                    onClick={() => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedQuestionIndex]: option
                      });
                    }}
                  >
                    <div
                      style={{ borderRadius: "20px" }}
                      className={`p-3 flex-fill ${
                        selectedOptions[selectedQuestionIndex] === option
                          ? "selected-option"
                          : "option"
                      }`}
                    >
                      <h1 className="text-xl">
                        ( {option} ):
                        {questions[selectedQuestionIndex].options[option]}
                      </h1>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="row g-3 mt-3">
              {" "}
              {/* Add gap between rows */}
              <div className="col-md-6">
                {selectedQuestionIndex > 0 && (
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => {
                      setSelectedQuestionIndex(selectedQuestionIndex - 1);
                    }}
                  >
                    Previous
                  </button>
                )}
              </div>
              <div className="col-md-6 text-right">
                {selectedQuestionIndex < questions.length - 1 && (
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => {
                      setSelectedQuestionIndex(selectedQuestionIndex + 1);
                    }}
                  >
                    Next
                  </button>
                )}
                {selectedQuestionIndex === questions.length - 1 && (
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => {
                      clearInterval(intervalId);
                      setTimeUp(true);
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {view === "result" && (
          <div className="flex items-center mt-2 justify-center result">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl text-center" style={{ fontSize: "25px" }}>
                RESULT ( {result.verdict} )
              </h1>
              <div className="divider"></div>
              <table class="table marks-table" style={{ width: "250px" }}>
                <tbody>
                  <tr>
                    <th>Total Marks</th>
                    <td>
                      <span id="totalMarks">{examData.totalMarks}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Obtained Marks</th>
                    <td>
                      <span id="obtainedMarks">
                        {result.correctAnswers.length}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Wrong Answers</th>
                    <td>
                      <span id="wrongAnswers">
                        {result.wrongAnswers.length}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Passing Marks</th>
                    <td>
                      <span id="passingMarks"> {examData.passingMarks}</span>
                    </td>
                  </tr>
                  {/* <tr>
                    <th>Result</th>
                    <td>
                      <span id="verdict">{result.verdict}</span>
                    </td>
                  </tr> */}
                </tbody>
              </table>
              <div className="marks">
                <div className="flex mt-2">
                  {/* <button
                    className="primary-outlined-btn"
                    onClick={() => {
                      setView("instructions");
                      setSelectedQuestionIndex(0);
                      setSelectedOptions({});
                      setSecondsLeft(examData.duration);
                    }}
                  >
                    Retake Exam
                  </button> */}
                  <button
                    className="primary-contained-btn"
                    onClick={() => {
                      setView("review");
                    }}
                  >
                    Review Answers
                  </button>
                </div>
              </div>
              {/* 
              <table class="table marks-table" style={{ width: "250px" }}>
                <tbody>
                  <tr>
                    <th>Total Marks</th>
                    <td>
                      <span id="totalMarks">{examData.totalMarks}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Obtained Marks</th>
                    <td>
                      <span id="obtainedMarks">
                        {result.correctAnswers.length}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Wrong Answers</th>
                    <td>
                      <span id="wrongAnswers">
                        {result.wrongAnswers.length}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Passing Marks</th>
                    <td>
                      <span id="passingMarks"> {examData.passingMarks}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Result</th>
                    <td>
                      <span id="verdict">{result.verdict}</span>
                    </td>
                  </tr>
                </tbody>
              </table> */}
            </div>

            <div className="lottie-animation">
              {result.verdict === "Pass" && (
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_ya4ycrti.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}

              {result.verdict === "Fail" && (
                <lottie-player
                  src="https://assets4.lottiefiles.com/packages/lf20_qp1spzqv.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                ></lottie-player>
              )}
            </div>
          </div>
        )}

        {view === "review" && (
          <div className="flex flex-col gap-2">
            {questions.map((question, index) => {
              const isCorrect =
                question.correctOption === selectedOptions[index];
              return (
                <div
                  className={`
                  flex flex-col gap-1 p-2 ${
                    isCorrect ? "bg-success" : "bg-error"
                  }
                `}
                >
                  <h1 className="text-xl">
                    {index + 1} : {question.name}
                  </h1>
                  <h1 className="text-md">
                    Submitted Answer : {selectedOptions[index]} -{" "}
                    {question.options[selectedOptions[index]]}
                  </h1>
                  <h1 className="text-md">
                    Correct Answer : {question.correctOption} -{" "}
                    {question.options[question.correctOption]}
                  </h1>
                </div>
              );
            })}

            <div className="flex justify-center gap-2">
              <button
                className="primary-outlined-btn"
                onClick={() => {
                  navigate("/");
                }}
              >
                Close
              </button>
              {/* <button
                className="primary-contained-btn"
                onClick={() => {
                  setView("instructions");
                  setSelectedQuestionIndex(0);
                  setSelectedOptions({});
                  setSecondsLeft(examData.duration);
                }}
              >
                Retake Exam
              </button> */}
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default WriteExam;
