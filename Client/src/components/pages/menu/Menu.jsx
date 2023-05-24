import React, { useEffect, useState } from 'react';
import PageCover from '../../shared/PageCover';
import menuBg from '../../../assets/menu/banner3.jpg';
import { useMenu } from '../../../hooks/useMenu';
import desertBg from '../../../assets/menu/dessert-bg.jpeg'
import saladBg from '../../../assets/menu/salad-bg.jpg';
import soupBg from '../../../assets/menu/soup-bg.jpg';
import pizzaBg from '../../../assets/menu/pizza-bg.jpg';
import MenuCategory from './MenuCategory';
import SectionCover from '../../shared/SectionCover';
const Menu = () => {
    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert').slice(0, 4);
    const salad = menu.filter(item => item.category === 'salad').slice(0, 4);
    const soup = menu.filter(item => item.category === 'soup').slice(0, 4);
    const pizza = menu.filter(item => item.category === 'pizza').slice(0, 4);
    return (
        <div>
            <PageCover img={menuBg} />
            <MenuCategory item={offered} />
            {/* <div className="mt-24"></div> */}
            <SectionCover  title='dessert' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={desertBg} />
            <MenuCategory  item={dessert} />
            {/* Pizza  */}
            <SectionCover  title='pizza' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={pizzaBg} />
            <MenuCategory  item={pizza} />
            {/* SOUP  */}
            <SectionCover  title='soup' subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={soupBg} />
            <MenuCategory  item={soup} />
            {/* SOUP  */}
            <SectionCover  title='salad' 
            subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} img={saladBg} />
            <MenuCategory  item={salad} />
        </div>
    );
};

export default Menu;