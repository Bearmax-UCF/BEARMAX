import React, { useState } from "react";

export const Comments = (props) => {

    const [showhide, setShowHide] = useState('');
  
    const handleshowhide=(event)=>{
        const getuser = event.target.value;    
        setShowHide(getuser);
    }

    return (
        <div className="comments">

            <div className="commentSelection">
                <select name="usertype" className="commSelect" onChange={(e)=>(handleshowhide(e))}>
                    <option value="">--Select Note--</option>
                    <option value="1">Create A Note</option>
                    <option value="2">...</option>
                    <option value="3">...</option>
                </select>
            </div>

            { showhide==='1' && (
                <div className="notesDisplay">
                    <textarea></textarea>
                </div>
            )}           

            { showhide==='2' && (
                <div className="notesDisplay">
                </div>
            )}

            { showhide==='3' && (
                <div className="notesDisplay">
                </div>
            )}
        
        </div>
    )
}

export default Comments;