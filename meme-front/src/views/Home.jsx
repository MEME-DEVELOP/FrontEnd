import React from "react";
import "./Home.css";
import LeftNavBar from "../components/LeftNavBar";
import Tablas from "../components/Tablas";





class Home extends React.Component{


    render(){
        return(
        <div>
            <div class = 'row gx-5 ms-1 me-2 mt-4 mb-2' >
                <div class = 'col-2'>   
                    <LeftNavBar />
                </div>
                <div class = 'col-10'>
                    <div class = 'shadow rounded-3 p-3'>

                        <Tablas />

                    </div>
                </div>
            </div>
        </div>
        )
    };
}export default Home;