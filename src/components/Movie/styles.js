import styled from 'styled-components';
import { device } from '../../utils/constants';

export const Container = styled.div`
    display: flex;
    margin-bottom: 40px;

    @media ${device.tablet} {
        width: 50%;
    }
`;

export const SwitchContainer = styled.div`
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${device.laptopL} {
        height: 10%;
    }
`;

export const Image = styled.img`
    height: 20vh;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
    border-radius: 5px;

    @media ${device.laptopL} {
        height: 40vh;
    }
`;

export const Details = styled.div`
    padding: 0 40px 0 20px;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 1.1rem;
        font-weight: bold;

        @media ${device.laptop} {
            font-size: 1.4rem;
        }
    }

    p {
        height: 15vh;
        overflow: hidden;
        position: relative;
        margin: 0;

        @media ${device.laptopL} {
            height: 25vh;
        }

        &::after {
            content: '';
            display: block;
            width: 100%;
            height: 40%;
            background-image: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0) 10%,
                rgba(255, 255, 255, 1) 85%
            );
            position: absolute;
            bottom: 0;
        }
    }
`;
