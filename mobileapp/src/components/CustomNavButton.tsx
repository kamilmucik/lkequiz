import * as React from 'react';
import { View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomNavButtonProps {
    name: string;
    color: string;
    size: number;
}

const CustomNavButton = (props : CustomNavButtonProps) => {
    
    return (
        <View>
        <Icon name={name} color={color} size={size} />
        </View>
    )
}


export default CustomNavButton