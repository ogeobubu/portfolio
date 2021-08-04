import React from 'react'
import './cv.css'
import Button from '../../Buttons/Buttons'
import { Link } from "react-router-dom";
import myCV from '../../img/OGE OBUBU RESUME.pdf'


const CV = () => {
    return (
        <div className="cv">
            <Link className="link" to={myCV} target="_blank" download>
                <Button buttonStyle="btn--secondary" buttonSize="btn-md">
                    Download CV
                </Button>
            </Link>
        </div>
    )
}

export default CV
