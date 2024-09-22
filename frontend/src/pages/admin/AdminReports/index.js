// import React from "react";
// import PageTitle from "../../../components/PageTitle";
// import { message, Table } from "antd";
// import { useDispatch } from "react-redux";
// import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
// import { getAllReports } from "../../../apicalls/reports";
// import { useEffect } from "react";
// import moment from "moment";

// function AdminReports() {
//   const [reportsData, setReportsData] = React.useState([]);
//   const dispatch = useDispatch();
//   const [filters, setFilters] = React.useState({
//     examName: "",
//     userName: ""
//   });
//   const columns = [
//     {
//       title: "Exam Name",
//       dataIndex: "examName",
//       render: (text, record) => <>{record.exam.name}</>
//     },
//     {
//       title: "User Name",
//       dataIndex: "userName",
//       render: (text, record) => <>{record.user.name}</>
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (text, record) => (
//         <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
//       )
//     },
//     {
//       title: "Total Marks",
//       dataIndex: "totalQuestions",
//       render: (text, record) => <>{record.exam.totalMarks}</>
//     },
//     {
//       title: "Passing Marks",
//       dataIndex: "correctAnswers",
//       render: (text, record) => <>{record.exam.passingMarks}</>
//     },
//     {
//       title: "Obtained Marks",
//       dataIndex: "correctAnswers",
//       render: (text, record) => <>{record.result.correctAnswers.length}</>
//     },
//     {
//       title: "Result",
//       dataIndex: "verdict",
//       render: (text, record) => <>{record.result.verdict}</>
//     }
//   ];

//   const getData = async (tempFilters) => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getAllReports(tempFilters);
//       if (response.success) {
//         setReportsData(response.data);
//       } else {
//         message.error(response.message);
//       }
//       dispatch(HideLoading());
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getData(filters);
//   }, []);

//   return (
//     <div>
//       <PageTitle title="Reports" />
//       <div className="divider"></div>
//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Exam"
//           value={filters.examName}
//           onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="User"
//           value={filters.userName}
//           onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
//         />
//         <button
//           className="primary-outlined-btn"
//           onClick={() => {
//             setFilters({
//               examName: "",
//               userName: ""
//             });
//             getData({
//               examName: "",
//               userName: ""
//             });
//           }}
//         >
//           Clear
//         </button>
//         <button
//           className="primary-contained-btn"
//           onClick={() => getData(filters)}
//         >
//           Search
//         </button>
//       </div>
//       {/* <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Exam Name</th>
//               <th>User Name</th>
//               <th>Total Marks</th>
//               <th>Passing Marks</th>
//               <th>Obtained Marks</th>
//               <th>Result</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reportsData.map((record) => (
//               <tr key={record._id}>
//                 <td>{record.exam.name}</td>
//                 <td>{record.user.name} </td>
//                 <td>{record.exam.totalMarks}</td>
//                 <td>{record.exam.passingMarks}</td>
//                 <td>{record.result.correctAnswers.length}</td>
//                 <td>{record.result.verdict}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div> */}
//       <Table
//         columns={columns}
//         dataSource={reportsData}
//         className="mt-2"
//         scroll={{ x: 800 }}
//       />
//     </div>
//   );
// }

// export default AdminReports;

import React from "react";
import PageTitle from "../../../components/PageTitle";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllReports } from "../../../apicalls/reports";
import { useEffect } from "react";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

function AdminReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = React.useState({
    examName: "",
    userName: ""
  });

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam.name}</>
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user.name}</>
    },
    {
      title: "Contact",
      dataIndex: "contact",
      render: (text, record) => <>{record.user.mobile}</>
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      )
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam.passingMarks}</>
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>
    },
    {
      title: "Result",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>
    }
  ];

  const getData = async (tempFilters) => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReports(tempFilters);
      if (response.success) {
        setReportsData(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData(filters);
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.title);
    const tableRows = reportsData.map((record) => [
      record.exam.name,
      record.user.name,
      record.user.mobile,
      moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss"),
      record.exam.totalMarks,
      record.exam.passingMarks,
      record.result.correctAnswers.length,
      record.result.verdict
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows
    });

    doc.save("reports.pdf");
  };

  const exportXLS = () => {
    const ws = XLSX.utils.json_to_sheet(
      reportsData.map((record) => ({
        "Exam Name": record.exam.name,
        "User Name": record.user.name,
        "Contact": record.user.mobile,
        Date: moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss"),
        "Total Marks": record.exam.totalMarks,
        "Passing Marks": record.exam.passingMarks,
        "Obtained Marks": record.result.correctAnswers.length,
        Verdict: record.result.verdict
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "reports.xlsx");
  };

  return (
    <div>
      <div className="flex gap-2" style={{justifyContent:"space-between"}}></div>
      <PageTitle title="Reports" />
      <div className="gap-2 flex">
        <button className="primary-contained-btn" onClick={exportPDF}>
        Export PDF
      </button>
      <button className="primary-contained-btn" onClick={exportXLS}>
        Export XLS
      </button></div>
      <div className="divider"></div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Exam"
          value={filters.examName}
          onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
        />
        <input
          type="text"
          placeholder="User"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        {/* <button
          className="primary-outlined-btn"
          onClick={() => {
            setFilters({
              examName: "",
              userName: ""
            });
            getData({
              examName: "",
              userName: ""
            });
          }}
        >
          Clear
        </button> */}
        <button
          className="primary-contained-btn"
          onClick={() => getData(filters)}
        >
          Search
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={reportsData}
        className="mt-2"
        scroll={{ x: 800 }}
      />
    </div>
  );
}

export default AdminReports;
