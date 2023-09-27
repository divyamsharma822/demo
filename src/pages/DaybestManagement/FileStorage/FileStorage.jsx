// import React, { useState } from "react";
// import { SideDrawer } from "../../../components/KisaanStation";
// import styles from "./FileStorage.module.scss";
// import { IoSearch, IoNotificationsOutline } from "react-icons/io5";
// import { IoMdContact } from "react-icons/io";
// import { BiDownload } from "react-icons/bi";
// import { FaPlus } from "react-icons/fa";
// import { Upload } from "@aws-sdk/lib-storage";
// import { S3Client } from "@aws-sdk/client-s3";

// const FileStorage = () => {
//     // const [files, setFiles] = useState([]);
//     // const removeFile = (filename) => {
//     //     setFiles(files.filter((file) => file.name !== filename));
//     // };
//     // const uploadHandler = (event) => {
//     //     setFiles([...event.target.files]);
//     // };

//     // const deleteFileHandler = (_name) => {
//     //     removeFile(_name);
//     // };

//     const [progress, setProgress] = useState(0);
//     const [showProgress, setShowProgress] = useState(false);

//     const upload = (fileUploaded) => {
//         var file = fileUploaded.target.files[0];

//         const target = {
//             Bucket: "daybest-documents",
//             Key: file.name,
//             Body: file,
//         };
//         const cred = {
//             accessKeyId: "AKIAV4MSXWB6XNSEJ724",
//             secretAccessKey: "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",
//         };

//         try {
//             const parallelUploads3 = new Upload({
//                 client: new S3Client({
//                     region: "ap-south-1",
//                     credentials: cred,
//                 }),
//                 leavePartsOnError: false,
//                 params: target,
//                 queueSize: 4,
//                 partSize: 1024 * 1024 * 5,
//             });

//             parallelUploads3.on("httpUploadProgress", (progress) => {
//                 setShowProgress(true);
//                 if (progress.loaded && progress.total) {
//                     setProgress(
//                         Math.round((progress.loaded / progress.total) * 100)
//                     );
//                 }
//             });
//             parallelUploads3.done().then(() => {
//                 console.log("done");
//             });
//         } catch (e) {
//             console.log(e);
//         }
//     };
//     console.log(progress);
//     return (
//         <>
//             <div
//                 style={{
//                     height: "100vh",
//                     overflow: "auto",
//                     backgroundColor: "rgb(248,249,250)",
//                 }}
//                 className={`col p-0 m-0 ${styles.DaybestManagement}`}
//             >
//                 <div
//                     className={`col-sm-12 justify-content-end p-0 m-0 krishiBazaar d-flex flex-column ${styles.content}`}
//                 >
//                     <div
//                         className={`col-sm-12 d-flex flex-row justify-content-between align-items-center ${styles.navbar}`}
//                     >
//                         <SideDrawer /> <div>&nbsp;</div>
//                         <div className='d-flex flex-row justify-content-end gap-3'>
//                             <div className={styles.search}>
//                                 <input
//                                     className={styles.input}
//                                     placeholder='Search anything...'
//                                 />
//                                 <IoSearch
//                                     size={25}
//                                     className={styles.searchsvg}
//                                 />
//                             </div>
//                             <div className={styles.notiicon}>
//                                 <IoNotificationsOutline
//                                     size={20}
//                                     className={styles.icon}
//                                 />
//                             </div>
//                             <div className={styles.notiicon}>
//                                 <IoMdContact
//                                     size={20}
//                                     className={styles.icon}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className={`col-sm-12 d-flex justify-content-center`}>
//                         <div className={`col-sm-6 ${styles.center}`}>
//                             <div className='row g-0 d-flex justify-content-end'>
//                                 <div
//                                     className={`col-md-12 ${styles.uploadfile}`}
//                                 >
//                                     <div className={styles.fileCard}>
//                                         <div className={styles.fileInputs}>
//                                             <input
//                                                 type='file'
//                                                 onChange={(e) => upload(e)}
//                                             />
//                                             <button>
//                                                 <i>
//                                                     <FaPlus />
//                                                 </i>
//                                                 Select File
//                                             </button>
//                                         </div>
//                                     </div>
//                                     {showProgress && (
//                                         <div className={styles.progressBar}>
//                                             <div
//                                                 className={styles.bar}
//                                                 style={{
//                                                     width: `${progress}%`,
//                                                 }}
//                                             >
//                                                 <div
//                                                     className={styles.progress}
//                                                 >
//                                                     {progress} %
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                     {/* <ul
//                                         className={styles.fileList}
//                                         style={{ listStyleType: "none" }}
//                                     >
//                                         {files &&
//                                             files.map((file) => (
//                                                 <li
//                                                     className={`d-flex flex-row justify-content-between align-items-center`}
//                                                     key={file.name}
//                                                 >
//                                                     <div className='d-flex flex-row align-items-center'>
//                                                         <FaFileAlt />
//                                                         <div
//                                                             style={{
//                                                                 wordWrap:
//                                                                     "break-word",
//                                                             }}
//                                                         >
//                                                             {file.name}
//                                                         </div>
//                                                     </div>

//                                                     <div
//                                                         className={`d-flex ${styles.actions}`}
//                                                     >
//                                                         {
//                                                             <FaTrash
//                                                                 onClick={() =>
//                                                                     deleteFileHandler(
//                                                                         file.name
//                                                                     )
//                                                                 }
//                                                             />
//                                                         }
//                                                     </div>
//                                                 </li>
//                                             ))}
//                                     </ul> */}
//                                 </div>
//                             </div>
//                             <div className={styles.heading}>
//                                 ADDED FILE LIST
//                             </div>

//                             <div className='row g-0'>
//                                 <table className={styles.table}>
//                                     <thead>
//                                         <tr>
//                                             <th className='text-center'>
//                                                 Serial No.
//                                             </th>
//                                             <th className='text-center'>
//                                                 Name
//                                             </th>
//                                             <th className='text-center'>
//                                                 Download
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {[1, 2, 3, 23, 2, 32, 3, 34, 34, 4].map(
//                                             (file, index) => (
//                                                 <tr
//                                                     className={styles.tr}
//                                                     key={index}
//                                                 >
//                                                     <td
//                                                         className={`text-center ${styles.td}`}
//                                                     >
//                                                         1
//                                                     </td>
//                                                     <td
//                                                         className={`text-center ${styles.td}`}
//                                                     >
//                                                         File
//                                                     </td>
//                                                     <td
//                                                         className={`text-center ${styles.td}`}
//                                                     >
//                                                         <BiDownload size={30} />
//                                                     </td>
//                                                 </tr>
//                                             )
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

const FileStorage = () => {
    return <div className=''>Not Available</div>;
};

export default FileStorage;
