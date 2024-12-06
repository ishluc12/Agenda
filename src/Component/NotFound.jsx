import {Link} from "react-router-dom"
import DrawerAppBar from "./DrawerAppBar";

export default function NotFound(){
    return <div>404 Not found
        <Link to="/">Home from link</Link>
    </div>;
}