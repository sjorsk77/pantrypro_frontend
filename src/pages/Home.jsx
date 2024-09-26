import { useEffect, useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {getUser} from "../api/ApiWrapper";
import Navbar from "../components/Navbar";
import {Foodwatcher} from "../components/Foodwatcher";
import HomeOption from "../components/HomeOption";


export function Home() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUser(Cookies.get('token'));
                setUser(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [Cookies.get('token')])

    return (
        <div className="flex flex-col items-center h-full bg-background-beige">
            <Navbar />
            <div className="flex flex-col items-center justify-center gap-y-5 h-fit bg mt-10">
                <h1 className="text-3xl font-semibold">{isLoading ? 'Loading...' : `Welcome ${user?.firstName}`}</h1>
                <p>What would you like to do?</p>
            </div>
            <div className="flex flex-row px-32 mt-10 w-full h-full gap-20 ">
                <div className="w-full flex flex-wrap items-center justify-center gap-10">
                    <HomeOption
                        link="/pantry"
                        bgColor="#C09673"
                        title="Pantries"
                        icon="fridge"
                        description="Manage your pantries. Add or remove pantries and add manage your food stocks."
                    />

                    <HomeOption
                        link="/cookbook"
                        bgColor="#F0C6AE"
                        title="Cookbook"
                        icon="book"
                        description="Search for recipes using filters and items in your pantries. Save and organize recipes"
                    />

                    <HomeOption
                        link="/meal"
                        bgColor="#F0E6AE"
                        title="Meals"
                        icon="knife"
                        description="Plan your meals in the meal planner. Set meals based on your diet and recipes"
                    />

                    <HomeOption
                        link="/diet"
                        bgColor="#BBF0AE"
                        title="Diets"
                        icon="line-chart"
                        description="Manage your diet. Set your calorie and nutrition goals and more. "
                    />
                    <HomeOption
                        link="/message"
                        bgColor="#FFFFFF"
                        title="Messages"
                        icon="message-alt-detail"
                        description="View your incoming requests and notifications"
                    />

                    <HomeOption
                        link="/account"
                        bgColor="#8BB3FF"
                        title="Account"
                        icon="user-circle"
                        description="Manage your account by changing credentials."
                    />

                </div>
                <Foodwatcher />
            </div>
        </div>

    )
}

