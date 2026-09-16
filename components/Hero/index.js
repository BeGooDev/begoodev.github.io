import {useCallback, useEffect, useState} from "react";
import classNames from "classnames";
import {slogans} from "../../config";
import Logo from "../Logo";


export default function Hero() {
    const [newSlogan, setnewSlogan] = useState(slogans[0]);

    const shuffle = useCallback(() => {
        const index = Math.floor(Math.random() * slogans.length);
        setnewSlogan(slogans[index]);
    }, []);

    useEffect(() => {
        const intervalID = setInterval(shuffle, 5000);
        return () => clearInterval(intervalID);
    }, [shuffle])

    return (
        <div className={classNames("hero is-fullwidth is-medium has-text-white background-transition", newSlogan.class)}>
            <div className="hero-body has-text-centered">
                <Logo variant="onDark" height={56} />
                <h4 className="mt-5 is-size-4-desktop">
                    {newSlogan.text}
                </h4>
            </div>
        </div>
    );

}
