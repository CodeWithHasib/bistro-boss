import React from 'react';
import Slider from '../header/hero/Slider';
import CategoryCard from './CategoryCard/CategoryCard';
import ChefService from '../shared/ChefService';
import HomeMenuItem from '../MenuItem/HomeMenuItem';
import FeaturedItem from './Featured/FeaturedItem';
import Testimonials from './testimonials/Testimonials';
import CallUs from './CallUs';
import ChefRecommended from './ChefRecommended';

const Home = () => {
    return (
        <div>
            <div className="">
                <Slider />
            </div>
            <CategoryCard />
            <ChefService />
            <HomeMenuItem />
            <CallUs />
            <ChefRecommended />
            <FeaturedItem />
            <Testimonials />
        </div>
    );
};

export default Home;