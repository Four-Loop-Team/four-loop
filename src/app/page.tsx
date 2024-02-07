import React from 'react';
import ReactDOM from 'react-dom';
import Preloader from '../components/preloader/preloader';
import XIcon from '@mui/icons-material/X';
import Facebook from '@mui/icons-material/Facebook';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';


export default function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-4xl">Four Loop</h1>
        <h1 className="mt-10">Website Coming Soon</h1>

        <Preloader />

        <div className="btn-group flex justify-center mt-10">

            {/*Facebook*/}
            <a href="https://www.facebook.com/profile.php?id=61556335132711" className="button-social">
                <Facebook fontSize='large'></Facebook>
            </a>
            
            {/*LinkedIn*/}
            <a href="https://www.linkedin.com/company/fourloopdigital" className="button-social">
                <LinkedIn fontSize='large'></LinkedIn>
            </a>
            
            {/*X*/}
            <a href="https://twitter.com/fourloopdigital" className="button-social">
                <XIcon fontSize='large'></XIcon>
            </a>
            
            {/*Instagram*/}
            <a href="https://www.instagram.com/fourloopdigital" className="button-social">
                <Instagram fontSize='large'></Instagram>
            </a>
            
            {/*TikTok*/}
            <a href="https://www.tiktok.com/@fourloopdigital" className="button-social">
                {/* <TikTok></TikTok> */}
                <svg style={{width:48, height:48}} viewBox="0 0 32 32">
                    <path fill="#FFF" d="M6,3c-1.64497,0 -3,1.35503 -3,3v12c0,1.64497 1.35503,3 3,3h12c1.64497,0 3,-1.35503 3,-3v-12c0,-1.64497 -1.35503,-3 -3,-3zM12,7h2c0,1.005 1.471,2 2,2v2c-0.605,0 -1.332,-0.26584 -2,-0.71484v3.71484c0,1.654 -1.346,3 -3,3c-1.654,0 -3,-1.346 -3,-3c0,-1.654 1.346,-3 3,-3v2c-0.552,0 -1,0.449 -1,1c0,0.551 0.448,1 1,1c0.552,0 1,-0.449 1,-1z"></path>
                </svg>
            </a>

        </div>
      </div>
    </div>
  );
}
