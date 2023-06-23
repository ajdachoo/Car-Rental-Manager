import React from 'react';
import { Wrapper, Logo, HomeLink } from './Navigation.styles';
import { ReactComponent as HomeIcon } from 'assets/icons/house-solid.svg';

const Navigation: React.FC = () => {
    return (
        <Wrapper>
            <Logo>
                <h1>Car Rental Manager</h1>
            </Logo>
            <HomeLink>
                <HomeIcon /><p>Home</p>
            </HomeLink>
        </Wrapper>
    );
};

export default Navigation;
