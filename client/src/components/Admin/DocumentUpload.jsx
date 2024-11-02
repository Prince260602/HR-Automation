// import React, { useState, useEffect } from 'react';

// function DocumentUpload() {
//   const [students, setStudents] = useState([]);
//   const [lastStudent, setLastStudent] = useState(null);
//   const [lastEntry, setLastEntry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from the students API
//         const response1 = await fetch('https://ten-pap.onrender.com/a/');
//         if (!response1.ok) throw new Error('Error fetching data from /students/');
//         const studentData = await response1.json();
//         setStudents(studentData);

//         // Determine the last student entry
//         if (studentData.length > 0) {
//           setLastStudent(studentData[studentData.length - 1]);
//         }

//         // Fetch data from the agreement API
//         const response2 = await fetch('https://ten-pap.onrender.com/agreement-for-pay/');
//         if (!response2.ok) throw new Error('Error fetching data from /agreement-for-pay/');
//         const agreementData = await response2.json();

//         // Determine the last entry from agreement data
//         if (agreementData.length > 0) {
//           setLastEntry(agreementData[agreementData.length - 1]);
//         }
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
//         <h2 className="text-xl font-semibold mb-4">Your Purchased Course</h2>
//         {lastStudent ? (
//           <table className="min-w-full bg-gray-50 table-auto mb-6 border-collapse">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Field</th>
//                 <th className="border px-4 py-2">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Course</strong></td>
//                 <td className="border px-4 py-2">{lastStudent.course}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Mobile Number</strong></td>
//                 <td className="border px-4 py-2">{lastStudent.mobile_number}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Email</strong></td>
//                 <td className="border px-4 py-2">{lastStudent.email_id}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>College</strong></td>
//                 <td className="border px-4 py-2">{lastStudent.college}</td>
//               </tr>
//             </tbody>
//           </table>
//         ) : (
//           <div>No students available.</div>
//         )}

//         <h2 className="text-xl font-semibold mb-4 mt-6">Your Agreement Data</h2>
//         {lastEntry ? (
//           <table className="min-w-full bg-gray-50 table-auto border-collapse">
//             <thead>
//               <tr>
//                 <th className="border px-4 py-2">Field</th>
//                 <th className="border px-4 py-2">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Name</strong></td>
//                 <td className="border px-4 py-2">{lastEntry.name || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Address</strong></td>
//                 <td className="border px-4 py-2">{lastEntry.address || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Email</strong></td>
//                 <td className="border px-4 py-2">{lastEntry.email_id || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>By (Ten)</strong></td>
//                 <td className="border px-4 py-2">{lastEntry.by_ten || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Title (Ten)</strong></td>
//                 <td className="border px-4 py-2">{lastEntry.title_ten || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Date (Ten)</strong></td>
//                 <td className="border px-4 py-2">{lastEntry.date_ten || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>By (Participant)</strong></td>
//                 <td className="border px-4 py-2">{lastEntry.by_participant || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Title (Participant)</strong></td>
//                 <td className="border px-4 py-2">{lastEntry.title_participant || 'N/A'}</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2"><strong>Date (Participant)</strong></td>
//                 <td className="border px-4 py-2">{lastEntry.date_participant || 'N/A'}</td>
//               </tr>
//               {lastEntry.signature && (
//                 <tr>
//                   <td className="border px-4 py-2"><strong>Signature</strong></td>
//                   <td className="border px-4 py-2">
//                     <img src={lastEntry.signature} alt="Signature" className="w-32 h-32 border border-gray-300 rounded-lg shadow-lg mt-2" />
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         ) : (
//           <div>No last entry available.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DocumentUpload;

import React, { useState, useEffect } from 'react';

function DocumentUpload() {
  const [students, setStudents] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the students API
        const response1 = await fetch('https://ten-pap.onrender.com/a/');
        if (!response1.ok) throw new Error('Error fetching data from /students/');
        const studentData = await response1.json();
        setStudents(studentData);  // Set all students

        // Fetch data from the agreement API
        const response2 = await fetch('https://ten-pap.onrender.com/agreement-for-pay/');
        if (!response2.ok) throw new Error('Error fetching data from /agreement-for-pay/');
        const agreementData = await response2.json();
        setAgreements(agreementData);  // Set all agreements
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-8xl w-full">
        
        {/* Student Section */}
        <h2 className="text-xl font-semibold mb-4">All Students</h2>
        {students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 table-auto mb-6 border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Course</th>
                  <th className="border px-4 py-2">Mobile Number</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">College</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                     <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.course}</td>
                    <td className="border px-4 py-2">{student.mobile_number}</td>
                    <td className="border px-4 py-2">{student.email_id}</td>
                    <td className="border px-4 py-2">{student.college}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No students available.</div>
        )}

        {/* Agreement Section */}
        <h2 className="text-xl font-semibold mb-4 mt-6">All Agreements</h2>
        {agreements.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Address</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">By (Ten)</th>
                  <th className="border px-4 py-2">Title (Ten)</th>
                  <th className="border px-4 py-2">Date (Ten)</th>
                  <th className="border px-4 py-2">By (Participant)</th>
                  <th className="border px-4 py-2">Title (Participant)</th>
                  <th className="border px-4 py-2">Date (Participant)</th>
                  <th className="border px-4 py-2">Signature</th>
                </tr>
              </thead>
              <tbody>
                {agreements.map((agreement, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{agreement.name || 'N/A'}</td>
                    <td className="border px-4 py-2">{agreement.address || 'N/A'}</td>
                    <td className="border px-4 py-2">{agreement.email_id || 'N/A'}</td>
                    <td className="border px-4 py-2">{agreement.by_ten || 'N/A'}</td>
                    <td className="border px-4 py-2">{agreement.title_ten || 'N/A'}</td>
                    <td className="border px-4 py-2">{agreement.date_ten || 'N/A'}</td>
                    <td className="border px-4 py-2">{agreement.by_participant || 'N/A'}</td>
                    <td className="border px-4 py-2">{agreement.title_participant || 'N/A'}</td>
                    <td className="border px-4 py-2">{agreement.date_participant || 'N/A'}</td>
                    <td className="border px-4 py-2">
                      {agreement.signature ? (
                        <img
                          src={agreement.signature}
                          alt="Signature"
                          className="w-32 h-32 border border-gray-300 rounded-lg shadow-lg mt-2"
                        />
                      ) : (
                        'N/A'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No agreements available.</div>
        )}
      </div>
    </div>
  );
}

export default DocumentUpload;

