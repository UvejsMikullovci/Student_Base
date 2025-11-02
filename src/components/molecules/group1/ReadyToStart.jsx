import React from "react";
import { Button } from "../../atoms/group1/Button";
import "./ReadyToStart.css";


export function ReadyToStart(){
    return(
    
              <div className="ready-buttons">
                <Button label="Regjistrohu"  />
                <Button label="Shfleto Kolegjet"  />
              </div>
            
    );
}
export default ReadyToStart;