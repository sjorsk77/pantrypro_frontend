import {Link} from "react-router-dom";


function HomeOption({ link = "/", bgColor = "#FFFFFF", title = "option", icon = "image-add", description = "add description" }) {
    return (
        <Link to={link} style={{backgroundColor: bgColor}} className={`w-72 h-72 bg- flex flex-col items-center p-3 rounded-2xl shadow-2xl`}>
            <div className="flex flex-row justify-center gap-5 w-full items-center">
                <h1 className="text-3xl font-bold">{title}</h1>
                <box-icon name={icon} size="lg"></box-icon>
            </div>
            <p className=" flex h-full justify-center mt-5 text-center text-xl">
                {description}
            </p>
        </Link>
    );
}

export default HomeOption;