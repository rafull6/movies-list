import styled from 'styled-components';
import { device } from '../../utils/constants';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;

    @media ${device.laptopL} {
        padding: 10px 30px;
    }
`;
