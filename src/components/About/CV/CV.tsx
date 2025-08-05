import React from 'react'
import './cv.css'
import Button from '../../Buttons/Buttons'
import { Link } from "react-router-dom";
import resume from '../../img/oge-obubu-resume.pdf'


const CV = () => {
    return (
        <div className="cv">
            <Link className="link" to={resume} target="_blank" download>
                <Button buttonStyle="btn--secondary" buttonSize="btn-md">
                    Download Resume
                </Button>
            </Link>
        </div>
    )
}

export default CV
