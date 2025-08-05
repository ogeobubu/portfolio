import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollHandler = () => {
    const location = useLocation();

    useEffect(() => {
        const element = document.getElementById(location.hash.substring(1)); // Remove the '#' character

        setTimeout(() => {
            window.scrollTo({
                behavior: element ? "smooth" : "auto",
                top: element ? element.offsetTop : 0,
            });
        }, 100);
    }, [location]);

    return null;
};

export default ScrollHandler;