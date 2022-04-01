import React from "react";
import './movieRows.css';
// eslint-disable-next-line import/no-anonymous-default-export
export default ({title, items}) => {
    return (
       <div>
           <h2>{title}</h2>
           <div>
                {items.results.length > 0 && items.results.map((item, key)=>(
                    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`} alt={item.original_title}/>
                ))}
           </div>
       </div>
    );
}
