import React from 'react';
import Link from "next/link";

const HeaderTop = () => {
    return (
        <header className="header">
            <div className="header-top">
                <div className="header-icon">
                    <Link href="/">
                        <a className="header-icon_link">
                            <h2 className={"header-icon_txt"}>textConverter</h2>
                        </a>
                    </Link>

                </div>
                <div className="header_nav">
                    <div className="header_left-icon">

                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderTop;
