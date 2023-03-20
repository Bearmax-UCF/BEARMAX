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
                    <label className="mb-2">User Address 2</label>
                    <textarea name="address2" className="form-control"></textarea>
                </div>
            )}

            { showhide==='3' && (
                <div className="notesDisplay">
                    <label className="mb-2">User Address 3</label>
                    <textarea name="address3" className="form-control"></textarea>
                </div>
            )}
        
        </div>
    )
}

export default Comments;