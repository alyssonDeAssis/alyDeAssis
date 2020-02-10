import './Header.css'
import React from 'react'

export default props =>
    <header className="header d-none d-sm-none d-md-flex flex-column" >
        {/* d-none: para celulares não aparece d-sm-flex: para dispositivos maiores ele se adapta */}
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i > {props.title}            
        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>