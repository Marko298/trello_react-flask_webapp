import React from 'react'
import styled from 'styled-components';

export const StButton = styled.button`
    border: none;
    cursor: pointer;
    line-height: 2.5;
    padding: 0 12px;
    text-align: center;
    color: #ffffff;
    font-weight: bolder;
    border-radius: 5px;
    margin: 15px 0;
    font-size: 20px;
    ${props => 
        props.primary
         ? 'background-color: #90caf9'
         : 'background-color: #ffffff'
    }
`