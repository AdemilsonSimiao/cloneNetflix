import React from "react";
import './movieRows.css';
import { useState } from 'react';
//import NavigateBeForeIcon from '@material-ui/icons/NavigateBeFore'; <NavigateBeForeIcon style={{fontSize: 50}}/>
//import NavigateNextIcon from '@material-ui/icons/NavigateNext'; <NavigateNextIcon style={{fontSize: 50}}/>
// eslint-disable-next-line import/no-anonymous-default-export
export default ({title, items}) => {
    // eslint-disable-next-line no-unused-vars
    const [scrollX, setScrollX] = useState (0);
        
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;            
        }
        setScrollX(x);
    }
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if ((window.innerWidth - listW)> x) {
            x = (window.innerWidth - listW) -60
        }
        setScrollX(x);
    }
    return (
       <div className="movieRow">
           <h2>{title}</h2>
           <div className="movieRow--left" onClick={handleLeftArrow}>
               Anterior
           </div>
           <div className="movieRow--right" onClick={handleRightArrow}>
                Proximo
           </div>
           <div className="movieRow--lisarea">
               <div className="movieRow--list" style={{
                   marginLeft: scrollX, 
                   width: items.results.length * 150
               }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        <div key={key} className="movieRow--item">
                            <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`} alt={item.original_title}/>
                        </div>
                    ))}
                </div>
           </div>
       </div>
    );
}
