import React from "react";
import { useNavigate } from "react-router-dom";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-3 mt-3">
      <h1 className="text-2xl underline text-center">Instructions</h1>
      <div className="col-md-6">
        <h6 className="items-center">
          We appreciate your interest in joining Kasper Infotech Pvt. Ltd.
          Please review the following requirements before applying for the
          online test:
        </h6>
      </div>
      {/* <div className="col-md-6">
        <ul
          className="flex flex-col gap-1 "
          style={{ textJustify: "inter-word", listStyle: "disclosure-closed" }}
        >
          <li>
            Exam must be completed in ({Math.floor(examData.duration / 60)} )
            minutes.
          </li>
          <li>
            Exam will be submitted automatically after ({" "}
            {Math.floor(examData.duration / 60)}) minutes.
          </li>

          <li>Once submitted, you cannot change your answers.</li>

          <li>Age Applicants must be at least 21 years of age.</li>
          <li>Do not refresh the page.</li>

          <li>
            Total marks of the exam is{" "}
            <span className="font-bold">{examData.totalMarks}</span>.
          </li>
          <li>
            Passing marks of the exam is{" "}
            <span className="font-bold">{examData.passingMarks}</span>.
          </li>
          <li>
            You can use the <span className="font-bold">"Previous"</span> and{" "}
            <span className="font-bold">"Next"</span> buttons to navigate
            between questions.
          </li>
          <li>
            Qualification: Minimum of a Bachelor's degree in a relevant field is
            required.
          </li>
          <li>
            Work Location: Applicants should be willing to work at our
            designated office location. The office address is [iThum Towers,
            Office Number 214,Tower B, Noida, Uttar Pradesh, India]
          </li>
          <li>
            A detailed and up-to-date resume must be submitted along with the
            application. The resume should highlight your education, work
            experience, skills, and any relevant certifications
          </li>
          <li>
            The position may require working on Saturdays. Applicants must be
            open to this arrangement if required.
          </li>
          <li>
            A competitive stipend will be offered to selected candidates during
            the training period.
          </li>
          <li>
            Interested candidates should fill out the online application form
            available on our website.
          </li>
          <li>Complete the online test within the specified time frame.</li>
          <li>
            Candidates who achieve a passing score of at least 70% will be
            notified via email regarding the next steps, including the date and
            time for an in-person interview.
          </li>
          <li>
            Note: Meeting the requirements does not guarantee selection.
            Applicants who successfully pass the online test and subsequent
            interview stages will be considered for employment.
          </li>
          <li>
            For any further inquiries or assistance with the application
            process, please contact our support team at info@kasperinfotech.org.
          </li>
        </ul>
      </div> */}
      <div className="col-md-6">
        <ul className="exam-rules">
          <li>
            Exam must be completed in{" "}
            <span className="font-bold">
              ({Math.floor(examData.duration / 60)}) minutes
            </span>
          </li>
          <li>
            Exam will be submitted automatically after{" "}
            <span className="font-bold">
              ({Math.floor(examData.duration / 60)}) minutes.
            </span>
          </li>
          <li>Once submitted, you cannot change your answers.</li>
          <li>Age Applicants must be at least 21 years of age.</li>
          <li>Do not refresh the page.</li>
          <li>
            Total marks of the exam is{" "}
            <span className="font-bold">({examData.totalMarks}) Marks.</span>.
          </li>
          <li>
            Passing marks of the exam is{" "}
            <span className="font-bold">({examData.passingMarks})Marks</span>.
          </li>
          <li>
            You can use the <span className="font-bold">"Previous"</span> and{" "}
            <span className="font-bold">"Next"</span> buttons to navigate
            between questions.
          </li>
          <li>
            Qualification: Minimum of a Bachelor's degree in a relevant field is
            required.
          </li>
          <li>
            Work Location: Applicants should be willing to work at our
            designated office location. The office address is{" "}
            <span className="font-bold">
              [iThum Towers, Office Number 214, Tower B, Noida, Uttar Pradesh,
              India]
            </span>
          </li>
          <li>
            A detailed and up-to-date resume must be submitted along with the
            application. The resume should highlight your education, work
            experience, skills, and any relevant certifications.
          </li>
          <li>
            The position may require working on Saturdays. Applicants must be
            open to this arrangement if required.
          </li>
          <li>
            A competitive stipend will be offered to selected candidates during
            the training period.
          </li>
          <li>
            Interested candidates should fill out the online application form
            available on our website.
          </li>
          <li>Complete the online test within the specified time frame.</li>
          <li>
            Candidates who achieve a passing score of at least{" "}
            <span className="font-bold">70%</span> will be notified via email
            regarding the next steps, including the date and time for an
            in-person interview.
          </li>
          <li>
            Note: Meeting the requirements does not guarantee selection.
            Applicants who successfully pass the online test and subsequent
            interview stages will be considered for employment.
          </li>
          <li>
            For any further inquiries or assistance with the application
            process, please contact our support team at{" "}
            <span className="font-bold">info@kasperinfotech.com</span>
          </li>
        </ul>
      </div>

      <div className="flex gap-2">
        <button className="primary-outlined-btn" onClick={() => navigate("/")}>
          CLOSE
        </button>
        <button
          className="primary-contained-btn"
          onClick={() => {
            startTimer();
            setView("questions");
          }}
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}

export default Instructions;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Instructions({ examData, setView, startTimer }) {
//   const navigate = useNavigate();
//   return (
//     <div className="flex flex-col items-center gap-5">
//       <ul className="flex flex-col gap-1">
//         <h1 className="text-2xl underline">Instructions</h1>
//         <li>Exam must be completed in {examData.duration} secons.</li>
//         <li>
//           Exam will be submitted automatically after {examData.duration}{" "}
//           seconds.
//         </li>
//         <li>Once submitted, you cannot change your answers.</li>
//         <li>Do not refresh the page.</li>
//         <li>
//           You can use the <span className="font-bold">"Previous"</span> and{" "}
//           <span className="font-bold">"Next"</span> buttons to navigate between
//           questions.
//         </li>
//         <li>
//           Total marks of the exam is{" "}
//           <span className="font-bold">{examData.totalMarks}</span>.
//         </li>
//         <li>
//           Passing marks of the exam is{" "}
//           <span className="font-bold">{examData.passingMarks}</span>.
//         </li>
//       </ul>

//       <div className="flex gap-2">
//         <button className="primary-outlined-btn" onClick={() => navigate("/")}>
//           CLOSE
//         </button>
//         <button
//           className="primary-contained-btn"
//           onClick={() => {
//             startTimer();
//             setView("questions");
//           }}
//         >
//           Start Exam
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Instructions;
