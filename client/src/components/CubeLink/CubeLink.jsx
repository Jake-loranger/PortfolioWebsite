// import React from 'react';
// import "./cubelink.css";

// const CubeLink = ({ id, handleNavClick }) => {
//     const handleClick = () => {
//         handleNavClick(id);
//     };

//     return (
//         <div className='cube-link'>
//             <ul onTouchStart>
//                 <li>
//                     <div className='link'>
//                         <a target='_blank' onClick={handleClick}></a>
//                         <a target='_blank' onClick={handleClick}></a>
//                         <a target='_blank' onClick={handleClick}></a>
//                         <a target='_blank' onClick={handleClick}></a>
//                         <div className='cube codepen'>
//                             <div></div>
//                             <div></div>
//                             <div></div>
//                             <div></div>
//                             <div>
//                                 <h6>{id}</h6>
//                             </div>
//                             <div><h6>{id}</h6></div>
//                         </div>
//                     </div>
//                 </li>
//             </ul>
//             <svg className='clips' viewBox='0 0 0 0' xmlns='http://www.w3.org/2000/svg'>
//                 <defs>
//                     <clipPath id='clip-right'>
//                         <polygon id='right' points='48 0 48 96 0 48'></polygon>
//                     </clipPath>
//                     <clipPath id='clip-left'>
//                         <polygon id='left' points='0 0 0 96 48 48'></polygon>
//                     </clipPath>
//                     <clipPath id='clip-bottom'>
//                         <polygon id='bottom' points='96 48 0 48 48 0'></polygon>
//                     </clipPath>
//                     <clipPath id='clip-top'>
//                         <polygon id='top' points='0 0 96 0 48 48'></polygon>
//                     </clipPath>
//                 </defs>
//             </svg>
//         </div>
//     );
// };

// export default CubeLink;